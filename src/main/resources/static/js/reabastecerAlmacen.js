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
                <input type="number" name="codigo_insumo" class="codigo_insumo" required placeholder="Ingrese código">
            </td>
            <td>
                <input type="text" name="descripcion" readonly required placeholder="Descripción">
            </td>
            <td>
                <input type="text" name="numero_parte" readonly required placeholder="Número de Parte">
            </td>
            <td>
                <input type="number" name="estante" readonly class="estante" required placeholder="Estante">
            </td>
            <td>
                <input type="number" name="stock" readonly required placeholder="Stock Actual">
            </td>
            <td>
                <input type="number" name="cantidad_entrada" required placeholder="Cantidad a Reabastecer" min="1">
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
            const codigo = codigoInput.value.trim(); // Trim para eliminar espacios

            if (codigo) {
                try {
                    // Obtener información del insumo, incluyendo la ubicación
                    const response = await fetch(`http://localhost:8080/api/almacen/insumo/${codigo}`);
                    if (!response.ok) {
                        throw new Error('Insumo no encontrado');
                    }
                    const data = await response.json();

                    if (data.length > 0) {
                        const almacenData = data[0];
                        newInsumoRow.querySelector('input[name="estante"]').value = almacenData.ubicacion;
                        newInsumoRow.querySelector('input[name="descripcion"]').value = almacenData.codigo_insumo.nombre;
                        newInsumoRow.querySelector('input[name="numero_parte"]').value = almacenData.codigo_insumo.numero_parte;
                        newInsumoRow.querySelector('input[name="stock"]').value = almacenData.stock;

                        // Agregar ubicación como atributo de la fila
                        newInsumoRow.setAttribute('data-ubicacion', almacenData.ubicacion);
                    } else {
                        limpiarCampos(newInsumoRow);
                    }
                } catch (error) {
                    console.error('Error al obtener los datos del insumo:', error);
                    alert('Error: ' + error.message);
                    limpiarCampos(newInsumoRow);
                }
            } else {
                limpiarCampos(newInsumoRow);
            }
        });

        // Función para limpiar campos de la fila
        function limpiarCampos(row) {
            row.querySelector('input[name="descripcion"]').value = '';
            row.querySelector('input[name="numero_parte"]').value = '';
            row.querySelector('input[name="stock"]').value = '';
        }
    });

    // Delegar el evento de eliminación para las filas
    insumoContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('removeInsumoButton')) {
            event.target.closest('tr').remove();
        }
    });

    // Evento para guardar el formulario
    saveButton.addEventListener('click', async (event) => {
        event.preventDefault(); // Evita que el formulario se envíe inmediatamente

        // Recopilar insumos
        const insumos = Array.from(insumoContainer.querySelectorAll('.insumo-row')).map(row => {
            const stockActual = parseInt(row.querySelector('input[name="stock"]').value.trim()); // Obtener el stock actual
            const cantidadEntrada = parseInt(row.querySelector('input[name="cantidad_entrada"]').value.trim()); // Obtener la cantidad de entrada
            const codigoInsumo = parseInt(row.querySelector('input[name="codigo_insumo"]').value.trim()); // Código del insumo
            const ubicacion = row.getAttribute('data-ubicacion'); // Obtener la ubicación específica de cada insumo

            return {
                ubicacion: ubicacion, // La ubicación del almacén
                codigo_insumo: {
                    codigo_insumo: codigoInsumo
                },
                status: 0, // Puedes ajustar el valor de status según sea necesario
                stock: stockActual + cantidadEntrada // Sumar el stock actual con la cantidad de entrada
            };
        }).filter(insumo => insumo.codigo_insumo && insumo.stock > 0); // Filtrar insumos vacíos y asegurar que el stock sea positivo

        // Verificar si hay insumos a enviar
        if (insumos.length === 0) {
            alert('Por favor, agregue al menos un insumo antes de guardar.');
            return;
        }

        try {
            // Iterar y enviar cada insumo individualmente
            for (const insumo of insumos) {
                const response = await fetch(`http://localhost:8080/api/almacen/${insumo.ubicacion}`, { // Usar la ubicación específica de cada insumo
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(insumo)
                });

                if (!response.ok) {
                    throw new Error(`Error al guardar el insumo con código ${insumo.codigo_insumo.codigo_insumo}`);
                }
            }

            alert('Todos los insumos fueron guardados exitosamente');
            // Limpiar el formulario o realizar otras acciones
            document.getElementById('formReabastecer').reset();
            insumoContainer.innerHTML = ''; // Limpiar los insumos añadidos
        } catch (error) {
            console.error('Error al guardar los insumos:', error);
            alert('Hubo un problema al guardar los insumos: ' + error.message);
        }
    });
});
