window.onload = function () {
    listarProyectos();
    ocultarFormulario();
}

// Función para listar proyectos desde la API
let listarProyectos = async () => {
    try {
        const respuesta = await fetch('/api/proyecto', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        const proyectos = await respuesta.json();

        let contenidoTabla = "";

        for (let proyecto of proyectos) {
            let contenidoFila = `<tr>
                <td>${proyecto.codigo_proyecto}</td>
                <td>${proyecto.descripcion_proyecto}</td>
                <td>${proyecto.fecha_inicio}</td>
                <td>${proyecto.fecha_fin}</td>
                <td>${proyecto.horas_estimadas}</td>
                <td><button onClick="editarProyecto(${proyecto.codigo_proyecto})" class="btn-editar">Editar</button></td>
                <td><button onClick="borrarProyecto(${proyecto.codigo_proyecto})" class="btn-eliminar">Eliminar</button></td>
            </tr>`;
            contenidoTabla += contenidoFila;
        }

        // Actualizar solo el contenido del tbody
        document.querySelector('#tablaProyectos tbody').innerHTML = contenidoTabla;

    } catch (error) {
        console.error('Error al listar proyectos:', error);
    }
}

// Función para eliminar un proyecto
let borrarProyecto = async (id) => {
    try {
        const respuesta = await fetch(`http://localhost:8080/api/proyecto/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.status} ${respuesta.statusText}`);
        }

        listarProyectos();
    } catch (error) {
        console.error('Error al borrar proyecto:', error);
    }
}

// Funciones para mostrar y ocultar el formulario
function mostrarFormulario() {
    let formulario = document.getElementById("formEditarProyecto");
    if (formulario) {
        formulario.style.visibility = "visible"; // Cambié a display: block
    } else {
        console.error('Formulario con ID "formEditarProyecto" no encontrado.');
    }
}

function ocultarFormulario() {
    let formulario = document.getElementById("formEditarProyecto");
    if (formulario) {
        formulario.style.visibility = "hidden"; // Cambié a display: none
    } else {
        console.error('Formulario con ID "formEditarProyecto" no encontrado.');
    }
}

let idEditar;

// Función para editar un proyecto
let editarProyecto = async (codigo_proyecto) => {
    mostrarFormulario();
    idEditar = codigo_proyecto;

    try {
        const peticion = await fetch(`http://localhost:8080/api/proyecto/${codigo_proyecto}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!peticion.ok) {
            throw new Error(`Error en la solicitud: ${peticion.status} ${peticion.statusText}`);
        }

        const proyecto = await peticion.json();
        console.log('Proyecto recibido:', proyecto);

        document.getElementById("codigo_proyecto").value = proyecto.codigo_proyecto;
        document.getElementById("descripcion_proyecto").value = proyecto.descripcion_proyecto; // Asegúrate que el ID es correcto
        document.getElementById("horas_estimadas").value = proyecto.horas_estimadas;
        document.getElementById("fecha_fin").value = proyecto.fecha_fin;
        document.getElementById("fecha_inicio").value = proyecto.fecha_inicio;

    } catch (error) {
        console.error('Error al editar proyecto:', error);
    }
}

// Manejar el evento de modificación
document.addEventListener('DOMContentLoaded', function () {
    let btnModificar = document.getElementById("btnModificarProyecto");
    if (btnModificar) {
        btnModificar.addEventListener("click", evento => {
            evento.preventDefault(); // Evita el envío del formulario
            aplicarActualizacion(idEditar);
        });
    } else {
        console.error('El botón con ID "btnModificarProyecto" no se encuentra en el DOM.');
    }
});

// Función para aplicar la actualización
let aplicarActualizacion = async (id) => {
    let campos = {
        codigo_proyecto: document.getElementById('codigo_proyecto').value.trim(),
        descripcion_proyecto: document.getElementById('descripcion_proyecto').value.trim(), // Verifica que el ID es correcto
        fecha_inicio: document.getElementById('fecha_inicio').value,
        fecha_fin: document.getElementById('fecha_fin').value,
        horas_estimadas: parseFloat(document.getElementById('horas_estimadas').value.trim())
    };

    try {
        const respuesta = await fetch(`http://localhost:8080/api/proyecto/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campos)
        });

        if (!respuesta.ok) {
            const errorText = await respuesta.text();
            throw new Error(`Error en la solicitud: ${respuesta.status} ${respuesta.statusText} - ${errorText}`);
        }

        const datos = await respuesta.json();
        console.log('Proyecto actualizado con éxito:', datos);

        listarProyectos();
        ocultarFormulario();

    } catch (error) {
        console.error('Detalles del error:', error);
        alert('Ocurrió un error al actualizar el proyecto. Por favor, inténtelo de nuevo.');
    }
}
