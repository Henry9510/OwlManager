let timeoutId; // Variable para almacenar el identificador del temporizador
const mensajeError = document.getElementById('mensaje-error');

// Agregar un evento 'input' al campo insumo para búsqueda automática
document.getElementById('insumo').addEventListener('input', function () {
    clearTimeout(timeoutId); // Limpia el temporizador anterior si existe
    timeoutId = setTimeout(buscarInsumo, 500); // Configura un nuevo temporizador para hacer la búsqueda después de 500 ms
});

// Función para buscar insumos y llenar la descripción
async function buscarInsumo() {
    const insumoBuscado1 = document.getElementById('insumo').value.trim();
    const insumoBuscadoCodigo1 = parseInt(insumoBuscado1, 10);

    if (!insumoBuscado1 || isNaN(insumoBuscadoCodigo1)) {
        // Si no hay código de insumo válido, no hacer nada
        return;
    }

    try {
        const respuesta = await fetch(`http://localhost:8080/api/insumos/${insumoBuscadoCodigo1}`);
        if (!respuesta.ok) {
            throw new Error(`Error en la respuesta de la red: ${respuesta.statusText}`);
        }

        const insumoEncontrado1 = await respuesta.json();

        if (insumoEncontrado1) {
            console.log('Insumo encontrado:', insumoEncontrado1);
            mensajeError.textContent = "";
            // Actualiza los campos del formulario con los datos del insumo encontrado
            document.getElementById('description').value = insumoEncontrado1.nombre || '';
        } else {
            mensajeError.textContent = 'No se encontró ningún insumo con ese código.';
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al buscar el insumo: ' + error.message);
    }
}

// Evento para registrar la ubicación cuando se hace clic en el botón de guardar
document.addEventListener('DOMContentLoaded', function () {
    let boton = document.getElementById("btn-nuevo");
    if (boton) {
        boton.addEventListener("click", registrarUbicacion);
    } else {
        console.error('El botón con ID "btn-nuevo" no se encuentra en el DOM.');
    }
});


// Función para registrar la ubicación del insumo en el almacén
const registrarUbicacion = async () => {
    // Obtener los valores de los campos de entrada
    const insumoBuscadoCodigo2 = parseInt(document.getElementById('insumo').value.trim(), 10);
    const ubicacion = parseInt(document.getElementById('estante').value.trim()); // ID de la ubicación
    const fecha = document.getElementById("fecha").value;

    // Validar si todos los campos están completos
    if (!insumoBuscadoCodigo2 || isNaN(ubicacion) || !fecha) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Crear el objeto que se enviará en la solicitud
    const camposAlmacen = {
        "ubicacion": ubicacion,
        "insumo": {
            "codigo_insumo": insumoBuscadoCodigo2
        },
        "fecha": fecha,
        "entrada": 0, // Puedes ajustar este valor si es necesario
        "salida": 0,
        "status": 0,
        "stock": 0 // Puedes ajustar este valor si es necesario
    };

    console.log("Creando nuevo registro en almacén:", camposAlmacen);

    try {
        // Hacer la solicitud POST para crear el nuevo registro en el almacén
        const respuestaAlmacen = await fetch('http://localhost:8080/api/almacen', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(camposAlmacen)
        });

        // Verificar si la solicitud fue exitosa
        if (!respuestaAlmacen.ok) {
            const errorDataAlmacen = await respuestaAlmacen.json();
            console.error('Error al registrar en el almacén:', errorDataAlmacen);
            throw new Error(`Error al registrar en el almacén: ${respuestaAlmacen.statusText}`);
        }

        // Si el registro fue exitoso
        alert('Registro de entrada almacenado exitosamente');
        location.reload(); // Recargar la página

    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la conexión con el servidor: ' + error.message);
    }
};
