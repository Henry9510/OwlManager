/*document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formSalidas');
    const materialList = document.querySelector('#materialList tbody');
    const generateArrayButton = document.getElementById('generateArrayButton');

    let counter = 0;
    let jsonString = '';

    function generateConsecutiveNumber() {
        counter++;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const codigo = document.getElementById('codigo').value;
        const descripcion = document.getElementById('nombre').value;
        const partNumber = document.getElementById('partNumber').value;
        const cantidad = document.getElementById('cantidad').value;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${codigo}</td>
            <td>${descripcion}</td>
            <td>${partNumber}</td>
            <td>${cantidad}</td>
            <td><button class="deleteBtn">Eliminar</button></td>
        `;
        materialList.appendChild(row);

        document.getElementById('codigo').value = '';
        document.getElementById('cantidad').value = '';
        document.getElementById('nombre').value = '';
        document.getElementById('partNumber').value = '';
    });


    materialList.addEventListener('click', (event) => {
        if (event.target.classList.contains('deleteBtn')) {
            event.target.closest('tr').remove();
        }
    });

    generateArrayButton.addEventListener('click', () => {
        const rows = materialList.querySelectorAll('tr');
        const dataArray = [];

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            const rowData = {
                codigo: cells[0] ? cells[0].textContent.trim() : '',
                descripcion: cells[1] ? cells[1].textContent.trim() : '',
                partNumber: cells[2] ? cells[2].textContent.trim() : '',
                cantidad: cells[3] ? cells[3].textContent.trim() : ''
            };
            dataArray.push(rowData);
        });

        jsonString = JSON.stringify(dataArray, null, 2);
        console.log("Este es el JSON:", jsonString);

        registrarTransferencia(dataArray);
    });

    async function registrarTransferencia(dataArray) {
        const fecha = document.getElementById('fecha').value;
        const proyecto = document.getElementById('proyecto').value;

        if (!dataArray.length) {
            alert('Debe agregar al menos un material a la lista.');
            return;
        }

        if (!fecha || !proyecto) {
            alert('Debe ingresar la fecha y el número de proyecto.');
            return;
        }

        generateConsecutiveNumber();

        const campos = {
            fecha: fecha,
            proyecto: proyecto,
            insumos: dataArray
        };

        try {
            const respuesta = await fetch('http://localhost:8080/api/transferencia_proyecto', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(campos)
            });

            if (!respuesta.ok) {
                throw new Error('Error en la solicitud: ' + respuesta.statusText);
            }

            const data = await respuesta.json();
            console.log('Respuesta del servidor:', data);

            alert('Transferencia registrada con éxito');

            materialList.innerHTML = '';
            document.getElementById('fecha').value = '';
            document.getElementById('proyecto').value = '';
        } catch (error) {
            console.error('Error al registrar la transferencia:', error);
            alert('Ocurrió un error al registrar la transferencia');
        }
    }
});

document.getElementById('addInsumoButton').addEventListener('click', function() {
    const insumoContainer = document.getElementById('insumo-container');
    const newRow = document.createElement('tr');
    newRow.classList.add('insumo-row');
    newRow.innerHTML = `
            <td><input type="text" name="codigo_insumo" required></td>
            <td><input type="text" name="descripcion" required></td>
            <td><input type="text" name="partNumber" required></td>
            <td><input type="number" name="cantidad_salida" required></td>
            <td><button type="button" class="removeInsumoButton">-</button></td>
        `;
    insumoContainer.appendChild(newRow);

    // Añadir evento de eliminar insumo
    newRow.querySelector('.removeInsumoButton').addEventListener('click', function() {
        newRow.remove();
    });
});

// Añadir funcionalidad para eliminar filas
document.querySelectorAll('.removeInsumoButton').forEach(button => {
    button.addEventListener('click', function() {
        button.parentElement.parentElement.remove();
    });
});*/


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
                <input type="number" name="cantidad_salida" required>
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
        const codigoProyecto = document.getElementById("proyecto").value;

        if (!fechaRegistro) {
            alert('Debe ingresar la fecha de registro');
            return;
        }

        let insumos = [];
        let hasError = false;

        rows.forEach(row => {
            const codigo = row.querySelector('input[name="codigo_insumo"]').value;
            const cantidadSalida = row.querySelector('input[name="cantidad_salida"]').value;

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
        });

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
        fetch('http://localhost:8080/api/transferencias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registroTransferencia), // Enviar el JSON completo
        })
            .then(response => {
                if (response.ok) {
                    alert('Transferencia guardada exitosamente');
                } else {
                    return response.json().then(err => {
                        throw new Error('Error al guardar la transferencia: ' + JSON.stringify(err));
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Ocurrió un error al guardar la transferencia');
            });

        // Limpiar el formulario después de guardar
        insumoContainer.innerHTML = '';

    });
});
