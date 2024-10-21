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
        const insumosData = [];
        const fechaRegistro = document.getElementById("fecha").value;

        rows.forEach(row => {
            const codigo = row.querySelector('input[name="codigo_insumo"]').value;
            const cantidadEntrada = row.querySelector('input[name="cantidad_entrada"]').value;
            const ubicacion = row.querySelector('input[name="ubicacion"]').value; // Asegúrate de tener este campo

            if (codigo && cantidadEntrada) {
                insumosData.push({
                    cantidad_entrada: parseInt(cantidadEntrada), // Asegúrate de que sea un número
                    fecha: fechaRegistro, // Formato "YYYY-MM-DD"
                    insumo: {
                        codigo_insumo: parseInt(codigo), // Asegúrate de que sea un número
                    },
                    estante: {
                        ubicacion: parseInt(ubicacion), // Asegúrate de que sea un número
                    }
                });
            }
        });

        // Enviar datos al backend
        fetch('http://localhost:8080/api/registro-entradas-almacen', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(insumosData),
        })
            .then(response => {
                if (response.ok) {
                    alert('Insumos actualizados exitosamente');
                } else {
                    return response.json().then(err => {
                        throw new Error('Error al actualizar insumos: ' + JSON.stringify(err));
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Ocurrió un error al actualizar insumos');
            });
    });



});
