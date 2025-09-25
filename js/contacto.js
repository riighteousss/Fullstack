// ===== FUNCIONALIDAD DE CONTACTO =====

// Inicializar funcionalidad de contacto
function initContacto() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', manejarContacto);
    }
}

// Manejar envío de formulario de contacto
function manejarContacto(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const datos = Object.fromEntries(formData);
    
    // Validar formulario
    const errores = validarFormularioContacto(datos);
    
    if (errores.length > 0) {
        alert('Errores en el formulario:\n' + errores.join('\n'));
        return;
    }
    
    // Simular envío del formulario
    const btnEnviar = e.target.querySelector('.btn-enviar');
    const textoOriginal = btnEnviar.textContent;
    
    btnEnviar.textContent = 'Enviando...';
    btnEnviar.disabled = true;
    
    setTimeout(() => {
        alert('¡Mensaje enviado correctamente! Te contactaremos pronto.');
        e.target.reset();
        btnEnviar.textContent = textoOriginal;
        btnEnviar.disabled = false;
    }, 2000);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initContacto);