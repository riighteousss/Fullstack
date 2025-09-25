// ===== VALIDACIONES DE LOGIN =====

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', manejarLogin);
        
        // Validación en tiempo real
        const campos = loginForm.querySelectorAll('input');
        campos.forEach(campo => {
            campo.addEventListener('blur', validarCampoLogin);
            campo.addEventListener('input', limpiarErrorLogin);
        });
    }

    // Verificar si ya hay una sesión activa
    verificarSesionActiva();
});

// ===== FUNCIONES DE VALIDACIÓN =====

function validarCampoLogin(event) {
    const campo = event.target;
    const valor = campo.value.trim();
    let esValido = true;
    let mensajeError = '';

    campo.classList.remove('is-valid', 'is-invalid');

    switch (campo.type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(valor)) {
                esValido = false;
                mensajeError = 'Ingresa un correo electrónico válido';
            }
            break;

        case 'password':
            if (valor.length < 6) {
                esValido = false;
                mensajeError = 'La contraseña debe tener al menos 6 caracteres';
            }
            break;
    }

    if (esValido && valor.length > 0) {
        campo.classList.add('is-valid');
    } else if (!esValido) {
        campo.classList.add('is-invalid');
        const feedback = campo.nextElementSibling || campo.parentNode.querySelector('.invalid-feedback');
        if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.textContent = mensajeError;
        }
    }

    return esValido;
}

function limpiarErrorLogin(event) {
    const campo = event.target;
    if (campo.classList.contains('is-invalid') && campo.value.trim() !== '') {
        campo.classList.remove('is-invalid');
    }
}

// ===== MANEJO DE LOGIN =====

function manejarLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const remember = formData.get('remember') === 'on';

    // Validar campos
    let formularioValido = true;
    const campos = form.querySelectorAll('input[required]');
    
    campos.forEach(campo => {
        if (!validarCampoLogin({ target: campo })) {
            formularioValido = false;
        }
    });

    if (!formularioValido) {
        mostrarToast('error', 'Por favor corrige los errores en el formulario');
        return;
    }

    // Mostrar loading
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="spinner-border spinner-border-sm me-2"></i>Iniciando sesión...';
    submitBtn.disabled = true;

    // Simular proceso de login
    setTimeout(() => {
        procesarLogin(email, password, remember, submitBtn, originalText);
    }, 1500);
}

function procesarLogin(email, password, remember, submitBtn, originalText) {
    try {
        // Usuarios de prueba predefinidos
        const usuariosPrueba = [
            {
                id: 1,
                email: 'admin@fixsy.cl',
                password: '123456',
                nombres: 'Administrador',
                apellidos: 'Fixsy',
                tipo: 'admin'
            },
            {
                id: 2,
                email: 'cliente@test.com',
                password: '123456',
                nombres: 'Cliente',
                apellidos: 'Prueba',
                tipo: 'cliente'
            }
        ];

        // Obtener usuarios registrados del localStorage
        const usuariosRegistrados = JSON.parse(localStorage.getItem('fixsy_usuarios') || '[]');
        const todosUsuarios = [...usuariosPrueba, ...usuariosRegistrados];

        // Buscar usuario
        const usuario = todosUsuarios.find(u => u.email === email);

        if (!usuario) {
            throw new Error('No existe una cuenta con este correo electrónico');
        }

        // Verificar contraseña (en producción sería hash)
        if (usuario.password !== password) {
            throw new Error('Contraseña incorrecta');
        }

        // Crear sesión
        const sesionData = {
            id: usuario.id,
            email: usuario.email,
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            tipo: usuario.tipo || 'cliente',
            fechaLogin: new Date().toISOString()
        };

        // Guardar sesión
        if (remember) {
            localStorage.setItem('fixsy_sesion', JSON.stringify(sesionData));
        } else {
            sessionStorage.setItem('fixsy_sesion', JSON.stringify(sesionData));
        }

        // Éxito
        mostrarToast('success', `¡Bienvenido ${usuario.nombres}! Redirigiendo...`);
        
        setTimeout(() => {
            window.location.href = '../../index.html';
        }, 1500);

    } catch (error) {
        console.error('Error en login:', error);
        mostrarToast('error', error.message || 'Error al iniciar sesión. Inténtalo nuevamente.');
        
        // Restaurar botón
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// ===== GESTIÓN DE SESIONES =====

function verificarSesionActiva() {
    const sesionLocal = localStorage.getItem('fixsy_sesion');
    const sesionSession = sessionStorage.getItem('fixsy_sesion');
    
    if (sesionLocal || sesionSession) {
        const sesion = JSON.parse(sesionLocal || sesionSession);
        console.log('Sesión activa:', sesion);
        // Aquí podrías redirigir o mostrar información del usuario logueado
    }
}

function cerrarSesion() {
    localStorage.removeItem('fixsy_sesion');
    sessionStorage.removeItem('fixsy_sesion');
    window.location.href = 'InicioSesion.html';
}

// ===== RECUPERACIÓN DE CONTRASEÑA =====

function iniciarRecuperacion() {
    const email = document.getElementById('email').value;
    
    if (!email) {
        mostrarToast('error', 'Por favor ingresa tu correo electrónico');
        return;
    }

    if (!validarEmail(email)) {
        mostrarToast('error', 'Por favor ingresa un correo válido');
        return;
    }

    // Simular envío de correo
    mostrarToast('success', 'Se ha enviado un correo con instrucciones para recuperar tu contraseña');
}

// ===== FUNCIONES AUXILIARES =====

function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const icon = document.getElementById(inputId + '-icon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('bi-eye');
        icon.classList.add('bi-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('bi-eye-slash');
        icon.classList.add('bi-eye');
    }
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function mostrarToast(tipo, mensaje) {
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }

    const toastId = 'toast-' + Date.now();
    const iconClass = tipo === 'success' ? 'bi-check-circle' : 'bi-exclamation-triangle';
    const bgClass = tipo === 'success' ? 'bg-success' : 'bg-danger';
    const titulo = tipo === 'success' ? '¡Éxito!' : 'Error';

    const toastHTML = `
        <div id="${toastId}" class="toast" role="alert">
            <div class="toast-header ${bgClass} text-white">
                <i class="bi ${iconClass} me-2"></i>
                <strong class="me-auto">${titulo}</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">${mensaje}</div>
        </div>
    `;

    toastContainer.insertAdjacentHTML('beforeend', toastHTML);

    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, { autohide: true, delay: 4000 });
    toast.show();

    toastElement.addEventListener('hidden.bs.toast', () => toastElement.remove());
}