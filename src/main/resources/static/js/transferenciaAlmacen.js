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
                <input type="text" name="codigo_insumo" class="codigo_insumo" required>
            </td>
            <td>
                <input type="text" name="ubicacion" readonly required>
            </td>
            <td>
                <input type="text" name="descripcion" readonly required>
            </td>
            <td>
                <input type="text" name="partNumber" readonly required>
            </td>
            <td>
                <input type="number" name="cantidad_entrada" required>
            </td>
            <td>
                <button type="button" class="removeInsumoButton">-</button>
            </td>
        `;

        // Agregar la nueva fila a la tabla
        insumoContainer.appendChild(newInsumoRow);

        // Seleccionar el campo de código en la nueva fila
        const codigoInput = newInsumoRow.querySelector('.codigo_insumo');

        // Evento para llenar automáticamente los campos al ingresar el código
        codigoInput.addEventListener('input', () => {
            const codigo = codigoInput.value;

            if (codigo) {
                fetch(`http://localhost:8080/api/almacen/insumo/${codigo}`)
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
                            newInsumoRow.querySelector('input[name="ubicacion"]').value = almacenData.ubicacion;
                            newInsumoRow.querySelector('input[name="descripcion"]').value = almacenData.codigo_insumo.nombre;
                            newInsumoRow.querySelector('input[name="partNumber"]').value = almacenData.codigo_insumo.numero_parte;
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
            row.querySelector('input[name="ubicacion"]').value = '';
            row.querySelector('input[name="descripcion"]').value = '';
            row.querySelector('input[name="partNumber"]').value = '';
        }
    });

    // Delegar el evento de eliminación para las filas
    insumoContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('removeInsumoButton')) {
            event.target.closest('tr').remove();
        }
    });

    // Evento para el botón de guardar
    saveButton.addEventListener('click', () => {
        const rows = insumoContainer.querySelectorAll('.insumo-row');
        const fechaRegistro = document.getElementById("fecha").value;

        if (!fechaRegistro) {
            alert('Debe ingresar la fecha de registro');
            return;
        }

        let hasError = false;

        rows.forEach(row => {
            const codigo = row.querySelector('input[name="codigo_insumo"]').value;
            const cantidadEntrada = row.querySelector('input[name="cantidad_entrada"]').value;
            const ubicacion = row.querySelector('input[name="ubicacion"]').value;

            if (!codigo || !cantidadEntrada || !ubicacion) {
                hasError = true;
                alert('Debe completar todos los campos antes de guardar');
                return;
            }

            const registroEntradasAlmacen = {
                cantidad_entrada: parseInt(cantidadEntrada),
                fecha: fechaRegistro,
                insumo: {
                    codigo_insumo: parseInt(codigo),
                },
                estante: {
                    ubicacion: ubicacion, // Usar el valor como texto ya que ubicaciones pueden no ser numéricas
                },
                entrada: 0,
                salida: 0,
                status: 0,
                stock: 0
            };

            console.log('Datos a enviar:', JSON.stringify(registroEntradasAlmacen, null, 2));

            // Enviar datos al backend para cada fila
            fetch('http://localhost:8080/api/registro-entradas-almacen', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registroEntradasAlmacen), // Envía el objeto de la fila
            })
                .then(response => {
                    if (response.ok) {
                        alert('Insumo actualizado exitosamente');
                    } else {
                        return response.json().then(err => {
                            throw new Error('Error al actualizar insumo: ' + JSON.stringify(err));
                        });
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Ocurrió un error al actualizar el insumo');
                });
        });

        if (hasError) {
            return;
        }

        // Limpiar el formulario después de guardar
        insumoContainer.innerHTML = '';
    });
});
