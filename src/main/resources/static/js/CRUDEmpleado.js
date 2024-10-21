window.onload = function () {
    ocultarFormulario();
    listarEmpleado();

}



let listarEmpleado = async () => {

    const respuesta = await fetch('http://localhost:8080/api/empleado', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    // Convertir la respuesta en JSON
    const empleados = await respuesta.json(); // Corregido: respuesta.json()
console.log(empleados)
    // Crear contenido para la tabla
    let contenidoTabla = "";


    for (let empleado of empleados) {
        let contenidoFila = `<tr>
                <td>${empleado.cedula}</td>
                <td>${empleado.nombre}</td>
                <td>${empleado.segundo_nombre||''}</td>
                <td>${empleado.apellido}</td>
                <td>${empleado.segundo_apellido||''}</td>
                <td>${empleado.edad}</td>
                <td>${empleado.fecha_ingreso}</td>
                <td>${empleado.sexo}</td>
                <td>${empleado.telefono}</td>
                <td>${empleado.direccion}</td>
                <td>${empleado.email}</td>
                <td><button onclick="editarEmpleado(${empleado.cedula})" class="btn-editar">Editar</button></td>
                <td><button onclick="borrarEmpleado(${empleado.cedula})" class="btn-eliminar">Eliminar</button></td>
            </tr>`;
        contenidoTabla += contenidoFila;
    }

    // Actualizar solo el contenido del tbody
    document.querySelector('#tablaEmpleados tbody').innerHTML = contenidoTabla; // Corregido: innerHTML
}



// Función para borrar un empleado
window.borrarEmpleado = async (cedula) => {
    try {
        const respuesta = await fetch(`http://localhost:8080/api/empleado/${cedula}`, {
            method: 'DELETE'
        });

        if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.statusText}`);
        }

        console.log('Empleado borrado con éxito');
        await listarEmpleado();
    } catch (error) {
        console.error('Error al borrar el empleado:', error);
        alert('Ocurrió un error al borrar el empleado. Por favor, inténtelo de nuevo.');
    }
}



function mostrarFormulario() {
    let formulario = document.getElementById("formEditarEmpleado");
    if (formulario) {
        formulario.style.visibility = "visible";
    } else {
        console.error('Formulario con ID "formEditarProyecto" no encontrado.');
    }
}

function ocultarFormulario() {
    let formulario = document.getElementById("formEditarEmpleado");
    if (formulario) {
        formulario.style.visibility = "hidden";
    } else {
        console.error('Formulario con ID "formEditarProyecto" no encontrado.');
    }
}

let idEditar;

let editarEmpleado = async (cedula) => {
    mostrarFormulario();
    idEditar = cedula;


    try {
        const respuesta = await fetch(`http://localhost:8080/api/empleado/${cedula}`);
        if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.statusText}`);
        }

        const empleado = await respuesta.json();


        document.getElementById('cedula').value = empleado.cedula;
        document.getElementById('nombre').value = empleado.nombre;
        document.getElementById('segundo_nombre').value = empleado.segundo_nombre || '';
        document.getElementById('apellido').value = empleado.apellido;
        document.getElementById('segundo_apellido').value = empleado.segundo_apellido || '';
        document.getElementById('fecha_ingreso').value = empleado.fecha_ingreso;
        document.getElementById('edad').value = empleado.edad;
        document.getElementById('sexo').value = empleado.sexo;
        document.getElementById('cargo').value = empleado.cargo;
        document.getElementById('direccion').value = empleado.direccion;
        document.getElementById('email').value = empleado.email;
        document.getElementById('telefono').value = empleado.telefono;
    } catch (error) {
        console.error('Error al cargar los datos del empleado:', error);
    }
}



document.addEventListener('DOMContentLoaded', function() {
    let btnModificar = document.getElementById("btnModificarEmpleado");
    if (btnModificar) {
        btnModificar.addEventListener("click", evento => {
            evento.preventDefault(); // Evita el envío del formulario para la demostración
            actualizarEmpleado(idEditar);
            ocultarFormulario()
        });
    } else {
        console.error('El botón con ID "btnModificar" no se encuentra en el DOM.');
    }
});




// Función para actualizar la información de un empleado existente
let actualizarEmpleado = async (idEditar) => {
     // Asume que tienes un campo oculto o de otro tipo para el ID del empleado
    let arreglo = {
        cedula: parseInt(document.getElementById('cedula').value.trim(), 10), // Convertir a número
        nombre: document.getElementById('nombre').value,
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
        const respuesta = await fetch(`http://localhost:8080/api/empleado/${idEditar}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(arreglo)
        });

        if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.statusText}`);
        }

        const datos = await respuesta.json();
        console.log('Empleado actualizado con éxito:', datos);

        await listarEmpleado();

    } catch (error) {
        console.error('Error al actualizar el empleado:', error);
        alert('Ocurrió un error al actualizar el empleado. Por favor, inténtelo de nuevo.');
    }
}

