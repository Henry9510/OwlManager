function listarTransferencias() {
    fetch('http://localhost:8080/api/transferencia-proyecto')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos de transferencias recibidos:', data);

            const tbody = document.querySelector('#Transferlist tbody');
            if (!tbody) {
                console.error('El tbody no se encontró en el DOM.');
                return; // Salir si el tbody no existe
            }

            tbody.innerHTML = ''; // Limpiar contenido previo en la tabla

            data.forEach(transferencia => {
                const tr = document.createElement('tr');

                const tdFecha = document.createElement('td');
                tdFecha.textContent = transferencia.fecha;

                const tdREQ = document.createElement('td');
                tdREQ.textContent = transferencia.id_transferencia;

                const tdProyecto = document.createElement('td');
                tdProyecto.textContent = transferencia.proyecto.descripcion_proyecto;

                const tdUsuario = document.createElement('td');
                tdUsuario.textContent = transferencia.usuario ? transferencia.usuario.nombre : 'N/A';

                const tdAcciones = document.createElement('td');
                const revisarBtn = document.createElement('button');
                revisarBtn.textContent = 'Revisar';
                revisarBtn.addEventListener('click', () => {
                    window.location.href = `detalle-transferencia/${transferencia.id_transferencia}`;
                });

                tdAcciones.appendChild(revisarBtn);

                tr.appendChild(tdFecha);
                tr.appendChild(tdREQ);
                tr.appendChild(tdProyecto);
                tr.appendChild(tdUsuario);
                tr.appendChild(tdAcciones);

                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Ejecutar la función al cargar la página
document.addEventListener('DOMContentLoaded', listarTransferencias);
