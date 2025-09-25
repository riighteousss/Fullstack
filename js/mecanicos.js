// ===== FUNCIONALIDAD DE MECÁNICOS =====

// Inicializar funcionalidad de mecánicos
function initMecanicos() {
    initFiltros();
}

// Inicializar filtros de mecánicos
function initFiltros() {
    const filtros = document.querySelectorAll('.filtro-btn');
    const mecanicos = document.querySelectorAll('.mecanico-card');

    filtros.forEach(filtro => {
        filtro.addEventListener('click', () => {
            // Remover clase active de todos los filtros
            filtros.forEach(f => f.classList.remove('active'));
            // Agregar clase active al filtro clickeado
            filtro.classList.add('active');

            const categoria = filtro.dataset.filtro;

            mecanicos.forEach(mecanico => {
                if (categoria === 'todos') {
                    mecanico.style.display = 'block';
                } else {
                    const categorias = mecanico.dataset.categoria;
                    if (categorias && categorias.includes(categoria)) {
                        mecanico.style.display = 'block';
                    } else {
                        mecanico.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initMecanicos);