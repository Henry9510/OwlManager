
let proyectos = [];
let almacen = [];
let graficoHorasInstance = null;





window.onload = async function () {
    await cargarProyectos();
    await cargarAlmacen();
    listarProyectosDelMes();
    listarProyectosTerminadosDelMes();
    llenarTablaHorasHombre();
    contarInsumosSinStock()
    dibujarGraficoEquiposUltimos3Meses()
    contarProyectosFinalizados();
    dibujarGraficoHoras();

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
    } catch (error) {
        console.error('Error al cargar proyectos:', error);
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

        const resaltarFila = horasReales > horasEstimadas * 0.7;
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



    const proyectosFinalizadosMes = proyectosTerminados.length;


    document.getElementById('totalProyectoFinalizadosMes').innerText = proyectosFinalizadosMes;


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

    if (proyectosDelMes.length === 0) {
        console.warn("No hay proyectos para el mes actual.");
        return;
    }


    // Obtener datos
    const labels = proyectosDelMes.map(proyecto => proyecto.codigo_proyecto);
    const horasEstimadas = proyectosDelMes.map(proyecto => proyecto.horas_estimadas);
    const horasReales = proyectosDelMes.map(proyecto => proyecto.horas_reales);

    // Verifica que los datos filtrados sean correctos
    console.log("Proyectos del mes actual:", proyectosDelMes);


    // Si ya hay un gráfico existente, destruirlo antes de crear uno nuevo
    if (graficoHorasInstance) {
        graficoHorasInstance.destroy();
    }

    // Crear el nuevo gráfico de barras
    graficoHorasInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Horas Estimadas',
                    data: horasEstimadas,
                    backgroundColor: 'rgba(0, 111, 234, 0.7)',
                    borderColor: '#006fea',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(0, 111, 234, 1)',
                },
                {
                    label: 'Horas Reales',
                    data: horasReales,
                    backgroundColor: 'rgba(255, 0, 59, 0.7)',
                    borderColor: 'rgb(255,0,59)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255, 0, 59, 1)',
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Comparativa de Horas de Proyectos',
                    font: {
                        size: 14
                    }
                },
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 40
                    }
                }
            }
        }
    });
}


// Función para listar insumos con stock 0
function listarInsumosSinStock() {
    if (!almacen || almacen.length === 0) {
        console.warn("No hay datos en el almacén.");
        return;
    }

    // Filtrar insumos con stock 0
    const insumosSinStock = almacen.filter(insumo => insumo.stock === 0);

    // Construir contenido de la tabla
    let contenidoTabla = '';
    for (let insumo of insumosSinStock) {
        contenidoTabla += `<tr>
                 <td>${insumo.ubicacion}</td>
                  <td>${insumo.codigo_insumo.codigo_insumo}</td>
                  <td>${insumo.codigo_insumo.nombre}</td>
                  <td>${insumo.codigo_insumo.numero_parte}</td>
                  <td>${insumo.codigo_insumo.unidades_insumo.nombre_unidad}</td>
                  <td>${insumo.codigo_insumo.procedencia}</td>
                  <td>${insumo.codigo_insumo.categoria_insumo.nombre_categoria}</td>
                  <td style="color: red; font-weight: bold;">${insumo.stock}</td>
        </tr>`;
    }

    // Insertar en la tabla
    document.querySelector('#consumoFaltantes tbody').innerHTML = contenidoTabla;

    // Mostrar mensaje si no hay insumos sin stock
    if (insumosSinStock.length === 0) {
        document.querySelector('#consumoFaltantes tbody').innerHTML = `<tr><td colspan="7" style="text-align:center;">No hay insumos sin stock</td></tr>`;
    }
}

// Llamar la función después de cargar los datos del almacén
async function cargarAlmacen() {
    try {
        const respuesta = await fetch('http://localhost:8080/api/almacen', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error(`Error al obtener insumos: ${respuesta.status} ${respuesta.statusText}`);
        }

        almacen = await respuesta.json(); // Guardamos los datos del almacén
        console.log("Datos del almacén:", almacen);

        // Llamar a la función para listar insumos sin stock después de cargar los datos
        listarInsumosSinStock();
    } catch (error) {
        console.error('Error al cargar almacén:', error);
    }
}


