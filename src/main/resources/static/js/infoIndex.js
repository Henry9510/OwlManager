window.onload = function () {
    listarProyectos();
}

let listarProyectos = async () => {
    try {
        // Obtener todos los proyectos desde la API
        const respuesta = await fetch('/api/proyecto', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        if (!respuesta.ok) {
            throw new Error(`Error al obtener proyectos: ${respuesta.status} ${respuesta.statusText}`);
        }

        const proyectos = await respuesta.json();

        // Filtrar proyectos del mes actual
        const fechaActual = new Date();
        const mesActual = fechaActual.getMonth(); // 0-11
        const añoActual = fechaActual.getFullYear();

        const proyectosDelMesActual = proyectos.filter(proyecto => {
            const fechaInicio = new Date(proyecto.fechaInicio);
            return fechaInicio.getMonth() === mesActual && fechaInicio.getFullYear() === añoActual;
        });

        // Crear contenido para la tabla
        let contenidoTabla = "";
        for (let proyecto of proyectosDelMesActual) {
            const horasEstimadas = proyecto.horasEstimadas;
            const horasReales = proyecto.horasReales;

            // Resaltar fila si horas reales son mayores a las estimadas
            const resaltarFila = horasReales > horasEstimadas * 0.7; // Mayor al 70%
            const claseFila = resaltarFila ? 'fila-resaltada' : '';
            contenidoTabla += `<tr class="${claseFila}">
                <td>${proyecto.id}</td>
                <td>${proyecto.numeroProyecto}</td>
                <td>${proyecto.descripcionProyecto}</td>
                <td>${horasEstimadas}</td>
                <td>${horasReales}</td>
            </tr>`;
        }

        document.querySelector('#tablaProyectoMes tbody').innerHTML = contenidoTabla;

        // Contar proyectos del mes
        const totalProyectos = proyectosDelMesActual.length;

        // Actualizar el contenido en la tarjeta
        document.getElementById('totalProyectoMes').innerText = totalProyectos;

    } catch (error) {
        console.error('Error al listar proyectos:', error);
    }
}
