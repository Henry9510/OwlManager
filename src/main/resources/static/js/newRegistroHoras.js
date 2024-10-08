
let timeoutId; // Variable para almacenar el identificador del temporizador

document.getElementById('cedula').addEventListener('input', function () {
    // Limpia el temporizador anterior si existe
    clearTimeout(timeoutId);

    // Configura un nuevo temporizador para hacer la búsqueda después de 500 ms
    timeoutId = setTimeout(buscarEmpleado, 500);
});

async function buscarEmpleado() {
    const cedulaBuscada = document.getElementById('cedula').value.trim();

    // Convertir la cédula a número si es necesario
    const cedulaBuscadaNumero = parseInt(cedulaBuscada, 10);
    if (!cedulaBuscada) {
        // Si no hay cédula, no hacer nada
        return;
    }

    try {
        const respuesta = await fetch(`http://localhost:8080/api/empleado`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        if (!respuesta.ok) {
            throw new Error(`Error en la respuesta de la red: ${respuesta.statusText}`);
        }

        const empleado = await respuesta.json(); // Aquí se espera que sea un objeto, no un array

        console.log('Datos recibidos:', empleado);

        console.log('Cédula Buscada:', cedulaBuscada);

        const empleadoEncontrado = empleado.find(emp => emp.cedula === cedulaBuscadaNumero);

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
            document.getElementById('nombre').value = '';
            document.getElementById('segundo_nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('segundo_apellido').value = '';
            console.log('No se encontró ningún empleado con esa cédula.');
        }

    } catch (error) {
        console.error('Error:', error);
        console.log('Hubo un problema al buscar el empleado: ' + error.message);
    }
}





let registrarHoras = async () => {
    // Recolecta los datos del formulario

    let campos = {
        numeroProyecto: document.getElementById('proyecto').value.trim(),
        descripcionProyecto: document.getElementById('horas').value.trim(),
    };



    try {
        const respuesta = await fetch('http://localhost:8080/api/proyecto', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campos)
        });

        if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.statusText}`);
        }

        const datos = await respuesta.json();
        console.log('Proyecto registrado con éxito:', datos);

        // Aquí podrías actualizar la lista de proyectos o realizar alguna otra acción
        // Por ejemplo: listarProyectos();

    } catch (error) {
        console.error('Error al registrar el proyecto:', error);
        alert('Ocurrió un error al registrar el proyecto. Por favor, inténtelo de nuevo.');
    }
}






document.addEventListener('DOMContentLoaded', function () {
    // Selección del botón y asignación del evento
    let botonRegistrarHoras = document.getElementById("BtnRegistrarHoras");

    if (botonRegistrarHoras) {
        botonRegistrarHoras.addEventListener("click", async evento => {
            evento.preventDefault(); // Evita que el formulario se envíe de la manera tradicional
            // Llama a la función para registrar un empleado
            await realizarRegistro();
        });
    } else {
        console.error('El botón con ID no se encuentra en el DOM.');
    }
});

// Declaración de la función antes de su uso
let realizarRegistro = async () => {
    // Recolecta los datos del formulario
    let campoHoras = {

        Fecha:document.getElementById("fecha").value ,
        HorasTrabajadas:document.getElementById("horas").value};

    try {
        const respuesta = await fetch('http://localhost:8080/api/registro_horas', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campoHoras)
        });

        console.log(campoHoras)

        if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.statusText}`);
        }

        const datos = await respuesta.json();
        console.log('Hora registrada con éxito:', datos);

        // Limpiar los campos del formulario
        document.getElementById('formregistrohoras').reset();

    } catch (error) {
        console.error('Error al registrar la hora:', error);
        alert('Ocurrió un error al registrar la hora. Por favor, inténtelo de nuevo.');
    }
}