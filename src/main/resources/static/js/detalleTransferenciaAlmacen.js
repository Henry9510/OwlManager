// Obtener el ID de la transferencia desde la URL
const params = new URLSearchParams(window.location.search);
const idTransferencia = params.get('id');

// Función para obtener los detalles de la transferencia
function obtenerDetalleTransferencia(id) {
    fetch(`http://localhost:8080/api/transferencia-almacen/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los detalles de la transferencia: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Detalles de la transferencia:', data);
            mostrarDetalles(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al obtener los detalles de la transferencia.');
        });
}

// Función para mostrar los detalles en la interfaz
function mostrarDetalles(transferencia) {
    const detallesDiv = document.getElementById('detallesTransferencia');

    detallesDiv.innerHTML = `
        <h2>Detalles de la Transferencia</h2>
        <p>ID Entrada: ${transferencia.id_entrada}</p>
        <p>Fecha: ${transferencia.fecha}</p>
    `;

    const insumosTable = document.getElementById('InsumosTransferidosList').querySelector('tbody');
    insumosTable.innerHTML = ''; // Limpiar contenido previo

    transferencia.insumos.forEach(insumo => {
        const tr = document.createElement('tr');

        const tdInsumo = document.createElement('td');
        tdInsumo.textContent = insumo.estante.codigo_insumo.nombre;

        const tdCantidad = document.createElement('td');
        tdCantidad.textContent = insumo.cantidad_entrada;

        const tdUbicacion = document.createElement('td');
        tdUbicacion.textContent = insumo.estante.ubicacion;

        const tdNumeroParte = document.createElement('td');
        tdNumeroParte.textContent = insumo.estante.codigo_insumo.numero_parte;

        tr.appendChild(tdInsumo);
        tr.appendChild(tdCantidad);
        tr.appendChild(tdUbicacion);
        tr.appendChild(tdNumeroParte);

        insumosTable.appendChild(tr);
    });
}

// Ejecutar la función para obtener el detalle cuando la página cargue
document.addEventListener('DOMContentLoaded', () => {
    if (idTransferencia) {
        obtenerDetalleTransferencia(idTransferencia);
    }
});
