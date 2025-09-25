// ===== REGISTRO SIMPLIFICADO =====

// Cambiar entre pestañas (Cliente/Mecánico)
function cambiarTab() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const formSections = document.querySelectorAll('.form-section');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            
            // Quitar clase active de todos
            tabBtns.forEach(b => b.classList.remove('active'));
            formSections.forEach(f => f.classList.remove('active'));
            
            // Agregar active al seleccionado
            btn.classList.add('active');
            document.getElementById(tab + '-form').classList.add('active');
        });
    });
}

// Manejar registro de cliente
function registrarCliente(e) {
    e.preventDefault();
    
    // Obtener datos del formulario
    const datos = new FormData(e.target);
    const cliente = Object.fromEntries(datos);
    
    // Validar
    const errores = validarFormularioRegistro(cliente, 'cliente');
    
    if (errores.length > 0) {
        alert('Errores:\n' + errores.join('\n'));
        return;
    }
    
    // Simular registro
    const btn = e.target.querySelector('.btn-registro');
    btn.textContent = 'Registrando...';
    btn.disabled = true;
    
    setTimeout(() => {
        alert('¡Registro exitoso! Bienvenido a Fixsy.');
        e.target.reset();
        btn.textContent = 'Registrarse como Cliente';
        btn.disabled = false;
    }, 2000);
}

// Manejar registro de mecánico
function registrarMecanico(e) {
    e.preventDefault();
    
    // Obtener datos del formulario
    const datos = new FormData(e.target);
    const mecanico = Object.fromEntries(datos);
    
    // Verificar que haya seleccionado servicios
    const servicios = document.querySelectorAll('input[name="servicios"]:checked');
    if (servicios.length === 0) {
        alert('Debe seleccionar al menos un servicio');
        return;
    }
    
    // Validar
    const errores = validarFormularioRegistro(mecanico, 'mecanico');
    
    if (errores.length > 0) {
        alert('Errores:\n' + errores.join('\n'));
        return;
    }
    
    // Simular registro
    const btn = e.target.querySelector('.btn-registro');
    btn.textContent = 'Enviando solicitud...';
    btn.disabled = true;
    
    setTimeout(() => {
        alert('¡Solicitud enviada! Te contactaremos para verificar tus datos.');
        e.target.reset();
        btn.textContent = 'Registrarse como Mecánico';
        btn.disabled = false;
    }, 2000);
}

// Manejar login
function hacerLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!validarEmail(email)) {
        alert('Email no válido');
        return;
    }
    
    if (!validarPassword(password)) {
        alert('La contraseña debe tener al menos 6 caracteres');
        return;
    }
    
    // Simular login
    const btn = e.target.querySelector('.btn-registro');
    btn.textContent = 'Iniciando sesión...';
    btn.disabled = true;
    
    setTimeout(() => {
        alert('¡Bienvenido de vuelta!');
        cerrarModal('loginModal');
        e.target.reset();
        btn.textContent = 'Iniciar Sesión';
        btn.disabled = false;
    }, 1500);
}

// Mostrar modal de login
function mostrarLogin(e) {
    e.preventDefault();
    document.getElementById('loginModal').style.display = 'block';
}

// Cerrar modal
function cerrarModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const modales = document.querySelectorAll('.modal');
    modales.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Inicializar todo cuando cargue la página
document.addEventListener('DOMContentLoaded', function() {
    // Cambiar tabs
    cambiarTab();
    
    // Formulario cliente
    const clienteForm = document.getElementById('clienteRegistro');
    if (clienteForm) {
        clienteForm.addEventListener('submit', registrarCliente);
    }
    
    // Formulario mecánico
    const mecanicoForm = document.getElementById('mecanicoRegistro');
    if (mecanicoForm) {
        mecanicoForm.addEventListener('submit', registrarMecanico);
    }
    
    // Formulario login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', hacerLogin);
    }
    
    // Link para mostrar login
    const loginLink = document.getElementById('loginLink');
    if (loginLink) {
        loginLink.addEventListener('click', mostrarLogin);
    }
    
    // Botones para cerrar modales
    const closeBtns = document.querySelectorAll('.close');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
});

// Función global para cerrar modal de éxito
function closeModal() {
    cerrarModal('successModal');
}