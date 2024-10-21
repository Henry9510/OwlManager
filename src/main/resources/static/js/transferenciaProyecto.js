document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formSalidas');
    const materialList = document.querySelector('#materialList tbody');
    const generateArrayButton = document.getElementById('generateArrayButton');

    // Inicializar el contador
    let counter = 0;
    let jsonString = ''; // Variable para almacenar la cadena JSON

    // Función para incrementar y mostrar el número consecutivo
    function generateConsecutiveNumber() {
        counter++;
    }

    // Manejar el envío del formulario
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const codigo = document.getElementById('codigo').value;
        const descripcion = document.getElementById('nombre').value;
        const partNumber = document.getElementById('partNumber').value;
        const cantidad = document.getElementById('cantidad').value;

        // Crear una nueva fila para la tabla
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${codigo}</td>
            <td>${descripcion}</td>
            <td>${partNumber}</td>
            <td>${cantidad}</td>
            <td><button class="deleteBtn">Eliminar</button></td>
        `;

        // Agregar la fila a la tabla
        materialList.appendChild(row);

        document.getElementById('codigo').value = '';
        document.getElementById('cantidad').value = '';
        document.getElementById('nombre').value = '';
        document.getElementById('partNumber').value = '';

        
    });

    // Delegar el evento de eliminación para las filas
    materialList.addEventListener('click', (event) => {
        if (event.target.classList.contains('deleteBtn')) {
            event.target.closest('tr').remove();
        }
    });

    // Función para generar el arreglo y agregar pedidos a la lista
    generateArrayButton.addEventListener('click', () => {
        // Obtener todas las filas (<tr>) dentro del <tbody>
        const rows = materialList.querySelectorAll('tr');

        // Crear un array para almacenar los datos
        const dataArray = [];

        // Iterar sobre cada fila
        rows.forEach(row => {
            // Obtener todas las celdas (<td>) en la fila
            const cells = row.querySelectorAll('td');

            // Crear un objeto con los datos de las celdas
            const rowData = {
                codigo: cells[0] ? cells[0].textContent.trim() : '',
                descripcion: cells[1] ? cells[1].textContent.trim() : '',
                partNumber: cells[2] ? cells[2].textContent.trim() : '',
                cantidad: cells[3] ? cells[3].textContent.trim() : ''
            };

            // Agregar el objeto al array
            dataArray.push(rowData);
        });

        // Convertir el array a una cadena JSON
        jsonString = JSON.stringify(dataArray, null, 2); // Guardar el JSON en la variable

        // Imprimir el JSON en la consola (o hacer algo con él)
        console.log("Este es el JSON:", jsonString);

        // Llamar a registrarTransferencia
        registrarTransferencia();
    });

    async function registrarTransferencia() {
        // Generar y mostrar el número consecutivo
        generateConsecutiveNumber();




        let campos = {

        };

        console.log(campos)

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
            document.getElementById('Proyecto').value = '';



        } catch (error) {
            console.error('Error al registrar la transferencia:', error);
            alert('Ocurrió un error al registrar la transferencia');
        }
    }
});
