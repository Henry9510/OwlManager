// Inicialización
window.onload = function () {
    ocultarFormulario();
    listarEmpleados();
};

// Variables globales
let empleados = [];
let empleadosFiltrados = [];
let paginaActual = 1;
let filasPorPagina = 10; // Valor inicial para filas por página

// Función para listar empleados
let listarEmpleados = async () => {
    try {
        const respuesta = await fetch('http://localhost:8080/api/empleado', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        empleados = await respuesta.json();
        empleadosFiltrados = empleados; // Inicialmente, todos los empleados están filtrados
        mostrarEmpleados();
    } catch (error) {
        console.error("Error al listar empleados:", error);
    }
};

// Función para mostrar empleados en la tabla
const mostrarEmpleados = () => {
    const inicio = (paginaActual - 1) * filasPorPagina;
    const fin = inicio + filasPorPagina;
    const empleadosPagina = empleadosFiltrados.slice(inicio, fin);

    let contenidoTabla = "";
    for (let empleado of empleadosPagina) {
        contenidoTabla += `<tr>
            <td>${empleado.cedula}</td>
            <td>${empleado.nombre}</td>
            <td>${empleado.segundo_nombre || ''}</td>
            <td>${empleado.apellido}</td>
            <td>${empleado.segundo_apellido || ''}</td>
            <td>${empleado.edad}</td>
            <td>${empleado.fecha_ingreso}</td>
            <td>${empleado.sexo}</td>
            <td>${empleado.celular}</td>
            <td>${empleado.direccion}</td>
            <td>${empleado.email}</td>
            <td><button onclick="editarEmpleado(${empleado.cedula})" class="btn-editar">Editar</button></td>
            <td><button onclick="borrarEmpleado(${empleado.cedula})" class="btn-eliminar">Eliminar</button></td>
        </tr>`;
    }
    document.querySelector('#tablaEmpleados tbody').innerHTML = contenidoTabla;
    actualizarBotonesPaginacion();
};

// Función para filtrar empleados
const filtrarEmpleados = () => {
    const query = document.getElementById('busqueda').value.toLowerCase();
    empleadosFiltrados = empleados.filter(empleado => {
        return (
            empleado.nombre.toLowerCase().includes(query) ||
            empleado.apellido.toLowerCase().includes(query) ||
            empleado.cedula.toString().includes(query)
        );
    });
    paginaActual = 1; // Resetear a la primera página después de una búsqueda
    mostrarEmpleados();
};

// Evento para el campo de búsqueda
document.getElementById('busqueda').addEventListener('input', filtrarEmpleados);

// Función para cambiar de página
const cambiarPagina = (incremento) => {
    paginaActual += incremento;
    mostrarEmpleados();
};

// Función para actualizar los botones de paginación
const actualizarBotonesPaginacion = () => {
    const totalPaginas = Math.ceil(empleadosFiltrados.length / filasPorPagina);
    document.getElementById('btnAnterior').disabled = paginaActual === 1;
    document.getElementById('btnSiguiente').disabled = paginaActual === totalPaginas;
    document.getElementById('numeroPagina').textContent = paginaActual;
};

// Manejar el cambio de filas por página
document.getElementById('filasPorPagina').addEventListener('change', (event) => {
    filasPorPagina = parseInt(event.target.value); // Actualizar filasPorPagina con el valor seleccionado
    paginaActual = 1; // Reiniciar a la primera página
    mostrarEmpleados(); // Mostrar empleados con la nueva cantidad de filas
});

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
        await listarEmpleados();
    } catch (error) {
        console.error('Error al borrar el empleado:', error);
        alert('Ocurrió un error al borrar el empleado. Por favor, inténtelo de nuevo.');
    }
};

// Funciones para mostrar y ocultar el formulario
function mostrarFormulario() {
    const formulario = document.getElementById("formEditarEmpleado");
    if (formulario) {
        formulario.style.visibility = "visible";
    }
}

function ocultarFormulario() {
    const formulario = document.getElementById("formEditarEmpleado");
    if (formulario) {
        formulario.style.visibility = "hidden";
    }
}

// Función para editar un empleado
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
        document.getElementById('telefono').value = empleado.celular;
    } catch (error) {
        console.error('Error al cargar los datos del empleado:', error);
    }
};

// Evento para modificar un empleado
document.addEventListener('DOMContentLoaded', function () {
    const btnModificar = document.getElementById("btnModificarEmpleado");
    if (btnModificar) {
        btnModificar.addEventListener("click", async (evento) => {
            evento.preventDefault();
            await actualizarEmpleado(idEditar);
            ocultarFormulario();
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const btnCancelar = document.getElementById("btnCancelar");
    if (btnCancelar) {
        btnCancelar.addEventListener("click", async (evento) => {
            ocultarFormulario();
        });
    }
});

// Función para actualizar la información de un empleado
let actualizarEmpleado = async (idEditar) => {
    const arreglo = {
        cedula: parseInt(document.getElementById('cedula').value.trim(), 10),
        nombre: document.getElementById('nombre').value.trim(),
        segundo_nombre: document.getElementById('segundo_nombre').value.trim(),
        apellido: document.getElementById('apellido').value.trim(),
        segundo_apellido: document.getElementById('segundo_apellido').value.trim(),
        fecha_ingreso: document.getElementById('fecha_ingreso').value,
        edad: parseInt(document.getElementById('edad').value.trim(), 10),
        sexo: document.getElementById('sexo').value.trim(),
        direccion: document.getElementById('direccion').value.trim(),
        email: document.getElementById('email').value.trim(),
        celular: document.getElementById('telefono').value.trim(),
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
        await listarEmpleados();
    } catch (error) {
        console.error('Error al actualizar el empleado:', error);
        alert('Ocurrió un error al actualizar el empleado. Por favor, inténtelo de nuevo.');
    }
};

// Funciones para la paginación
document.getElementById('btnAnterior').addEventListener('click', () => cambiarPagina(-1));
document.getElementById('btnSiguiente').addEventListener('click', () => cambiarPagina(1));
