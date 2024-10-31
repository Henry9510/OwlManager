async function listarTransferencias() {
    try {
        const response = await fetch('http://localhost:8080/api/transferencia-proyecto');
        if (!response.ok) {
            throw new Error('La respuesta de la red no fue correcta: ' + response.statusText);
        }

        const data = await response.json();
        console.log('Datos de transferencias recibidos:', data);

        // Filtrar las transferencias con estado "pending"
        const transferenciasPending = data.filter(transferencia => transferencia.estado === 'PENDING');

        const tbody = document.querySelector('#Transferlist tbody');
        if (!tbody) {
            console.error('El tbody no se encontró en el DOM.');
            return; // Salir si el tbody no existe
        }

        tbody.innerHTML = '';

        transferenciasPending.forEach(transferencia => {
            const tr = document.createElement('tr');

            const tdFecha = document.createElement('td');
            tdFecha.textContent = transferencia.fecha;

            const tdEstado = document.createElement('td');
            tdEstado.textContent = transferencia.estado;

            const tdREQ = document.createElement('td');
            tdREQ.textContent = transferencia.id_transferencia;

            const tdProyecto = document.createElement('td');
            tdProyecto.textContent = transferencia.proyecto.descripcion_proyecto;

            const tdUsuario = document.createElement('td');
            tdUsuario.textContent = transferencia.usuario ? transferencia.usuario.nombre : 'N/A';

            const tdAcciones = document.createElement('td');
            const recibirBtn = document.createElement('button');
            const revisarBtn = document.createElement('button');
            recibirBtn.textContent = ' RECIBIR';

            revisarBtn.textContent = ' REVISAR';
            revisarBtn.addEventListener('click', () => {
                window.location.href = `detalle-transferencia/${transferencia.id_transferencia}`;
            });

            recibirBtn.addEventListener('click', async () => {
                const registroTransferencia = {
                    fecha: transferencia.fecha, // Asegúrate de que esto esté correcto
                    estado: "RECIBIDA",
                    proyecto: {
                        codigo_proyecto: transferencia.proyecto.codigo_proyecto, // Asegúrate de que esto esté definido
                    },
                    insumos: transferencia.insumos || [] // Asegúrate de que esto esté definido
                };

                console.log('Datos a enviar:', JSON.stringify(registroTransferencia, null, 2));

                try {
                    console.log('Enviando datos al backend...');
                    const response = await fetch(`http://localhost:8080/api/transferencia-proyecto/${transferencia.id_transferencia}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(registroTransferencia),
                    });

                    if (!response.ok) {
                        const error = await response.json();
                        throw new Error('Error al guardar la transferencia: ' + JSON.stringify(error));
                    }

                    const result = await response.json();
                    console.log('Transferencia guardada:', result);
                    alert('Transferencia guardada exitosamente');

                    // Aquí podrías actualizar la interfaz o eliminar la fila de la tabla si es necesario
                    tr.remove(); // Remover la fila de la tabla
                } catch (error) {
                    console.error('Error al enviar datos:', error);
                    alert('Ocurrió un error al guardar la transferencia: ' + error.message);
                }
            });

            tdAcciones.appendChild(recibirBtn);
            tdAcciones.appendChild(revisarBtn);
            tr.appendChild(tdFecha);
            tr.appendChild(tdREQ);
            tr.appendChild(tdProyecto);
            tr.appendChild(tdEstado);
            tr.appendChild(tdUsuario);
            tr.appendChild(tdAcciones);

            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al listar transferencias:', error);
    }
}

// Ejecutar la función al cargar la página
document.addEventListener('DOMContentLoaded', listarTransferencias);
