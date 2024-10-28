function listarTransferencias() {
    fetch('http://localhost:8080/api/transferencia-almacen')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos de transferencias recibidos:', data);

            const tbody = document.querySelector('#Transferlist tbody');
            if (!tbody) {
                console.error('El tbody no se encontró en el DOM.');
                return; // Salir si el tbody no existe
            }

            tbody.innerHTML = ''; // Limpiar contenido previo en la tabla

            const fragment = document.createDocumentFragment(); // Crear un fragmento para optimizar la inserción

            data.forEach(transferencia => {
                const tr = document.createElement('tr');

                const tdFecha = document.createElement('td');
                tdFecha.textContent = transferencia.fecha;

                const tdID = document.createElement('td');
                tdID.textContent = transferencia.id_entrada;

                const tdUsuario = document.createElement('td');
                tdUsuario.textContent = transferencia.usuario ? transferencia.usuario.nombre : 'N/A';

                const tdAcciones = document.createElement('td');
                const revisarBtn = document.createElement('button');
                revisarBtn.textContent = 'Revisar';
                revisarBtn.className = 'btn btn-primary'; // Agregar clases de Bootstrap o tus estilos personalizados
                revisarBtn.addEventListener('click', () => {
                    window.location.href = `detalle-transferencia-almacen/${transferencia.id_entrada}`;
                });

                tdAcciones.appendChild(revisarBtn);
                tr.appendChild(tdFecha);
                tr.appendChild(tdID);
                tr.appendChild(tdUsuario);
                tr.appendChild(tdAcciones);

                fragment.appendChild(tr); // Añadir la fila al fragmento
            });

            tbody.appendChild(fragment); // Añadir todas las filas al DOM a la vez
        })
        .catch(error => {
            console.error('Error:', error);
            // Aquí puedes mostrar un mensaje de error al usuario
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Hubo un problema al cargar las transferencias. Intenta de nuevo más tarde.';
            document.body.appendChild(errorMessage); // Ajusta esto según tu estructura HTML
        });
}

// Ejecutar la función al cargar la página
document.addEventListener('DOMContentLoaded', listarTransferencias);
