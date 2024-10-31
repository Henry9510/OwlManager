function listarTransferencias() {
    fetch('http://localhost:8080/api/registro-horas')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos de transferencias recibidos:', data);

            const tbody = document.querySelector('#Horaslist tbody');
            if (!tbody) {
                console.error('El tbody no se encontró en el DOM.');
                return; // Salir si el tbody no existe
            }

            tbody.innerHTML = ''; // Limpiar contenido previo en la tabla

            data.forEach(horas => {
                const tr = document.createElement('tr');

                const tdFecha = document.createElement('td');
                tdFecha.textContent = horas.fecha;

                const tdCedula = document.createElement('td');
                tdCedula.textContent = horas.empleado.cedula;

                const tdNombre = document.createElement('td');
                tdNombre.textContent = horas.empleado.nombre;

                const tdProyecto = document.createElement('td');
                tdProyecto.textContent = horas.proyecto.codigo_proyecto;

                const tdHoras = document.createElement('td');
                tdHoras.textContent = horas.horas_trabajadas;

                const tdUsuario = document.createElement('td');
                tdUsuario.textContent = horas.usuario ? horas.usuario.nombre : 'N/A';

                const tdAcciones = document.createElement('td');

                const editarBtn = document.createElement('button');
                editarBtn.textContent = 'Editar';

                const eliminarBtn = document.createElement('button');
                eliminarBtn.textContent='Eliminar';


                tdAcciones.appendChild(editarBtn);
                tdAcciones.appendChild(eliminarBtn);

                tr.appendChild(tdFecha);
                tr.appendChild(tdProyecto);
                tr.appendChild(tdCedula);
                tr.appendChild(tdNombre);
                tr.appendChild(tdHoras);

                tr.appendChild(tdUsuario);
                tr.appendChild(tdAcciones);

                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Ejecutar la función al cargar la página
document.addEventListener('DOMContentLoaded', listarTransferencias);
