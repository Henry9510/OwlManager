

document.addEventListener('DOMContentLoaded', function() {
    // Selección del botón y asignación del evento
    let boton = document.getElementById("btncrear");

    if (boton) {
        boton.addEventListener("click", evento => {
            registrarProducto();

            // Limpiar los campos del formulario
            document.getElementById('codigo').value = '';
            document.getElementById('nombre').value = '';
            document.getElementById('partNumber').value = '';
            document.getElementById('unidad').value = '';
            document.getElementById('procedencia').value = '';
            document.getElementById('material').value = '';
            document.getElementById('precio').value = '';
        });
    } else {
        console.error('El botón con ID "btncrear" no se encuentra en el DOM.');
    }
});

// Declaración de la función antes de su uso
let registrarProducto = async () => {
    // Recolecta los datos del formulario
    let campos = {
        codigo: document.getElementById('codigo').value.trim(),
        nombre: document.getElementById('nombre').value.trim(),
        partNumber: document.getElementById('partNumber').value.trim(),
        unidad: document.getElementById('unidad').value.trim(),
        procedencia: document.getElementById('procedencia').value.trim(),
        material: document.getElementById('material').value.trim(),
        precio: parseFloat(document.getElementById('precio').value.trim())
     };

     
    const respuesta = await fetch('http://localhost:8080/api/producto',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campos)
        });
        
}


