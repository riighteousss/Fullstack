// ===== FUNCIONES PRINCIPALES SIMPLES =====

// Menu para móviles
function iniciarMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en enlaces
        const enlaces = navMenu.querySelectorAll('a');
        enlaces.forEach(enlace => {
            enlace.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                }
            });
        });
    }
}

// Animaciones cuando aparece en pantalla
function iniciarAnimaciones() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    // Observar elementos con clase fade-in
    const elementos = document.querySelectorAll('.fade-in');
    elementos.forEach(el => {
        observer.observe(el);
    });
}

// Scroll suave para enlaces internos
function iniciarScrollSuave() {
    const enlaces = document.querySelectorAll('a[href^="#"]');
    
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function (e) {
            e.preventDefault();
            
            const destino = document.querySelector(this.getAttribute('href'));
            if (destino) {
                destino.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mostrar notificación simple
function mostrarNotificacion(mensaje, tipo = 'info') {
    const notificacion = document.createElement('div');
    notificacion.innerHTML = mensaje;
    
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${tipo === 'success' ? '#4caf50' : tipo === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        z-index: 1000;
        max-width: 300px;
        font-size: 0.9rem;
    `;
    
    document.body.appendChild(notificacion);
    
    // Quitar después de 4 segundos
    setTimeout(() => {
        if (notificacion.parentNode) {
            notificacion.remove();
        }
    }, 4000);
}

// Inicializar todo cuando cargue la página
document.addEventListener('DOMContentLoaded', function() {
    iniciarMenu();
    iniciarAnimaciones();
    iniciarScrollSuave();
});