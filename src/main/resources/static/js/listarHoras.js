// Inicialización
window.onload = function () {
    listarHoras();
};

// Variables globales
let horas = [];
let horasFiltradas = [];
let paginaActual = 1;
let filasPorPagina = 10; // Valor inicial para filas por página

// Función para listar horas
let listarHoras = async () => {
    try {
        const respuesta = await fetch('http://localhost:8080/api/registro-horas', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        horas = await respuesta.json();
        horasFiltradas = horas; // Inicialmente, todas las horas están filtradas
        mostrarHoras();
    } catch (error) {
        console.error("Error al listar horas:", error);
    }
};

// Función para mostrar horas en la tabla
const mostrarHoras = () => {
    const inicio = (paginaActual - 1) * filasPorPagina;
    const fin = inicio + filasPorPagina;
    const horasPagina = horasFiltradas.slice(inicio, fin);

    let contenidoTabla = "";
    for (let hora of horasPagina) {
        contenidoTabla += `<tr>
            <td>${hora.id}</td>
            <td>${hora.fecha}</td>
            <td>${hora.proyecto.codigo_proyecto}</td>
            <td>${hora.empleado.cedula}</td>
            <td>${hora.empleado.nombre} ${hora.empleado.apellido} ${hora.empleado.segundo_apellido}</td>
            <td>${hora.horas_trabajadas}</td>
            <td>${hora.usuario}</td>
            <td><button onclick="editarHora(${hora.id})" class="btn-editar">Editar</button></td>
            <td><button onclick="borrarHora(${hora.id})" class="btn-eliminar">Eliminar</button></td>
        </tr>`;
    }
    document.querySelector('#tablaHoras tbody').innerHTML = contenidoTabla;
    actualizarBotonesPaginacion();
};

// Función para filtrar horas
const filtrarHoras = () => {
    const query = document.getElementById('busqueda').value.toLowerCase();
    horasFiltradas = horas.filter(hora => {
        return (
            hora.fecha.toLowerCase().includes(query) ||
            hora.horas_trabajadas.toString().includes(query) ||
            hora.proyecto.codigo_proyecto.toLowerCase().includes(query) ||
            hora.empleado.cedula.toLowerCase().includes(query) ||
            hora.empleado.nombre.toLowerCase().includes(query)
        );
    });
    paginaActual = 1; // Resetear a la primera página después de una búsqueda
    mostrarHoras();
};

// Evento para el campo de búsqueda
document.getElementById('busqueda').addEventListener('input', filtrarHoras);

// Función para cambiar de página
const cambiarPagina = (incremento) => {
    paginaActual += incremento;
    mostrarHoras();
};

// Función para actualizar los botones de paginación
const actualizarBotonesPaginacion = () => {
    const totalPaginas = Math.ceil(horasFiltradas.length / filasPorPagina);
    document.getElementById('btnAnterior').disabled = paginaActual === 1;
    document.getElementById('btnSiguiente').disabled = paginaActual === totalPaginas;
    document.getElementById('numeroPagina').textContent = paginaActual;
};

// Manejar el cambio de filas por página
document.getElementById('filasPorPagina').addEventListener('change', (event) => {
    filasPorPagina = parseInt(event.target.value); // Actualizar filasPorPagina con el valor seleccionado
    paginaActual = 1; // Reiniciar a la primera página
    mostrarHoras(); // Mostrar horas con la nueva cantidad de filas
});

// Función para mostrar el formulario de registro/edición
const mostrarFormulario = () => {
    document.getElementById('formregistrohoras').style.display = 'block';
};

// Función para ocultar el formulario de registro/edición
const ocultarFormulario = () => {
    document.getElementById('formregistrohoras').style.display = 'none';
    document.getElementById('formregistrohoras').reset();
};

// Función para borrar una hora
window.borrarHora = async (id) => {
    if (confirm("¿Estás seguro de que quieres eliminar este registro?")) {
        try {
            await fetch(`http://localhost:8080/api/registro-horas/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            listarHoras(); // Volver a listar horas después de la eliminación
        } catch (error) {
            console.error("Error al eliminar la hora:", error);
        }
    }
};

// Función para editar una hora
window.editarHora = (id) => {
    const hora = horas.find(h => h.id === id);
    document.getElementById('idRegistroHoras').value = hora.id;
    document.getElementById('horas').value = hora.horas_trabajadas;
    document.getElementById('fecha').value = hora.fecha;
    document.getElementById('cedula').value = hora.empleado.cedula;
    document.getElementById('nombre').value = hora.empleado.nombre;
    document.getElementById('apellido').value = hora.empleado.apellido;
    document.getElementById('proyecto').value = hora.proyecto.codigo_proyecto;
    document.getElementById('segundo_apellido').value = hora.empleado.segundo_apellido;
    mostrarFormulario();
};

// Evento para el botón "Cancelar" en el formulario
document.getElementById('btnCancelar').addEventListener('click', (event) => {
    event.preventDefault();
    ocultarFormulario();
});

// Evento para el botón "Guardar" en el formulario
document.getElementById('formregistrohoras').addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = document.getElementById('idRegistroHoras').value;
    const data = {
        fecha: document.getElementById('fecha').value,
        horas_trabajadas: parseFloat(document.getElementById('horas').value),
        empleado: {
            cedula: document.getElementById('cedula').value
        },
        proyecto: {
            codigo_proyecto: document.getElementById('proyecto').value
        }
    };

    try {
        const response = await fetch(`http://localhost:8080/api/registro-horas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const registroActualizado = await response.json();
            alert('Registro actualizado correctamente');
            // Aquí puedes actualizar la tabla o hacer otra acción.
        } else {
            const error = await response.json();
            alert('Error al actualizar el registro: ' + error.message);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Hubo un error en la solicitud');
    }
});

