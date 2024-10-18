let timeoutId; // Variable para almacenar el identificador del temporizador
const mensajeError = document.getElementById('mensaje-error');

// Función para limpiar los campos del insumo
function limpiarCamposInsumo() {
    document.getElementById('description').value = '';  // Limpia el campo de descripción
}

// Agregar un evento 'input' al campo insumo para búsqueda automática
document.getElementById('insumo').addEventListener('input', function () {
    clearTimeout(timeoutId); // Limpia el temporizador anterior si existe
    // Configura un nuevo temporizador para hacer la búsqueda después de 500 ms
    timeoutId = setTimeout(buscarInsumo, 500);
});

// Función para buscar insumos y llenar la descripción
async function buscarInsumo() {
    const insumoBuscado1 = document.getElementById('insumo').value.trim();
    const insumoBuscadoCodigo1 = parseInt(insumoBuscado1, 10);

    if (!insumoBuscado1 || isNaN(insumoBuscadoCodigo1)) {
        limpiarCamposInsumo();
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
            mensajeError.textContent = "";  // Limpia cualquier mensaje de error
            document.getElementById('description').value = insumoEncontrado1.nombre || '';
        } else {
            mensajeError.textContent = 'No se encontró ningún insumo con ese código.';
            limpiarCamposInsumo();
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al buscar el insumo: ' + error.message);
    }
}

// Función para actualizar la cantidad de entrada en el almacén (PUT)
const actualizarAlmacen = async (ubicacion, insumoBuscadoCodigo, fecha, nuevaCantidadEntrada, datosAlmacen) => {
    // Sumar la nueva cantidad de entrada a la cantidad actual
    const nuevaEntradaTotal = (datosAlmacen.entrada || 0) + nuevaCantidadEntrada;

    const actualizarAlmacenRespuesta = await fetch(`http://localhost:8080/api/almacen/${ubicacion}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "ubicacion": ubicacion,
            "insumo": {
                "codigo_insumo": insumoBuscadoCodigo
            },
            "fecha": fecha,
            "entrada": nuevaEntradaTotal,  // Usar la nueva cantidad total de entrada
            "salida": datosAlmacen.salida || 0,
            "status": datosAlmacen.status || 0,
            "stock": datosAlmacen.stock || 0
        })
    });

    if (!actualizarAlmacenRespuesta.ok) {
        const errorDataAlmacen = await actualizarAlmacenRespuesta.json();
        console.error('Error al actualizar en el almacén:', errorDataAlmacen);
        throw new Error(`Error al actualizar en el almacén: ${actualizarAlmacenRespuesta.statusText}`);
    }

    console.log("Cantidad de entrada actualizada en el almacén correctamente.");
};

// Función para guardar el registro de entrada en almacén (POST)
const guardarRegistroEntrada = async (ubicacion, insumoBuscadoCodigo, fecha, cantidadEntrada) => {
    const respuestaRegistro = await fetch('http://localhost:8080/api/registro-entradas-almacen', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "cantidad_entrada": cantidadEntrada,
            "fecha": fecha,
            "estante": {
                "ubicacion": ubicacion,
                "insumo": {
                    "codigo_insumo": insumoBuscadoCodigo
                },
                "fecha": fecha,
            }
        })
    });

    if (!respuestaRegistro.ok) {
        const errorDataRegistro = await respuestaRegistro.json();
        console.error('Error al guardar el registro de entrada:', errorDataRegistro);
        throw new Error(`Error al guardar el registro de entrada: ${respuestaRegistro.statusText}`);
    }

    console.log("Registro de entrada almacenado correctamente.");
};

// Función principal para ejecutar las operaciones secuencialmente
const manejarEntradaAlmacen = async () => {
    try {
        let insumoBuscadoCodigo = parseInt(document.getElementById('insumo').value.trim(), 10);
        let cantidadEntrada = parseInt(document.getElementById('cantidad_entrada').value.trim(), 10);
        let ubicacion = parseInt(document.getElementById('Estante').value.trim());
        let fecha = document.getElementById("fecha").value;

        if (!insumoBuscadoCodigo || isNaN(cantidadEntrada) || cantidadEntrada <= 0 || isNaN(ubicacion) || !fecha) {
            alert('Por favor, completa todos los campos correctamente.');
            return;
        }

        const respuestaDatosAlmacen = await fetch(`http://localhost:8080/api/almacen/${ubicacion}`);
        const datosAlmacen = await respuestaDatosAlmacen.json();

        await actualizarAlmacen(ubicacion, insumoBuscadoCodigo, fecha, cantidadEntrada, datosAlmacen);

        await guardarRegistroEntrada(ubicacion, insumoBuscadoCodigo, fecha, cantidadEntrada);

        alert('Operaciones completadas exitosamente.');
        document.getElementById("miFormulario").reset();  // Limpiar el formulario en vez de recargar la página

    } catch (error) {
        console.error('Error en las operaciones:', error);
        alert('Error en la conexión con el servidor: ' + error.message);
    }
};

// Evento para ejecutar las operaciones cuando se hace clic en el botón
document.addEventListener('DOMContentLoaded', function () {
    let boton = document.getElementById("btn-nuevo");
    if (boton) {
        boton.addEventListener("click", manejarEntradaAlmacen);
    } else {
        console.error('El botón con ID "btn-nuevo" no se encuentra en el DOM.');
    }
});
