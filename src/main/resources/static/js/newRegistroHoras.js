let timeoutId; // Variable para almacenar el identificador del temporizador
let listaProyectos = []; // Variable global para almacenar proyectos

// Evento de entrada en el campo 'cedula'
document.getElementById('cedula').addEventListener('input', function () {
    clearTimeout(timeoutId); // Limpia el temporizador anterior si existe
    timeoutId = setTimeout(buscarEmpleado, 500); // Configura un nuevo temporizador de 500 ms
});

// Función para buscar empleado
async function buscarEmpleado() {
    const cedulaBuscada = document.getElementById('cedula').value.trim();
    const cedulaBuscadaNumero = parseInt(cedulaBuscada, 10);

    if (!cedulaBuscada || isNaN(cedulaBuscadaNumero)) return;

    try {
        const respuesta = await fetch(`http://localhost:8080/api/empleado`);
        if (!respuesta.ok) throw new Error(`Error en la respuesta de la red: ${respuesta.statusText}`);

        const empleados = await respuesta.json();
        const empleadoEncontrado = empleados.find(emp => emp.cedula === cedulaBuscadaNumero);

        if (empleadoEncontrado) {
            console.log('Empleado encontrado:', empleadoEncontrado);
            document.getElementById('nombre').value = empleadoEncontrado.nombre || '';
            document.getElementById('segundo_nombre').value = empleadoEncontrado.segundo_nombre || '';
            document.getElementById('apellido').value = empleadoEncontrado.apellido || '';
            document.getElementById('segundo_apellido').value = empleadoEncontrado.segundo_apellido || '';
        } else {
            console.log('No se encontró ningún empleado con esa cédula.');
            limpiarCamposEmpleado();
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al buscar el empleado: ' + error.message);
    }
}

// Función para limpiar campos del formulario
function limpiarCamposEmpleado() {
    document.getElementById('nombre').value = '';
    document.getElementById('segundo_nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('segundo_apellido').value = '';
}

// Función para registrar horas trabajadas
async function registrarHoras() {
    const horasRegistradas = parseInt(document.getElementById("horas").value.trim());
    const codigoProyecto = parseInt(document.getElementById("obtenerProyectos").value.trim());

    if (isNaN(horasRegistradas) || isNaN(codigoProyecto)) {
        alert("Por favor, ingresa valores válidos.");
        return;
    }

    try {
        // Registrar las horas en el sistema
        const campos = {
            fecha: document.getElementById("fecha").value.trim(),
            horas_trabajadas: horasRegistradas,
            empleado: { cedula: parseInt(document.getElementById('cedula').value.trim()) },
            proyecto: { codigo_proyecto: codigoProyecto }
        };

        let respuesta = await fetch('http://localhost:8080/api/registro-horas', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(campos)
        });

        if (!respuesta.ok) throw new Error(`Error en la solicitud de registro de horas: ${respuesta.statusText}`);
        console.log('Registro de horas exitoso');
        alert('Registro de horas exitoso.');
        document.getElementById('formregistrohoras').reset();

        // Llama a actualizarHorasProyecto después del registro exitoso
        await actualizarHorasProyecto(codigoProyecto, horasRegistradas);

    } catch (error) {
        console.error('Error al registrar horas:', error);
        alert('Ocurrió un error al registrar. Por favor, inténtelo de nuevo.');
    }
}

// Función para actualizar las horas en el proyecto
const actualizarHorasProyecto = async (codigoProyecto, horasRegistradas) => {
    try {
        const respuesta = await fetch(`http://localhost:8080/api/proyecto/${codigoProyecto}/incrementarHoras`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ horas_reales: horasRegistradas }) // Enviamos las horas a incrementar
        });

        if (!respuesta.ok) throw new Error('Error al actualizar las horas del proyecto.');
        console.log('Horas actualizadas exitosamente.');
    } catch (error) {
        console.error('Error en la actualización de horas:', error);
        alert('Hubo un problema al actualizar las horas en el proyecto.');
    }
};


// Configuración inicial al cargar el DOM
document.addEventListener('DOMContentLoaded', function () {
    const botonRegistrarHoras = document.getElementById("BtnRegistrarHoras");

    if (botonRegistrarHoras) {
        botonRegistrarHoras.addEventListener("click", async evento => {
            evento.preventDefault();
            await registrarHoras();
        });
    } else {
        console.error('El botón con ID no se encuentra en el DOM.');
    }

    obtenerProyectos();
});

// Función para obtener proyectos y llenar el select
const obtenerProyectos = async () => {
    try {
        const respuesta = await fetch('http://localhost:8080/api/proyecto');
        if (!respuesta.ok) throw new Error('Error al obtener proyecto');
        listaProyectos = await respuesta.json();
        poblarSelects();
    } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error al obtener los proyectos.');
    }
};

// Función para llenar el select de proyectos
const poblarSelects = () => {
    const proyectosSelect = document.getElementById('obtenerProyectos');
    proyectosSelect.innerHTML = '';

    const opcionVacia = document.createElement('option');
    opcionVacia.value = '';
    opcionVacia.textContent = 'Seleccione un Proyecto';
    proyectosSelect.appendChild(opcionVacia);

    listaProyectos.forEach(proyecto => {
        const option = document.createElement('option');
        option.value = proyecto.codigo_proyecto;
        option.textContent = proyecto.descripcion_proyecto;
        proyectosSelect.appendChild(option);
    });
};
