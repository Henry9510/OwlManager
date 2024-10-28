document.addEventListener('DOMContentLoaded', () => {
    const addInsumoButton = document.getElementById('addInsumoButton');
    const insumoContainer = document.getElementById('insumo-container');
    const saveButton = document.getElementById('saveButton'); // Botón para enviar los datos

    // Agregar evento para el botón "Agregar Insumo"
    addInsumoButton.addEventListener('click', () => {
        // Crear una nueva fila de insumo
        const newInsumoRow = document.createElement('tr');
        newInsumoRow.classList.add('insumo-row');

        newInsumoRow.innerHTML = `
            <td>
                <input type="number" name="codigo_insumo" class="codigo_insumo" required>
            </td>
            <td>
                <input type="text" name="descripcion" readonly required>
            </td>
            <td>
                <input type="text" name="partNumber" readonly required>
            </td>
            <td>
                <input type="number" name="stock" readonly required>
            </td>
            <td>
                <input type="number" name="cantidad_salida" required>
            </td>
            <td>
                <button type="button" class="removeInsumoButton">-</button>
            </td>
        `;

        // Agregar la nueva fila a la tabla
        insumoContainer.appendChild(newInsumoRow);

        // Seleccionar el campo de código en la nueva fila
        const codigoInput = newInsumoRow.querySelector('input[name="codigo_insumo"]');

        // Evento para llenar automáticamente los campos al ingresar el código
        codigoInput.addEventListener('input', async () => {
            const codigo = codigoInput.value;
            console.log(codigo);

            if (codigo) {
                try {
                    const response = await fetch(`http://localhost:8080/api/almacen/insumo/${codigo}`);
                    if (!response.ok) {
                        throw new Error('Insumo no encontrado');
                    }
                    const data = await response.json();

                    if (data.length > 0) {
                        const almacenData = data[0];
                        newInsumoRow.querySelector('input[name="descripcion"]').value = almacenData.codigo_insumo.nombre;
                        newInsumoRow.querySelector('input[name="partNumber"]').value = almacenData.codigo_insumo.numero_parte;
                        newInsumoRow.querySelector('input[name="stock"]').value = almacenData.stock;
                    } else {
                        limpiarCampos(newInsumoRow);
                    }
                } catch (error) {
                    console.error('Error al obtener los datos del insumo:', error);
                    limpiarCampos(newInsumoRow);
                }
            } else {
                limpiarCampos(newInsumoRow);
            }
        });

        function limpiarCampos(row) {
            row.querySelector('input[name="descripcion"]').value = '';
            row.querySelector('input[name="partNumber"]').value = '';
            row.querySelector('input[name="stock"]').value = '';
        }
    });

    // Delegar el evento de eliminación para las filas
    insumoContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('removeInsumoButton')) {
            event.target.closest('tr').remove();
        }
    });

    // Evento para el botón de guardar
    saveButton.addEventListener('click', async () => {
        const rows = insumoContainer.querySelectorAll('.insumo-row');
        const fechaRegistro = document.getElementById("fecha").value;
        const codigoProyecto = document.getElementById("proyecto").value;

        if (!fechaRegistro) {
            alert('Debe ingresar la fecha de registro');
            return;
        }

        let insumos = [];
        let hasError = false;

        for (const row of rows) {
            const codigo = row.querySelector('input[name="codigo_insumo"]').value;
            const cantidadSalida = row.querySelector('input[name="cantidad_salida"]').value;

            console.log("Filas de insumos:", rows);

            if (!codigo || !cantidadSalida) {
                hasError = true;
                alert('Debe completar todos los campos antes de guardar');
                return;
            }

            // Crear cada insumo transferido
            let insumoTransferido = {
                insumo: {
                    codigo_insumo: parseInt(codigo), // Código del insumo
                },
                cantidad_salida: parseInt(cantidadSalida) // Cantidad de salida
            };

            // Añadir el insumo a la lista de insumos
            insumos.push(insumoTransferido);
        }

        if (hasError) {
            return;
        }

        // Crear el objeto de transferencia que sigue la estructura del JSON
        const registroTransferencia = {
            fecha: fechaRegistro,
            proyecto: {
                codigo_proyecto: parseInt(codigoProyecto), // Código del proyecto
            },
            insumos: insumos
        };

        console.log('Datos a enviar:', JSON.stringify(registroTransferencia, null, 2));

        // Enviar los datos al backend
        try {
            const response = await fetch('http://localhost:8080/api/transferencia-proyecto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registroTransferencia), // Enviar el JSON completo
            });

            if (response.ok) {
                alert('Transferencia guardada exitosamente');
            } else {
                const err = await response.json();
                throw new Error('Error al guardar la transferencia: ' + JSON.stringify(err));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error al guardar la transferencia');
        }

        // Limpiar el formulario después de guardar
        insumoContainer.innerHTML = '';
    });
});
