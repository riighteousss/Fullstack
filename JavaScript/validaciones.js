// ===== VALIDACIONES SIMPLES =====

// Validar email
function validarEmail(email) {
    return email.includes('@') && email.includes('.');
}

// Validar RUT chileno básico
function validarRUT(rut) {
    // Quitar puntos y guión
    rut = rut.replace(/\./g, '').replace('-', '');
    
    // Debe tener entre 8 y 9 caracteres
    if (rut.length < 8 || rut.length > 9) {
        return false;
    }
    
    // El último caracter puede ser número o K
    const ultimoCaracter = rut.slice(-1).toLowerCase();
    if (!/[0-9k]/.test(ultimoCaracter)) {
        return false;
    }
    
    return true;
}

// Formatear RUT mientras escribes
function formatearRUT(rut) {
    // Quitar todo lo que no sea número o K
    rut = rut.replace(/[^0-9kK]/g, '');
    
    if (rut.length > 1) {
        // Separar número del dígito verificador
        const numero = rut.slice(0, -1);
        const dv = rut.slice(-1);
        
        // Agregar puntos cada 3 dígitos
        const numeroFormateado = numero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        
        return numeroFormateado + '-' + dv;
    }
    
    return rut;
}

// Validar teléfono chileno
function validarTelefono(telefono) {
    // Quitar espacios y símbolos
    const telefonoLimpio = telefono.replace(/[\s\-\(\)]/g, '');
    
    // Debe tener 8 o 9 números y empezar con 2, 3, 4, 5, 6, 7, 8, o 9
    if (telefonoLimpio.length === 8) {
        return /^[2-9]/.test(telefonoLimpio);
    }
    if (telefonoLimpio.length === 9) {
        return /^[2-9]/.test(telefonoLimpio);
    }
    
    return false;
}

// Validar contraseña
function validarPassword(password) {
    return password.length >= 6;
}

// Validar nombre
function validarNombre(nombre) {
    return nombre.length >= 2;
}

// Validar formulario de contacto
function validarFormularioContacto(datos) {
    const errores = [];
    
    if (!validarNombre(datos.nombre)) {
        errores.push('El nombre debe tener al menos 2 letras');
    }
    
    if (!validarEmail(datos.email)) {
        errores.push('El email no es válido');
    }
    
    if (datos.telefono && !validarTelefono(datos.telefono)) {
        errores.push('El teléfono no es válido');
    }
    
    if (!datos.asunto) {
        errores.push('Debe seleccionar un asunto');
    }
    
    if (datos.mensaje.length < 10) {
        errores.push('El mensaje debe tener al menos 10 caracteres');
    }
    
    return errores;
}

// Validar formulario de registro
function validarFormularioRegistro(datos, tipo) {
    const errores = [];
    
    if (!validarNombre(datos.nombre)) {
        errores.push('El nombre debe tener al menos 2 letras');
    }
    
    if (!validarNombre(datos.apellido)) {
        errores.push('El apellido debe tener al menos 2 letras');
    }
    
    if (!validarEmail(datos.email)) {
        errores.push('El email no es válido');
    }
    
    if (!validarTelefono(datos.telefono)) {
        errores.push('El teléfono no es válido');
    }
    
    if (!validarRUT(datos.rut)) {
        errores.push('El RUT no es válido');
    }
    
    if (!validarPassword(datos.password)) {
        errores.push('La contraseña debe tener al menos 6 caracteres');
    }
    
    if (datos.password !== datos['confirm-password']) {
        errores.push('Las contraseñas no son iguales');
    }
    
    if (!datos.terminos) {
        errores.push('Debe aceptar los términos y condiciones');
    }
    
    // Solo para mecánicos
    if (tipo === 'mecanico') {
        if (datos.direccion.length < 10) {
            errores.push('La dirección del taller debe tener al menos 10 caracteres');
        }
        
        if (!datos.experiencia) {
            errores.push('Debe seleccionar los años de experiencia');
        }
        
        if (!datos.verificacion) {
            errores.push('Debe aceptar la verificación de credenciales');
        }
    }
    
    return errores;
}

// Aplicar formato RUT automáticamente
document.addEventListener('DOMContentLoaded', function() {
    const camposRUT = document.querySelectorAll('input[name="rut"]');
    
    camposRUT.forEach(input => {
        input.addEventListener('input', function(e) {
            e.target.value = formatearRUT(e.target.value);
        });
    });
});