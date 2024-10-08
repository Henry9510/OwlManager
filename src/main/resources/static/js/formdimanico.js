

let timeoutId; // Variable para almacenar el identificador del temporizador

document.getElementById('cedula').addEventListener('input', function () {
    // Limpia el temporizador anterior si existe
    clearTimeout(timeoutId);

    // Configura un nuevo temporizador para hacer la búsqueda después de 500 ms
    timeoutId = setTimeout(buscarInsumo, 500);
});

async function buscarInsumo() {
    const ProductoBuscado = document.getElementById('cedula').value.trim();
    
    // Convertir la cédula a número si es necesario
    const CodigoProductoNumero = parseInt(ProductoBuscado, 10);
    if (!CodigoProductoNumero) {
        // Si no hay cédula, no hacer nada
        return;
    }

    try {
        const respuesta = await fetch(`http://localhost:8080/api/producto`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        if (!respuesta.ok) {
            throw new Error(`Error en la respuesta de la red: ${respuesta.statusText}`);
        }

        const producto = await respuesta.json(); // Aquí se espera que sea un objeto, no un array

        console.log('Datos recibidos:', producto);

        console.log('Cédula Buscada:', CodigoProductoNumero);

        const ProductoEncontrado = producto.find(prod => prod.codigo === CodigoProductoNumero);

        if (ProductoEncontrado) {
            console.log('Empleado encontrado:', ProductoEncontrado);

            
            
            // Actualiza los campos del formulario
            document.getElementById('nombre').value = ProductoEncontrado.nombre || '';
            document.getElementById('partNumber').value = ProductoEncontrado.partNumber || '';
        } else {
         
            // Limpiar los campos si no se encuentra el empleado
            document.getElementById('nombre').value = '';
            document.getElementById('partNumber').value = '';
            console.log('No se encontró ningún ');
        }

    } catch (error) {
        console.error('Error:', error);
        console.log('Hubo un problema al buscar ' + error.message);
    }
}

