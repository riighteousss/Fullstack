// ===== CONTACTO SIMPLIFICADO =====

// Enviar formulario de contacto
function enviarContacto(e) {
    e.preventDefault();
    
    // Obtener datos del formulario
    const datos = new FormData(e.target);
    const contacto = Object.fromEntries(datos);
    
    // Validar formulario
    const errores = validarFormularioContacto(contacto);
    
    if (errores.length > 0) {
        alert('Por favor corrige estos errores:\n\n' + errores.join('\n'));
        return;
    }
    
    // Simular envío
    const btn = e.target.querySelector('.btn-enviar');
    const textoOriginal = btn.textContent;
    
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    
    setTimeout(() => {
        alert('¡Mensaje enviado correctamente!\nTe contactaremos pronto.');
        e.target.reset(); // Limpiar formulario
        btn.textContent = textoOriginal;
        btn.disabled = false;
    }, 2000);
}

// Inicializar contacto
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', enviarContacto);
    }
});