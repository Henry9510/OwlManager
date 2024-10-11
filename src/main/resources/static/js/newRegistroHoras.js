let timeoutId; // Variable para almacenar el identificador del temporizador
let listaproyceto = []; // Inicializa la variable global para almacenar proyectos

document.getElementById('cedula').addEventListener('input', function () {
    // Limpia el temporizador anterior si existe
    clearTimeout(timeoutId);

    // Configura un nuevo temporizador para hacer la búsqueda después de 500 ms
    timeoutId = setTimeout(buscarEmpleado, 500);
});

async function buscarEmpleado() {
    const cedulaBuscada = document.getElementById('cedula').value.trim();
    const cedulaBuscadaNumero = parseInt(cedulaBuscada, 10);

    if (!cedulaBuscada || isNaN(cedulaBuscadaNumero)) {
        // Si no hay cédula válida, no hacer nada
        return;
    }

    try {
        const respuesta = await fetch(`http://localhost:8080/api/empleado`);
        if (!respuesta.ok) {
            throw new Error(`Error en la respuesta de la red: ${respuesta.statusText}`);
        }

        const empleados = await respuesta.json(); // Aquí se espera que sea un array
        const empleadoEncontrado = empleados.find(emp => emp.cedula === cedulaBuscadaNumero);

        if (empleadoEncontrado) {
            console.log('Empleado encontrado:', empleadoEncontrado);
            // Actualiza los campos del formulario
            document.getElementById('nombre').value = empleadoEncontrado.nombre || '';
            document.getElementById('segundo_nombre').value = empleadoEncontrado.segundo_nombre || '';
            document.getElementById('apellido').value = empleadoEncontrado.apellido || '';
            document.getElementById('segundo_apellido').value = empleadoEncontrado.segundo_apellido || '';
        } else {
            console.log('No se encontró ningún empleado con esa cédula.');
            // Limpiar los campos si no se encuentra el empleado
            limpiarCamposEmpleado();
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al buscar el empleado: ' + error.message);
    }
}

function limpiarCamposEmpleado() {
    document.getElementById('nombre').value = '';
    document.getElementById('segundo_nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('segundo_apellido').value = '';
}

let registrarHoras = async () => {
    let campos = {
        fecha: document.getElementById("fecha").value.trim(),
        horas_trabajadas: parseInt(document.getElementById("horas").value.trim()),
        empleado: {
            cedula: document.getElementById('cedula').value.trim(),
        },
        proyecto: {
            codigo_proyecto: parseInt(document.getElementById('obtenerProyectos').value.trim()),
        }
    };

    try {
        const respuesta = await fetch('http://localhost:8080/api/registro-horas', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campos)
        });

        if (!respuesta.ok) {
            const respuestaTexto = await respuesta.text();
            console.error('Respuesta del servidor:', respuestaTexto);
            throw new Error(`Error en la solicitud: ${respuesta.statusText}`);
        }

        const datos = await respuesta.json();
        console.log('Registro de horas exitoso:', datos);
        alert('Registro de horas exitoso.');
        document.getElementById('formregistrohoras').reset();

    } catch (error) {
        console.error('Error al registrar horas:', error);
        alert('Ocurrió un error al registrar. Por favor, inténtelo de nuevo.');
    }
};

document.addEventListener('DOMContentLoaded', function () {
    const botonRegistrarHoras = document.getElementById("BtnRegistrarHoras");

    if (botonRegistrarHoras) {
        botonRegistrarHoras.addEventListener("click", async evento => {
            evento.preventDefault(); // Evita que el formulario se envíe de la manera tradicional
            await registrarHoras();
        });
    } else {
        console.error('El botón con ID no se encuentra en el DOM.');
    }

    obtenerProyectos(); // Llama a obtenerProyectos en el DOMContentLoaded
});

const obtenerProyectos = async () => {
    try {
        const respuesta = await fetch('http://localhost:8080/api/proyecto');
        if (!respuesta.ok) throw new Error('Error al obtener proyecto');
        listaproyceto = await respuesta.json(); // Guarda los proyectos en la variable
        poblarSelects(); // Llama a la función para poblar el select
    } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error al obtener los proyectos.');
    }
};

const poblarSelects = () => {
    const proyectosSelect = document.getElementById('obtenerProyectos');

    // Limpia el select antes de poblarlo
    proyectosSelect.innerHTML = '';

    // Agrega la opción en blanco
    const opcionVacia = document.createElement('option');
    opcionVacia.value = '';
    opcionVacia.textContent = 'Seleccione un Proyecto';
    proyectosSelect.appendChild(opcionVacia);

    // Poblar el campo Proyecto
    listaproyceto.forEach(proyecto => {
        let option = document.createElement('option');
        option.value = proyecto.codigo_proyecto; // Código del proyecto
        option.textContent = proyecto.descripcion_proyecto; // Texto que se mostrará en el select
        proyectosSelect.appendChild(option);
    });
}