function contarProyectosFinalizados() {
    if (!proyectos || proyectos.length === 0) {
        console.warn("No hay proyectos cargados.");
        return;
    }

    // Filtrar proyectos con estado 'Finalizado'
    const proyectosFinalizados = proyectos.filter(proyecto =>
        proyecto.estado_proyecto?.nombre_estado === 'Finalizado'
    );

    // Mostrar en la consola para depuración
    console.log("Proyectos Finalizados:", proyectosFinalizados.length);

    // Insertar en el DOM
    document.getElementById('totalProyectoFinalizados').innerText = proyectosFinalizados.length;
}


// Función para calcular y mostrar la cantidad total de insumos con stock 0
function contarInsumosSinStock() {
    if (!almacen || almacen.length === 0) {
        console.warn("No hay insumos cargados en el almacén.");
        return;
    }

    // Filtrar insumos con stock 0
    const insumosSinStock = almacen.filter(insumo => insumo.stock === 0);

    // Mostrar en la consola para depuración
    console.log("Insumos con stock 0:", insumosSinStock.length);

    // Insertar en el DOM
    document.getElementById('totalInsumosSinStock').innerText = insumosSinStock.length;
}

let graficoEquiposInstance = null; // Variable global para el gráfico

function dibujarGraficoEquiposUltimos3Meses() {
    const ctx = document.getElementById('graficoEquipos').getContext('2d');

    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth(); // 0-11
    const añoActual = fechaActual.getFullYear();

    // Filtrar los equipos registrados en los últimos 3 meses
    const equiposUltimos3Meses = proyectos.filter(proyecto => {
        const fechaRegistro = new Date(proyecto.fecha_inicio);
        const diferenciaMeses = (añoActual - fechaRegistro.getFullYear()) * 12 + (mesActual - fechaRegistro.getMonth());
        return diferenciaMeses >= 0 && diferenciaMeses <3 ; // Solo los últimos 3 meses
    });

    // Contar la cantidad de equipos por mes
    const conteoPorMes = {};
    equiposUltimos3Meses.forEach(proyecto => {
        const fechaRegistro = new Date(proyecto.fecha_inicio);
        const claveMes = `${fechaRegistro.getFullYear()}-${fechaRegistro.getMonth() + 1}`; // Formato: Año-Mes

        conteoPorMes[claveMes] = (conteoPorMes[claveMes] || 0) + 1;
    });

    const labels = Object.keys(conteoPorMes);
    const valores = Object.values(conteoPorMes);

    // Si no hay datos, detener la ejecución
    if (labels.length === 0) {
        console.warn("No hay equipos registrados en los últimos 3 meses.");
        return;
    }

    // Eliminar gráfico previo si existe
    if (graficoEquiposInstance) {
        graficoEquiposInstance.destroy();
    }

    // Crear la nueva gráfica de torta
    graficoEquiposInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: valores,
                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'], // Colores para los 3 meses
                hoverBackgroundColor: ['#ff4365', '#1d8adb', '#ffc233']
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Cantidad de Equipos en los Últimos 3 Meses',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}


// Función para buscar un proyecto por ID en la API
async function buscarProyectoPorID() {
    const id = document.getElementById('busquedaProyecto').value.trim();

    if (!id) {
        alert("Por favor, ingrese un ID de proyecto.");
        return;
    }

    try {
        // Hacer la petición al backend
        const respuesta = await fetch(`http://localhost:8080/api/proyecto/${id}`);

        if (!respuesta.ok) {
            throw new Error(`Proyecto con ID ${id} no encontrado.`);
        }

        // Convertir la respuesta a JSON
        const proyecto = await respuesta.json();

        // Mostrar los datos en una tabla
        document.getElementById('tablaConvertida').innerHTML = `
            <table border="1">
                <thead>
                    <tr><th colspan="2">Detalles del Proyecto</th></tr>
                </thead>
                <tbody>
                    <tr><th>ID</th><td>${proyecto.codigo_proyecto}</td></tr>
                    <tr><th>Descripción</th><td>${proyecto.descripcion_proyecto}</td></tr>
                    <tr><th>Fecha Inicio</th><td>${proyecto.fecha_inicio}</td></tr>
                    <tr><th>Fecha Fin</th><td>${proyecto.fecha_fin || 'No definida'}</td></tr>
                    <tr><th>Horas Estimadas</th><td>${proyecto.horas_estimadas}</td></tr>
                    <tr><th>Horas Reales</th><td>${proyecto.horas_reales || 'No registradas'}</td></tr>
                    <tr><th>Estado</th><td>${proyecto.estado_proyecto?.nombre_estado || 'No disponible'}</td></tr>
                </tbody>
            </table>
        `;

    } catch (error) {
        document.getElementById('tablaConvertida').innerHTML = `<p style='color: red;'>${error.message}</p>`;
    }
}
