document.addEventListener('DOMContentLoaded', () => {
    const addInsumoButton = document.getElementById('addInsumoButton');
    const insumoContainer = document.getElementById('insumo-container');
    const saveButton = document.getElementById('saveButton');

    let insumoCounter = 0;

    addInsumoButton.addEventListener('click', () => {
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

        codigoInput.addEventListener('input', () => {
            const codigo = codigoInput.value;

            if (codigo) {
                console.log(`Buscando insumo con código: ${codigo}`);
                fetchWithTimeout(`http://localhost:8080/api/almacen/insumo/${codigo}`)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Insumo no encontrado');
                        }
                    })
                    .then(data => {
                        if (data.length > 0) {
                            const almacenData = data[0];
                            newInsumoRow.querySelector(`#ubicacion_${insumoCounter - 1}`).value = almacenData.ubicacion;
                            newInsumoRow.querySelector(`#descripcion_${insumoCounter - 1}`).value = almacenData.codigo_insumo.nombre;
                            newInsumoRow.querySelector(`#numero_parte_${insumoCounter - 1}`).value = almacenData.codigo_insumo.numero_parte;
                            console.log(`Datos cargados: ${JSON.stringify(almacenData)}`);
                        } else {
                            limpiarCampos(newInsumoRow);
                        }
                    })
                    .catch(error => {
                        console.error('Error al obtener los datos del insumo:', error);
                        limpiarCampos(newInsumoRow);
                    });
            } else {
                limpiarCampos(newInsumoRow);
            }
        });

        function limpiarCampos(row) {
            row.querySelector(`#ubicacion_${insumoCounter - 1}`).value = '';
            row.querySelector(`#descripcion_${insumoCounter - 1}`).value = '';
            row.querySelector(`#numero_parte_${insumoCounter - 1}`).value = '';
            console.log('Campos limpiados');
        }
    });

    insumoContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('removeInsumoButton')) {
            console.log('Removiendo insumo de la fila');
            event.target.closest('tr').remove();
        }
    });

    saveButton.addEventListener('click', async () => {
        const rows = insumoContainer.querySelectorAll('.insumo-row');
        const fechaRegistro = document.getElementById("fecha").value;
        const codigo_proyecto = document.getElementById("codigo_proyecto").value;

        if (!fechaRegistro) {
            alert('Debe ingresar la fecha de registro');
            console.error('Fecha de registro no ingresada');
            return;
        }

        let insumos = [];
        let hasError = false;

        for (const row of rows) {
            const codigoInput = row.querySelector('input[name="codigo_insumo"]');
            const cantidadEntradaInput = row.querySelector('input[name="cantidad_entrada"]');
            const ubicacionInput = row.querySelector('input[name="ubicacion"]');

            if (!codigoInput.value || !cantidadEntradaInput.value || !ubicacionInput.value) {
                console.error("Falta uno o más campos requeridos en la fila");
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
            console.log(`Insumo agregado: ${JSON.stringify(insumoTransferido)}`);

            if (hasError) {
                return;
            }
        }

        const registroTransferencia = {
            fecha: fechaRegistro,
            estado: "PENDING",
            proyecto: {
            codigo_proyecto: codigo_proyecto,
            },
            insumos: insumos
        };

        console.log('Datos a enviar:', JSON.stringify(registroTransferencia, null, 2));

        try {
            console.log('Enviando datos al backend...');
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
            console.log('Transferencia guardada:', data);

            alert('Transferencia guardada exitosamente');
            insumoContainer.innerHTML = '';
            console.log('Formulario limpiado tras envío exitoso');

        } catch (error) {
            console.error('Error en la transferencia:', error);
            alert('Error: ' + error.message);
        }
    });

    // Función para hacer fetch con timeout
    function fetchWithTimeout(url, options = {}) {
        const controller = new AbortController();
        const { signal } = controller;

        const timeoutId = setTimeout(() => controller.abort(), 5000); // Timeout de 5 segundos

        return fetch(url, { ...options, signal })
            .then(response => {
                clearTimeout(timeoutId); // Limpiar el timeout si la solicitud se completa
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response;
            })
            .catch(error => {
                clearTimeout(timeoutId); // Limpiar el timeout si hubo un error
                if (error.name === 'AbortError') {
                    console.error('La solicitud fue abortada debido a un timeout.');
                } else {
                    console.error('Error en la solicitud:', error);
                }
                throw error; // Propagar el error
            });
    }
});
