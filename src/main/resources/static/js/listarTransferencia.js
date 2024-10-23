function listarTransferencias() {
    fetch('http://localhost:8080/api/transferencias') // Llama a tu endpoint
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#Transferlist tbody');
            tbody.innerHTML = ''; // Limpiar contenido previo en la tabla

            data.forEach(transferencia => {
                const tr = document.createElement('tr');

                // Crear celdas para cada campo
                const tdFecha = document.createElement('td');
                tdFecha.textContent = transferencia.fecha;

                const tdREQ = document.createElement('td');
                tdREQ.textContent = transferencia.idTransferencia; // Suponiendo que este es el número de requisición

                const tdProyecto = document.createElement('td');
                tdProyecto.textContent = transferencia.proyecto.descripcion_proyecto;

                const tdUsuario = document.createElement('td');
                tdUsuario.textContent = transferencia.usuario ? transferencia.usuario.nombre : 'N/A'; // Suponiendo que tienes este campo

                const tdAcciones = document.createElement('td');
                const revisarBtn = document.createElement('button');
                revisarBtn.textContent = 'Revisar';
                revisarBtn.addEventListener('click', () => {
                    window.location.href = `detalle-transferencia/${transferencia.idTransferencia}`; // Navega a la página de detalles con el ID de la transferencia
                });

                tdAcciones.appendChild(revisarBtn);

                // Añadir celdas a la fila
                tr.appendChild(tdFecha);
                tr.appendChild(tdREQ);
                tr.appendChild(tdProyecto);
                tr.appendChild(tdUsuario);
                tr.appendChild(tdAcciones);

                // Añadir la fila al tbody
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Ejecutar la función al cargar la página
document.addEventListener('DOMContentLoaded', listarTransferencias);