// Validaciones del formulario de registro
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroForm');
    
    // Obtener elementos del formulario
    const campos = {
        nombre: document.getElementById('nombre'),
        email: document.getElementById('email'),
        telefono: document.getElementById('telefono'),
        marca: document.getElementById('marca'),
        anio: document.getElementById('anio'),
        tipoServicio: document.getElementById('tipoServicio'),
        terminos: document.getElementById('terminos'),
        descripcion: document.getElementById('descripcion')
    };

    // Preseleccionar servicio si viene de otra página
    const urlParams = new URLSearchParams(window.location.search);
    const servicioParam = urlParams.get('servicio');
    if (servicioParam && campos.tipoServicio) {
        campos.tipoServicio.value = servicioParam;
    }

    // Validación en tiempo real para cada campo
    if (campos.nombre) {
        campos.nombre.addEventListener('input', validarNombre);
        campos.nombre.addEventListener('blur', validarNombre);
    }

    if (campos.email) {
        campos.email.addEventListener('input', validarEmail);
        campos.email.addEventListener('blur', validarEmail);
        campos.email.addEventListener('focus', mostrarSugerenciasEmail);
    }

    if (campos.telefono) {
        campos.telefono.addEventListener('input', validarTelefono);
        campos.telefono.addEventListener('blur', validarTelefono);
    }

    if (campos.marca) {
        campos.marca.addEventListener('change', validarMarca);
    }

    if (campos.anio) {
        campos.anio.addEventListener('input', validarAnio);
        campos.anio.addEventListener('blur', validarAnio);
    }

    if (campos.tipoServicio) {
        campos.tipoServicio.addEventListener('change', validarTipoServicio);
    }

    if (campos.terminos) {
        campos.terminos.addEventListener('change', validarTerminos);
    }

    if (campos.descripcion) {
        campos.descripcion.addEventListener('focus', mostrarSugerenciasDescripcion);
        campos.descripcion.addEventListener('blur', ocultarSugerenciasDescripcion);
    }

    // Envío del formulario
    if (form) {
        form.addEventListener('submit', enviarFormulario);
    }

    // Funciones de validación
    function validarNombre() {
        const nombre = campos.nombre.value.trim();
        const errorElement = document.getElementById('nombre-error');
        const successElement = document.getElementById('nombre-success');
        
        if (nombre.length < 2) {
            mostrarError(campos.nombre, errorElement, 'El nombre debe tener al menos 2 caracteres');
            ocultarExito(successElement);
            return false;
        }
        
        if (!/^[a-záéíóúñü\s]+$/i.test(nombre)) {
            mostrarError(campos.nombre, errorElement, 'El nombre solo puede contener letras');
            ocultarExito(successElement);
            return false;
        }
        
        mostrarExito(campos.nombre, successElement);
        ocultarError(errorElement);
        return true;
    }

    function validarEmail() {
        const email = campos.email.value.trim();
        const errorElement = document.getElementById('email-error');
        const successElement = document.getElementById('email-success');
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            mostrarError(campos.email, errorElement, 'Ingresa un correo electrónico válido');
            ocultarExito(successElement);
            return false;
        }
        
        mostrarExito(campos.email, successElement);
        ocultarError(errorElement);
        return true;
    }

    function validarTelefono() {
        const telefono = campos.telefono.value.trim();
        const errorElement = document.getElementById('telefono-error');
        const successElement = document.getElementById('telefono-success');
        
        // Regex para validar teléfonos chilenos e internacionales
        const telefonoRegex = /^(\+?56)?[\s\-]?[9][\s\-]?[0-9]{8}$|^(\+?[1-9]\d{0,3})?[\s\-]?[0-9]{6,14}$/;
        
        if (!telefonoRegex.test(telefono)) {
            mostrarError(campos.telefono, errorElement, 'Ingresa un número de teléfono válido');
            ocultarExito(successElement);
            return false;
        }
        
        mostrarExito(campos.telefono, successElement);
        ocultarError(errorElement);
        return true;
    }

    function validarMarca() {
        const marca = campos.marca.value;
        const errorElement = document.getElementById('marca-error');
        
        if (!marca) {
            mostrarError(campos.marca, errorElement, 'Selecciona la marca de tu vehículo');
            return false;
        }
        
        ocultarError(errorElement);
        campos.marca.classList.remove('invalid');
        return true;
    }

    function validarAnio() {
        const anio = parseInt(campos.anio.value);
        const errorElement = document.getElementById('anio-error');
        const currentYear = new Date().getFullYear();
        
        if (isNaN(anio) || anio < 1980 || anio > currentYear) {
            mostrarError(campos.anio, errorElement, `Ingresa un año válido (1980-${currentYear})`);
            return false;
        }
        
        ocultarError(errorElement);
        campos.anio.classList.remove('invalid');
        campos.anio.classList.add('valid');
        return true;
    }

    function validarTipoServicio() {
        const tipoServicio = campos.tipoServicio.value;
        const errorElement = document.getElementById('tipoServicio-error');
        
        if (!tipoServicio) {
            mostrarError(campos.tipoServicio, errorElement, 'Selecciona el tipo de servicio');
            return false;
        }
        
        ocultarError(errorElement);
        campos.tipoServicio.classList.remove('invalid');
        return true;
    }

    function validarTerminos() {
        const terminos = campos.terminos.checked;
        const errorElement = document.getElementById('terminos-error');
        
        if (!terminos) {
            mostrarError(campos.terminos, errorElement, 'Debes aceptar los términos y condiciones');
            return false;
        }
        
        ocultarError(errorElement);
        return true;
    }

    function mostrarSugerenciasEmail() {
        const suggestions = document.getElementById('email-suggestions');
        if (suggestions) {
            suggestions.style.display = 'block';
        }
    }

    function mostrarSugerenciasDescripcion() {
        const suggestions = document.getElementById('descripcion-suggestions');
        if (suggestions) {
            suggestions.style.display = 'block';
        }
    }

    function ocultarSugerenciasDescripcion() {
        const suggestions = document.getElementById('descripcion-suggestions');
        if (suggestions) {
            setTimeout(() => {
                suggestions.style.display = 'none';
            }, 200);
        }
    }

    // Funciones auxiliares para mostrar/ocultar mensajes
    function mostrarError(campo, errorElement, mensaje) {
        if (campo) campo.classList.add('invalid');
        if (campo) campo.classList.remove('valid');
        if (errorElement) {
            errorElement.textContent = mensaje;
            errorElement.style.display = 'block';
        }
    }

    function ocultarError(errorElement) {
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    function mostrarExito(campo, successElement) {
        if (campo) campo.classList.add('valid');
        if (campo) campo.classList.remove('invalid');
        if (successElement) {
            successElement.style.display = 'block';
        }
    }

    function ocultarExito(successElement) {
        if (successElement) {
            successElement.style.display = 'none';
        }
    }

    // Validación completa del formulario
    function validarFormularioCompleto() {
        let esValido = true;
        
        // Validar campos requeridos
        if (!validarNombre()) esValido = false;
        if (!validarEmail()) esValido = false;
        if (!validarTelefono()) esValido = false;
        if (!validarMarca()) esValido = false;
        if (!validarAnio()) esValido = false;
        if (!validarTipoServicio()) esValido = false;
        if (!validarTerminos()) esValido = false;
        
        return esValido;
    }

    // Envío del formulario
    function enviarFormulario(e) {
        e.preventDefault();
        
        if (!validarFormularioCompleto()) {
            // Mostrar mensaje de error general
            alert('Por favor, corrige los errores en el formulario antes de continuar.');
            
            // Hacer scroll al primer campo con error
            const primerError = form.querySelector('.invalid');
            if (primerError) {
                primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                primerError.focus();
            }
            
            return false;
        }

        // Simular envío del formulario
        const btnSubmit = form.querySelector('button[type="submit"]');
        const textoOriginal = btnSubmit.textContent;
        
        // Mostrar estado de carga
        btnSubmit.textContent = 'Enviando...';
        btnSubmit.disabled = true;
        
        // Simular proceso de envío (2 segundos)
        setTimeout(() => {
            // Ocultar formulario
            form.style.display = 'none';
            
            // Mostrar mensaje de éxito
            const mensajeExito = document.getElementById('mensajeExito');
            const numeroSolicitud = document.getElementById('numeroSolicitud');
            
            if (mensajeExito && numeroSolicitud) {
                // Generar número de solicitud aleatorio
                const numSolicitud = 'FS-' + Date.now().toString().substr(-6);
                numeroSolicitud.textContent = numSolicitud;
                mensajeExito.style.display = 'block';
                
                // Hacer scroll al mensaje
                mensajeExito.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Enviar datos por email (simulado)
            enviarNotificacionEmail();
            
        }, 2000);
    }

    // Simulación de envío de email
    function enviarNotificacionEmail() {
        const datos = new FormData(form);
        const datosFormulario = {};
        
        for (let [key, value] of datos.entries()) {
            datosFormulario[key] = value;
        }
        
        console.log('Datos del formulario:', datosFormulario);
        console.log('Email de notificación enviado a:', datosFormulario.email);
        
        // Aquí iría la lógica real para enviar el email
        // Por ejemplo: fetch('/api/enviar-solicitud', { method: 'POST', body: datos })
    }

    // Auto-formateo del teléfono mientras se escribe
    if (campos.telefono) {
        campos.telefono.addEventListener('input', function(e) {
            let valor = e.target.value.replace(/\D/g, '');
            
            // Formato para número chileno
            if (valor.startsWith('56')) {
                valor = valor.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '+$1 $2 $3 $4');
            } else if (valor.startsWith('9') && valor.length === 9) {
                valor = valor.replace(/(\d{1})(\d{4})(\d{4})/, '$1 $2 $3');
            }
            
            e.target.value = valor;
        });
    }

    // Autocompletar sugerencias de email
    if (campos.email) {
        const dominiosComunes = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];
        
        campos.email.addEventListener('input', function(e) {
            const valor = e.target.value;
            const suggestions = document.getElementById('email-suggestions');
            
            if (valor.includes('@') && !dominiosComunes.some(d => valor.includes(d))) {
                const partes = valor.split('@');
                if (partes.length === 2 && partes[1].length > 0) {
                    const sugerencias = dominiosComunes
                        .filter(d => d.startsWith(partes[1]))
                        .map(d => `${partes[0]}@${d}`)
                        .slice(0, 3);
                    
                    if (sugerencias.length > 0 && suggestions) {
                        suggestions.innerHTML = '¿Quisiste decir? ' + 
                            sugerencias.map(s => `<span style="cursor: pointer; color: #1976d2; text-decoration: underline;" onclick="document.getElementById('email').value='${s}'; document.getElementById('email-suggestions').style.display='none'; validarEmail();">${s}</span>`).join(', ');
                        suggestions.style.display = 'block';
                    }
                }
            }
        });
    }
});