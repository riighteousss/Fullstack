// ===== FUNCIONALIDAD DE REGISTRO =====

// Inicializar funcionalidad de registro
function initRegistro() {
    // Aplicar formato RUT a campos RUT
    document.querySelectorAll('input[name="rut"]').forEach(input => {
        input.addEventListener('input', function(e) {
            e.target.value = formatearRUT(e.target.value);
        });
    });

    // Manejar envío de formulario de registro
    const registroForm = document.getElementById('registroForm');
    if (registroForm) {
        registroForm.addEventListener('submit', manejarRegistro);
    }

    // Manejar modal de login
    const loginLink = document.getElementById('loginLink');
    if (loginLink) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            mostrarModal('loginModal');
        });
    }

    // Manejar formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', manejarLogin);
    }

    // Inicializar modales
    initModales();
}

// Manejar registro de usuario
function manejarRegistro(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const datos = Object.fromEntries(formData);
    
    // Validar formulario
    const errores = validarFormularioRegistro(datos, 'cliente');
    
    if (errores.length > 0) {
        alert('Errores en el formulario:\n' + errores.join('\n'));
        return;
    }
    
    // Simular registro exitoso
    const btnRegistro = e.target.querySelector('.btn-registro');
    const textoOriginal = btnRegistro.textContent;
    
    btnRegistro.textContent = 'Registrando...';
    btnRegistro.disabled = true;
    
    setTimeout(() => {
        mostrarMensajeExito('¡Registro exitoso! Bienvenido a Fixsy.');
        e.target.reset();
        btnRegistro.textContent = textoOriginal;
        btnRegistro.disabled = false;
    }, 2000);
}

// Manejar login de usuario
function manejarLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!validarEmail(email)) {
        alert('El email no es válido');
        return;
    }
    
    if (!validarPassword(password)) {
        alert('La contraseña debe tener al menos 6 caracteres');
        return;
    }
    
    // Simular login exitoso
    const btnLogin = e.target.querySelector('.btn-registro');
    const textoOriginal = btnLogin.textContent;
    
    btnLogin.textContent = 'Iniciando sesión...';
    btnLogin.disabled = true;
    
    setTimeout(() => {
        alert('¡Inicio de sesión exitoso! Bienvenido de vuelta.');
        cerrarModal('loginModal');
        e.target.reset();
        btnLogin.textContent = textoOriginal;
        btnLogin.disabled = false;
    }, 1500);
}

// Mostrar mensaje de éxito
function mostrarMensajeExito(mensaje) {
    const modal = document.getElementById('successModal');
    const mensajeElement = document.getElementById('successMessage');
    
    if (modal && mensajeElement) {
        mensajeElement.textContent = mensaje;
        mostrarModal('successModal');
    } else {
        alert(mensaje);
    }
}

// Funciones de modal
function mostrarModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Inicializar modales
function initModales() {
    const modales = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');

    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', function(e) {
        modales.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

// Función global para cerrar modal (llamada desde HTML)
function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initRegistro);