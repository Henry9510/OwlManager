document.addEventListener('DOMContentLoaded', () => {
    const addInsumoButton = document.getElementById('addInsumoButton');
    const insumoContainer = document.getElementById('insumo-container');
    const saveButton = document.getElementById('saveButton');

    let insumoCounter = 0;

    addInsumoButton.addEventListener('click', () => {
        // Verificar si hay una fila incompleta
        const lastRow = insumoContainer.querySelector('.insumo-row:last-child');
        if (lastRow && !isRowComplete(lastRow)) {
            alert('Por favor, complete todos los campos de la fila antes de agregar otra.');
            return;
        }

        const newInsumoRow = document.createElement('tr');
        newInsumoRow.classList.add('insumo-row');

        newInsumoRow.innerHTML = `
            <td>
                <input type="number" id="codigo_insumo_${insumoCounter}" name="codigo_insumo" class="codigo_insumo" required>
            </td>
            <td>
                <input type="number" id="ubicacion_${insumoCounter}" name="ubicacion" readonly required>
            </td>
            <td>
                <input type="text" id="descripcion_${insumoCounter}" readonly required>
            </td>
            <td>
                <input type="text" id="numero_parte_${insumoCounter}" readonly required>
            </td>
            <td>
                <input type="number" id="cantidad_entrada_${insumoCounter}" name="cantidad_entrada" required>
            </td>
            <td>
                <button type="button" class="removeInsumoButton btn btn-danger">-</button>
            </td>
        `;

        insumoContainer.appendChild(newInsumoRow);
        insumoCounter++;

        const codigoInput = newInsumoRow.querySelector(`#codigo_insumo_${insumoCounter - 1}`);

        // Evento para cargar datos de insumo al ingresar el código
        codigoInput.addEventListener('input', async () => {
            const codigo = codigoInput.value;

            if (codigo) {
                try {
                    const response = await fetchWithTimeout(`http://localhost:8080/api/almacen/insumo/${codigo}`);
                    if (response.ok) {
                        const data = await response.json();
                        if (data.length > 0) {
                            const almacenData = data[0];
                            newInsumoRow.querySelector(`#ubicacion_${insumoCounter - 1}`).value = almacenData.ubicacion;
                            newInsumoRow.querySelector(`#descripcion_${insumoCounter - 1}`).value = almacenData.codigo_insumo.nombre;
                            newInsumoRow.querySelector(`#numero_parte_${insumoCounter - 1}`).value = almacenData.codigo_insumo.numero_parte;
                        } else {
                            limpiarCampos(newInsumoRow);
                        }
                    } else {
                        throw new Error('Insumo no encontrado');
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
            row.querySelector(`#ubicacion_${insumoCounter - 1}`).value = '';
            row.querySelector(`#descripcion_${insumoCounter - 1}`).value = '';
            row.querySelector(`#numero_parte_${insumoCounter - 1}`).value = '';
            row.querySelector(`#cantidad_entrada_${insumoCounter - 1}`).value = '';
        }
    });

    // Eliminar fila de insumo
    insumoContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('removeInsumoButton')) {
            event.target.closest('tr').remove();
        }
    });

    // Guardar datos de insumos
    saveButton.addEventListener('click', async () => {
        const rows = insumoContainer.querySelectorAll('.insumo-row');
        const fechaRegistro = document.getElementById("fecha").value;
        const codigo_proyecto = document.getElementById("codigo_proyecto").value;

        if (!fechaRegistro) {
            alert('Debe ingresar la fecha de registro');
            return;
        }

        let insumos = [];
        let hasError = false;

        for (const row of rows) {
            const codigoInput = row.querySelector('input[name="codigo_insumo"]');
            const cantidadEntradaInput = row.querySelector('input[name="cantidad_entrada"]');
            const ubicacionInput = row.querySelector('input[name="ubicacion"]');

            if (!codigoInput.value || !cantidadEntradaInput.value || !ubicacionInput.value) {
                hasError = true;
                break;
            }

            const insumoTransferido = {
                estante: {
                    ubicacion: parseInt(ubicacionInput.value),
                    codigo_insumo: {
                        codigo_insumo: parseInt(codigoInput.value),
                    }
                },
                cantidad_entrada: parseInt(cantidadEntradaInput.value)
            };

            insumos.push(insumoTransferido);
        }

        if (hasError) {
            alert("Por favor completa todos los campos de insumos");
            return;
        }

        const registroTransferencia = {
            fecha: fechaRegistro,
            estado: "PENDING",
            proyecto: {
                codigo_proyecto: codigo_proyecto,
            },
            insumos: insumos
        };

        try {
            const response = await fetchWithTimeout('http://localhost:8080/api/transferencia-almacen', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registroTransferencia),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error('Error al guardar la transferencia: ' + JSON.stringify(error));
            }

            const data = await response.json();
            alert('Transferencia guardada exitosamente');
            insumoContainer.innerHTML = '';

        } catch (error) {
            console.error('Error en la transferencia:', error);
            alert('Error: ' + error.message);
        }
    });

    function fetchWithTimeout(url, options = {}) {
        const controller = new AbortController();
        const { signal } = controller;

        const timeoutId = setTimeout(() => controller.abort(), 5000);

        return fetch(url, { ...options, signal })
            .then(response => {
                clearTimeout(timeoutId);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response;
            })
            .catch(error => {
                clearTimeout(timeoutId);
                if (error.name === 'AbortError') {
                    console.error('La solicitud fue abortada por timeout.');
                } else {
                    console.error('Error en la solicitud:', error);
                }
                throw error;
            });
    }

    // Función para verificar si una fila está completa
    function isRowComplete(row) {
        const codigo = row.querySelector('input[name="codigo_insumo"]').value;
        const ubicacion = row.querySelector('input[name="ubicacion"]').value;
        const descripcion = row.querySelector(`#descripcion_${insumoCounter - 1}`).value;
        const numeroParte = row.querySelector(`#numero_parte_${insumoCounter - 1}`).value;
        const cantidad = row.querySelector('input[name="cantidad_entrada"]').value;

        return codigo && ubicacion && descripcion && numeroParte && cantidad;
    }
});
