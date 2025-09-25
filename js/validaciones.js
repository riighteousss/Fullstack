// ===== VALIDACIONES DE FORMULARIOS =====

// Validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Validar RUT chileno
function validarRUT(rut) {
    // Remover puntos y guión
    rut = rut.replace(/\./g, '').replace('-', '');
    
    if (rut.length < 8 || rut.length > 9) {
        return false;
    }
    
    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1).toLowerCase();
    
    let suma = 0;
    let multiplicador = 2;
    
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
    
    const resto = suma % 11;
    const dvCalculado = resto === 0 ? '0' : resto === 1 ? 'k' : (11 - resto).toString();
    
    return dv === dvCalculado;
}

// Formatear RUT
function formatearRUT(rut) {
    rut = rut.replace(/[^0-9kK]/g, '');
    
    if (rut.length > 1) {
        rut = rut.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + rut.slice(-1);
    }
    
    return rut;
}

// Validar teléfono chileno
function validarTelefono(telefono) {
    const regex = /^(\+56|56)?[2-9]\d{8}$/;
    return regex.test(telefono.replace(/\s/g, ''));
}

// Validar contraseña
function validarPassword(password) {
    // Mínimo 6 caracteres
    return password.length >= 6;
}

// Mostrar mensaje de error
function mostrarError(campo, mensaje) {
    const errorDiv = document.getElementById(campo + '-error');
    if (errorDiv) {
        errorDiv.textContent = mensaje;
        errorDiv.style.display = 'block';
    }
}

// Limpiar errores
function limpiarErrores() {
    const errores = document.querySelectorAll('.error-message');
    errores.forEach(error => {
        error.style.display = 'none';
    });
}

// Validar formulario de contacto
function validarFormularioContacto(formData) {
    const errores = [];
    
    if (!formData.nombre || formData.nombre.trim().length < 2) {
        errores.push('El nombre debe tener al menos 2 caracteres');
    }
    
    if (!validarEmail(formData.email)) {
        errores.push('El email no es válido');
    }
    
    if (formData.telefono && !validarTelefono(formData.telefono)) {
        errores.push('El teléfono no es válido');
    }
    
    if (!formData.asunto) {
        errores.push('Debe seleccionar un asunto');
    }
    
    if (!formData.mensaje || formData.mensaje.trim().length < 10) {
        errores.push('El mensaje debe tener al menos 10 caracteres');
    }
    
    return errores;
}

// Validar formulario de registro
function validarFormularioRegistro(formData, tipo) {
    const errores = [];
    
    if (!formData.nombre || formData.nombre.trim().length < 2) {
        errores.push('El nombre debe tener al menos 2 caracteres');
    }
    
    if (!formData.apellido || formData.apellido.trim().length < 2) {
        errores.push('El apellido debe tener al menos 2 caracteres');
    }
    
    if (!validarEmail(formData.email)) {
        errores.push('El email no es válido');
    }
    
    if (!validarTelefono(formData.telefono)) {
        errores.push('El teléfono no es válido');
    }
    
    if (!validarRUT(formData.rut)) {
        errores.push('El RUT no es válido');
    }
    
    if (!validarPassword(formData.password)) {
        errores.push('La contraseña debe tener al menos 6 caracteres');
    }
    
    if (formData.password !== formData.confirmPassword) {
        errores.push('Las contraseñas no coinciden');
    }
    
    if (!formData.terminos) {
        errores.push('Debe aceptar los términos y condiciones');
    }
    
    // Validaciones específicas para mecánicos
    if (tipo === 'mecanico') {
        if (!formData.direccion || formData.direccion.trim().length < 10) {
            errores.push('La dirección del taller es requerida');
        }
        
        if (!formData.experiencia) {
            errores.push('Debe seleccionar los años de experiencia');
        }
        
        if (!formData.verificacion) {
            errores.push('Debe aceptar el proceso de verificación');
        }
    }
    
    return errores;
}