let proyectos = [];

// Cargar los proyectos y listar los del mes actual al cargar la página
window.onload = async function () {
    await cargarProyectos();
    cargarAlmacen();
    listarProyectosDelMes();
    listarProyectosTerminadosDelMes();
    llenarTablaHorasHombre(); // Llenar tabla de horas por proyecto
    dibujarGraficoHoras(); // Llamar a la función para dibujar el gráfico
};

// Función para obtener todos los proyectos
async function cargarProyectos() {
    try {
        const respuesta = await fetch('http://localhost:8080/api/proyecto', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`Error al obtener proyectos: ${respuesta.status} ${respuesta.statusText}`);
        }

        proyectos = await respuesta.json(); // Guardamos todos los proyectos
        console.log(proyectos); // Verifica que los proyectos se estén cargando correctamente
    } catch (error) {
        console.error('Error al cargar proyectos:', error);
    }
}

async function cargarAlmacen() {
    try {
        const respuesta = await fetch('http://localhost:8080/api/Almcen', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`Error al obtener proyectos: ${respuesta.status} ${respuesta.statusText}`);
        }

        almacen = await respuesta.json(); // Guardamos todos los proyectos
        console.log(almacen); // Verifica que los proyectos se estén cargando correctamente
    } catch (error) {
        console.error('Error al cargar almacen:', error);
    }
}


// Función para listar proyectos del mes actual
function listarProyectosDelMes() {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth(); // 0-11
    const añoActual = fechaActual.getFullYear();

    const proyectosDelMesActual = proyectos.filter(proyecto => {
        const fechaInicio = new Date(proyecto.fecha_inicio);
        return fechaInicio.getMonth() === mesActual && fechaInicio.getFullYear() === añoActual;
    });

    let contenidoTabla = '';
    for (let proyecto of proyectosDelMesActual) {
        const horasEstimadas = proyecto.horas_estimadas;
        const horasReales = proyecto.horas_reales;

        const resaltarFila = horasReales > horasEstimadas * 0.7; // Mayor al 70%
        const claseFila = resaltarFila ? 'fila-resaltada' : '';

        contenidoTabla += `<tr class="${claseFila}">
            <td>${proyecto.fecha_inicio}</td>
            <td>${proyecto.codigo_proyecto}</td>
            <td>${proyecto.descripcion_proyecto}</td>
            <td>${horasEstimadas}</td>
            <td>${horasReales}</td>
            <td>${proyecto.fecha_fin}</td>
        </tr>`;
    }

    document.querySelector('#tablaProyectoMes tbody').innerHTML = contenidoTabla;

    const totalProyectos = proyectosDelMesActual.length;
    document.getElementById('totalProyectoMes').innerText = totalProyectos;
}

// Función para listar solo proyectos terminados del mes
function listarProyectosTerminadosDelMes() {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth(); // 0-11
    const añoActual = fechaActual.getFullYear();

    const proyectosTerminados = proyectos.filter(proyecto => {
        const fechaFin = new Date(proyecto.fecha_fin);
        return (
            fechaFin.getMonth() === mesActual &&
            fechaFin.getFullYear() === añoActual &&
            proyecto.estado_proyecto.nombre_estado === 'Finalizado' // Asegúrate de que el nombre del estado sea correcto
        );
    });

    // Verifica qué proyectos se están filtrando
    console.log('Proyectos terminados del mes:', proyectosTerminados);

    let contenidoTablaTerminados = '';
    for (let proyecto of proyectosTerminados) {
        contenidoTablaTerminados += `<tr>
            <td>${proyecto.codigo_proyecto}</td>
            <td>${proyecto.descripcion_proyecto}</td>
            <td>${proyecto.fecha_inicio}</td>
            <td>${proyecto.fecha_fin}</td>
            <td>${proyecto.horas_estimadas}</td>
            <td>${proyecto.horas_reales}</td>
            <td>${proyecto.estado_proyecto.nombre_estado}</td>
        </tr>`;
    }

    document.querySelector('#tablaProyectoMesTerminados tbody').innerHTML = contenidoTablaTerminados;
}

// Función para llenar la tabla con las horas por proyecto
function llenarTablaHorasHombre() {
    const tablaBody = document.querySelector('#tablaHorasHombre tbody');
    tablaBody.innerHTML = ''; // Limpiar la tabla

    proyectos.forEach(proyecto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${proyecto.codigo_proyecto}</td>
            <td>${proyecto.descripcion_proyecto}</td>
            <td>${proyecto.horas_estimadas}</td>
            <td>${proyecto.horas_reales}</td>
        `;

        tablaBody.appendChild(fila);

    });
}

function dibujarGraficoHoras() {
    const ctx = document.getElementById('graficoHoras').getContext('2d');

    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth(); // 0-11
    const añoActual = fechaActual.getFullYear();

    // Filtrar solo los proyectos del mes actual
    const proyectosDelMes = proyectos.filter(proyecto => {
        const fechaInicio = new Date(proyecto.fecha_inicio);
        return fechaInicio.getMonth() === mesActual && fechaInicio.getFullYear() === añoActual;
    });

    const labels = proyectosDelMes.map(proyecto => proyecto.codigo_proyecto);
    const horasEstimadas = proyectosDelMes.map(proyecto => proyecto.horas_estimadas);
    const horasReales = proyectosDelMes.map(proyecto => proyecto.horas_reales);

    // Verifica que los datos filtrados sean correctos
    console.log("Proyectos del mes actual:", proyectosDelMes);

    // Crear el gráfico de barras
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Horas Estimadas',
                    data: horasEstimadas,
                    backgroundColor: '#043873',
                },
                {
                    label: 'Horas Reales',
                    data: horasReales,
                    backgroundColor: 'rgb(255,0,59)',
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}