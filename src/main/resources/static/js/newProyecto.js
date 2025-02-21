


document.addEventListener('DOMContentLoaded', function () {
    let botonCrear = document.getElementById("btnNuevoProyecto");

    if (botonCrear) {
        crearNuevoProyecto(botonCrear);
    } else {
        console.error('El botón con ID no se encuentra en el DOM.');
    }
});

function crearNuevoProyecto(botonCrear) {
    botonCrear.addEventListener("click", async evento => {
        // Llama a la función para registrar un proyecto si es válido
        if (validarFormulario()) {
            await registrarProyecto();
        } else {
            alert('Por favor, completa todos los campos obligatorios.');
        }
    });
}

// Función para validar el formulario
const validarFormulario = () => {
    const datos = [
        'codigo_proyecto',
        'descripcion_proyecto',
        'fecha_inicio',
        'fecha_fin',
        'horas_estimadas'
    ];

    let esValido = true;

    datos.forEach(dato => {
        let campo = document.getElementById(dato);

        // Verificar si el campo existe
        if (campo) {
            let valor = campo.value.trim();
            let mensajeError = document.getElementById(`${dato}_error`);

            if (!valor) {
                esValido = false;
                campo.style.borderColor = 'red'; // Cambiar borde a rojo si está vacío
                if (!mensajeError) {
                    // Crear el mensaje de error si no existe
                    mensajeError = document.createElement('div');
                    mensajeError.id = `${dato}_error`;
                    mensajeError.style.color = 'red';
                    mensajeError.innerText = `El campo ${dato} es obligatorio.`;
                    campo.parentNode.insertBefore(mensajeError, campo.nextSibling); // Mostrar mensaje de error
                }
            } else {
                campo.style.borderColor = ''; // Restablecer borde
                if (mensajeError) {
                    mensajeError.remove(); // Eliminar mensaje de error si el campo es válido
                }
            }
        } else {
            console.error(`El campo con ID "${dato}" no existe en el formulario.`);
        }
    });

    return esValido;
};




let registrarProyecto = async () => {
    let campos = {
        codigo_proyecto: document.getElementById('codigo_proyecto').value.trim(),
        descripcion_proyecto: document.getElementById('descripcion_proyecto').value.trim(),
        fecha_inicio: document.getElementById('fecha_inicio').value,
        fecha_fin: document.getElementById('fecha_fin').value,
        horas_estimadas: document.getElementById('horas_estimadas').value.trim(),
        estado_proyecto: {
            id_estado: 1,
            nombre_estado: "En Progreso"
        }
    };

    try {
        const respuesta = await fetch('http://localhost:8080/api/proyecto', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(campos)

        });



        if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.statusText}`);
        }


        const datos = await respuesta.json();
        console.log('Proyecto registrado con éxito:', datos);

        document.getElementById('formRegistrarProyecto').reset();

    } catch (error) {
        console.error('Error al registrar el proyecto:', error);
        alert('Ocurrió un error al registrar el proyecto. Por favor, inténtelo de nuevo.');
    }
};
