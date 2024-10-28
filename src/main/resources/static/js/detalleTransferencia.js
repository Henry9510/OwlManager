// Obtener el ID de la transferencia desde la URL
const params = new URLSearchParams(window.location.search);
const idTransferencia = params.get('id');

// Función para obtener los detalles de la transferencia
function obtenerDetalleTransferencia(id) {
    fetch(`http://localhost:8080/api/transferencia-proyecto/${id}`) // Llama al endpoint con el ID de la transferencia
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#InsumosTransferidosList tbody');
            tbody.innerHTML = ''; // Limpiar contenido previo

            // Iterar sobre los insumos transferidos y agregarlos a la tabla
            data.insumos.forEach(insumoTransferido => {
                const tr = document.createElement('tr');

                const tdInsumo = document.createElement('td');
                tdInsumo.textContent = insumoTransferido.insumo.nombre; // Suponiendo que tienes un campo 'nombre'

                const tdCantidad = document.createElement('td');
                tdCantidad.textContent = insumoTransferido.cantidad_salida;

                tr.appendChild(tdInsumo);
                tr.appendChild(tdCantidad);

                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Ejecutar la función para obtener el detalle cuando la página cargue
document.addEventListener('DOMContentLoaded', () => {
    if (idTransferencia) {
        obtenerDetalleTransferencia(idTransferencia);
    }
});