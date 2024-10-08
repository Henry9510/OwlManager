window.onload = function () {
    listarProyectos();
}

let listarProyectos = async () => {
    try {
        // Obtener los proyectos desde la API
        const respuesta = await fetch('/api/proyecto', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        // Convertir la respuesta en JSON
        const proyectos = await respuesta.json();

        // Crear contenido para la tabla
        let contenidoTabla = "";

        for (let proyecto of proyectos) {
            let contenidoFila = `<tr>
                 <td>${proyecto.id}</td>
        <td>${proyecto.fechaInicio}</td>
        <td>${proyecto.fechaFin}</td>
        <td>${proyecto.numeroProyecto}</td>
        <td>${proyecto.descripcionProyecto}</td>
        <td>${proyecto.horasEstimadas}</td>
        <td>${proyecto.horasReales}</td>
                <td><button onClick="editarProyecto(${proyecto.id})" class="btn-editar">Editar</button></td>
                <td><button onClick="borrarProyecto(${proyecto.id})" class="btn-eliminar">Eliminar</button></td>
            </tr>`;
            contenidoTabla += contenidoFila;
        }

        // Actualizar solo el contenido del tbody
        document.querySelector('#tablaProyectos tbody').innerHTML = contenidoTabla;

    } catch (error) {
        console.error('Error al listar proyectos:', error);
    }
}

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

function mostrarFormulario() {
    let formulario = document.getElementById("formEditarProyecto");
    if (formulario) {
        formulario.style.visibility = "visible";
    } else {
        console.error('Formulario con ID "formEditarProyecto" no encontrado.');
    }
}

function ocultarFormulario() {
    let formulario = document.getElementById("formEditarProyecto");
    if (formulario) {
        formulario.style.visibility = "hidden";
    } else {
        console.error('Formulario con ID "formEditarProyecto" no encontrado.');
    }
}

let idEditar;

let editarProyecto = async (id) => {
    mostrarFormulario();
    idEditar = id;

    try {
        const peticion = await fetch(`http://localhost:8080/api/proyecto/${id}`, {
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

        document.getElementById("numeroProyecto").value = proyecto.numeroProyecto;
        document.getElementById("descripcionProyecto").value = proyecto.descripcionProyecto;
        document.getElementById("horasEstimadas").value = proyecto.horasEstimadas;
        document.getElementById("fechaInicio").value=proyecto.fechaInicio;
        document.getElementById("fechaFin").value=proyecto.fechaFin;
        document.getElementById("horasReales").value=proyecto.horasReales;
        
    } catch (error) {
        console.error('Error al editar proyecto:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    let btnModificar = document.getElementById("btnModificarProyecto");
    if (btnModificar) {
        btnModificar.addEventListener("click", evento => {
            evento.preventDefault(); // Evita el envío del formulario para la demostración
            aplicarActualizacion(idEditar);
        });
    } else {
        console.error('El botón con ID "btnModificarProyecto" no se encuentra en el DOM.');
    }
});

let aplicarActualizacion = async (id) => {
    let campos = {
        numeroProyecto: document.getElementById('numeroProyecto').value.trim(),
        descripcionProyecto: document.getElementById('descripcionProyecto').value.trim(),
        fechaInicio: document.getElementById('fechaInicio').value,
        fechaFin: document.getElementById('fechaFin').value,
        horasEstimadas: parseFloat(document.getElementById('horasEstimadas').value.trim()),
        horasReales: parseFloat(document.getElementById('horasReales').value.trim())
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
