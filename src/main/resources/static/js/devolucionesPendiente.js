async function listarTransferencias() {
    try {
        const response = await fetch('http://localhost:8080/api/transferencia-almacen');

        if (!response.ok) {
            throw new Error(`Error en la respuesta de la red: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Transferencias obtenidas:', data);

        const transferenciasPending = data.filter(transferencia => transferencia.estado === 'PENDING');

        const tbody = document.querySelector('#Transferlist tbody');
        if (!tbody) {
            console.error('No se encontró el tbody en el DOM.');
            return;
        }

        tbody.innerHTML = ''; // Limpiar contenido previo

        transferenciasPending.forEach(transferencia => {
            const tr = document.createElement('tr');

            // Crear celdas para cada campo
            const tdFecha = document.createElement('td');
            tdFecha.textContent = transferencia.fecha;

            const tdEstado = document.createElement('td');
            tdEstado.textContent = transferencia.estado;

            const tdREQ = document.createElement('td');
            tdREQ.textContent = transferencia.id_entrada;

            const tdProyecto = document.createElement('td');
            tdProyecto.textContent = transferencia.proyecto?.descripcion_proyecto || 'N/A';

            const tdUsuario = document.createElement('td');
            tdUsuario.textContent = transferencia.usuario?.nombre || 'N/A';

            // Crear botones de acción
            const tdAcciones = document.createElement('td');
            const recibirBtn = document.createElement('button');
            recibirBtn.textContent = 'RECIBIR';
            recibirBtn.classList.add('btn', 'btn-primary');

            const revisarBtn = document.createElement('button');
            revisarBtn.textContent = 'REVISAR';
            revisarBtn.classList.add('btn', 'btn-secondary');

            // Redireccionar al detalle de la transferencia al hacer clic en "REVISAR"
            revisarBtn.addEventListener('click', () => {
                window.location.href = `detalle-transferencia-almacen/${transferencia.id_entrada}`;
            });

            // Lógica para recibir la transferencia y actualizar el stock
            recibirBtn.addEventListener('click', async () => {
                try {
                    const registroTransferencia = {
                        fecha: transferencia.fecha,
                        estado: "RECIBIDA",
                        proyecto: {
                            codigo_proyecto: transferencia.proyecto.codigo_proyecto,
                        },
                        insumos: transferencia.insumos || []
                    };

                    console.log('Enviando datos para actualizar transferencia:', JSON.stringify(registroTransferencia, null, 2));

                    const response = await fetch(`http://localhost:8080/api/transferencia-almacen/${transferencia.id_entrada}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(registroTransferencia),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(`Error al actualizar transferencia: ${JSON.stringify(errorData)}`);
                    }

                    console.log('Transferencia actualizada correctamente');
                    alert('Transferencia marcada como recibida');

                    // Actualizar el stock de los insumos en el almacén
                    await actualizarStockAlmacen(transferencia.insumos);

                    // Remover la fila de la tabla después de la actualización
                    tr.remove();

                } catch (error) {
                    console.error('Error al recibir transferencia:', error);
                    alert(`Error al procesar la transferencia: ${error.message}`);
                }
            });

            // Agregar botones a la celda de acciones
            tdAcciones.appendChild(recibirBtn);
            tdAcciones.appendChild(revisarBtn);

            // Agregar celdas a la fila
            tr.appendChild(tdFecha);
            tr.appendChild(tdREQ);
            tr.appendChild(tdProyecto);
            tr.appendChild(tdEstado);
            tr.appendChild(tdUsuario);
            tr.appendChild(tdAcciones);

            // Agregar la fila a la tabla
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al listar transferencias:', error);
        alert(`Error al cargar transferencias: ${error.message}`);
    }
}

// Función para actualizar el stock de los insumos en el almacén
async function actualizarStockAlmacen(insumos) {
    try {
        for (const insumo of insumos) {
            const stockActual = insumo.estante.stock;
            const cantidadEntrada = insumo.cantidad_entrada;
            const codigoInsumo = insumo.estante.codigo_insumo.codigo_insumo;
            const ubicacion = insumo.estante.ubicacion;

            // Crear el objeto insumo a enviar
            const insumoActualizado = {
                ubicacion: ubicacion,
                codigo_insumo: { codigo_insumo: codigoInsumo },
                status: insumo.estante.status,
                stock: stockActual + cantidadEntrada
            };

            // Realizar la solicitud PUT para actualizar el stock en el almacén
            const response = await fetch(`http://localhost:8080/api/almacen/${ubicacion}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(insumoActualizado)
            });

            if (!response.ok) {
                throw new Error(`Error al actualizar el stock del insumo con código ${codigoInsumo}`);
            }

            console.log(`Stock actualizado para insumo ${codigoInsumo} en ubicación ${ubicacion}`);
        }

        alert('Stock actualizado exitosamente para todos los insumos.');

    } catch (error) {
        console.error('Error al actualizar el stock del almacén:', error);
        alert('Hubo un problema al actualizar el stock de los insumos.');
    }
}

// Ejecutar la función al cargar la página
document.addEventListener('DOMContentLoaded', listarTransferencias);
