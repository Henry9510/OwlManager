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
            return;
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
                    fecha: transferencia.fecha,
                    estado: "RECIBIDA",
                    proyecto: {
                        codigo_proyecto: transferencia.proyecto.codigo_proyecto,
                    },
                    insumos: transferencia.insumos || []
                };

                console.log('Datos a enviar:', JSON.stringify(registroTransferencia, null, 2));

                try {
                    // 1. Marcar la transferencia como "RECIBIDA"
                    const response = await fetch(`http://localhost:8080/api/transferencia-proyecto/${transferencia.id_transferencia}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(registroTransferencia),
                    });

                    if (!response.ok) {
                        const error = await response.json();
                        console.error('Error al guardar la transferencia:', error);
                        throw new Error('Error al guardar la transferencia: ' + JSON.stringify(error));
                    }

                    console.log('Transferencia guardada:', await response.json());
                    alert('Transferencia guardada exitosamente');

                    // 2. Actualizar el stock de cada insumo
                    console.log(" Actualizar el stock de cada insumo",registroTransferencia.insumos)

                    await actualizarStockAlmacen(registroTransferencia.insumos);

                } catch (error) {
                    console.error('Error en el proceso de recepción de transferencias:', error);
                    alert('Ocurrió un problema: ' + error.message);
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


// Función para actualizar el stock del almacén
async function actualizarStockAlmacen(insumos) {
    try {
        if (!insumos || insumos.length === 0) {
            console.warn('No hay insumos para actualizar.');
            alert('No hay insumos para actualizar el stock.');
            return; // Salir si no hay insumos
        }

        for (const insumo of insumos) {
            // Verificar si insumo y su código están definidos
            if (!insumo || !insumo.insumo || !insumo.insumo.codigo_insumo) {
                console.warn('Insumo no está definido o falta codigo_insumo:', insumo);
                continue; // Saltar a la siguiente iteración
            }

            // Obtener el código del insumo
            const codigoInsumo = insumo.insumo.codigo_insumo;

            // 3. Buscar el insumo en el almacén
            const almacenResponse = await fetch(`http://localhost:8080/api/almacen/${codigoInsumo}`);
            if (!almacenResponse.ok) {
                throw new Error(`Error al buscar el insumo ${codigoInsumo} en el almacén`);
            }

            const almacenData = await almacenResponse.json();
            const stockActual = almacenData.stock; // Asegúrate de que esta propiedad existe

            const cantidadSalida = insumo.cantidad_salida || 0; // Si no existe cantidad_salida, usar 0
            const nuevoStock = stockActual - cantidadSalida; // Actualiza el stock sumando la cantidad salida

            // Crear el objeto insumo a enviar
            const insumoActualizado = {
                ubicacion: insumo.ubicacion,
                codigo_insumo: {
                    codigo_insumo: insumo.codigo_insumo},
                stock: nuevoStock,
            };

            // 4. Actualizar el stock en el almacén
            const updateResponse = await fetch(`http://localhost:8080/api/almacen/insumo/${codigoInsumo}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(insumoActualizado),
            });

            if (!updateResponse.ok) {
                throw new Error(`Error al actualizar el stock del insumo con código ${codigoInsumo}`);
            }

            console.log(`Stock actualizado para insumo ${codigoInsumo}`);
        }

        alert('Stock actualizado exitosamente para todos los insumos.');

    } catch (error) {
        console.error('Error al actualizar el stock del almacén:', error);
        alert('Hubo un problema al actualizar el stock de los insumos.');
    }
}


// Ejecutar la función al cargar la página
document.addEventListener('DOMContentLoaded', listarTransferencias);
