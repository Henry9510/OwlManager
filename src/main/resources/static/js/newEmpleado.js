document.addEventListener('DOMContentLoaded', function () {
    let botonCrear = document.getElementById("btnCrearEmpleado");

    if (botonCrear) {
        configurarBotonCrearEmpleado(botonCrear);
    } else {
        console.error('El botón con ID "btnCrearEmpleado" no se encuentra en el DOM.');
    }
});

// Configura el evento para crear un nuevo empleado
function configurarBotonCrearEmpleado(botonCrear) {
    botonCrear.addEventListener("click", async evento => {
        // Llama a la función para registrar un empleado si el formulario es válido
        if (validarFormulario()) {
            await registrarEmpleado();
        } else {
            alert('Por favor, completa todos los campos obligatorios.');
        }
    });
}

// Función de validación del formulario
function validarFormulario() {
    const camposObligatorios = [
        'cedula',
        'nombre',
        'apellido',
        'fecha_ingreso',
        'edad',
        'cargo',
        'sexo',
        'direccion',
        'email',
        'telefono'
    ];

    let esValido = true;

    camposObligatorios.forEach(campoId => {
        let campo = document.getElementById(campoId);

        if (campo) {
            let valor = campo.value.trim();
            let mensajeError = document.getElementById(`${campoId}_error`);

            if (!valor) {
                esValido = false;
                campo.style.borderColor = 'red'; // Cambiar borde a rojo si está vacío
                if (!mensajeError) {
                    // Crear el mensaje de error si no existe
                    mensajeError = document.createElement('div');
                    mensajeError.id = `${campoId}_error`;
                    mensajeError.style.color = 'red';
                    mensajeError.innerText = `El campo ${campoId} es obligatorio.`;
                    campo.parentNode.insertBefore(mensajeError, campo.nextSibling); // Mostrar mensaje de error
                }
            } else {
                campo.style.borderColor = ''; // Restablecer borde
                if (mensajeError) {
                    mensajeError.remove(); // Eliminar mensaje de error si el campo es válido
                }
            }
        } else {
            console.error(`El campo con ID "${campoId}" no existe en el formulario.`);
        }
    });

    return esValido;
}

// Función para registrar un nuevo empleado en el backend
async function registrarEmpleado() {
    // Recolecta los datos del formulario
    let datosEmpleado = {
        cedula: parseInt(document.getElementById('cedula').value.trim(), 10), // Convertir a número
        nombre: document.getElementById('nombre').value.trim(),
        segundo_nombre: document.getElementById('segundo_nombre').value.trim(),
        apellido: document.getElementById('apellido').value.trim(),
        segundo_apellido: document.getElementById('segundo_apellido').value.trim(),
        fecha_ingreso: document.getElementById('fecha_ingreso').value, // Fecha en formato ISO
        edad: parseInt(document.getElementById('edad').value.trim(), 10), // Convertir a número
        sexo: document.getElementById('sexo').value.trim(),
        direccion: document.getElementById('direccion').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        cargo: document.getElementById('cargo').value.trim()
    };

    try {
        const respuesta = await fetch('http://localhost:8080/api/empleado', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosEmpleado)
        });

        if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.statusText}`);
        }

        const datos = await respuesta.json();
        console.log('Empleado registrado con éxito:', datos);

        // Limpiar los campos del formulario
        document.getElementById('formEmpleado').reset();

    } catch (error) {
        console.error('Error al registrar el empleado:', error);
        alert('Ocurrió un error al registrar el empleado. Por favor, inténtelo de nuevo.');
    }
}
