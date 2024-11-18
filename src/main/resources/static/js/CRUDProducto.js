// Ejecutar cuando la página haya cargado completamente
window.onload = function () {
    listarInsumos();
    ocultarFormulario();
    cargarUnidades(); // Cargar unidades en el select
    cargarCategorias(); // Cargar categorías en el select
    document.getElementById('busquedaInsumos').addEventListener('input', buscarInsumos);
}

// Función para cargar unidades en el select
let cargarUnidades = async () => {
    try {
        const respuesta = await fetch('http://localhost:8080/api/unidades', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const unidades = await respuesta.json();
        let selectUnidades = document.getElementById('unidad');
        selectUnidades.innerHTML = ''; // Limpiar opciones existentes

        // Poblar las opciones del select
        unidades.forEach(unidad => {
            let option = document.createElement('option');
            option.value = unidad.codigo_unidades;
            option.text = unidad.nombre_unidad;
            selectUnidades.appendChild(option);
        });

    } catch (error) {
        console.error('Error al cargar unidades:', error);
    }
}


function buscarInsumos() {
    const input = document.getElementById('busquedaInsumos');
    const busqueda = input.value.trim().toLowerCase();
    const rows = document.querySelectorAll('#tablaInsumos tbody tr');

    // Si el campo de búsqueda está vacío, mostrar todos los insumos
    if (busqueda === '') {
        listarInsumos();
        return;
    }

    let encontrado = false;

    rows.forEach((row) => {
        const cells = row.getElementsByTagName('td');
        const codigo = cells[0].innerText.toLowerCase(); // Ubicación está en la primera columna


        // Comprobar si la búsqueda coincide con la ubicación o el código
        if (codigo.includes(busqueda)) {
            row.style.display = ''; // Mostrar fila si hay coincidencia
            encontrado = true;
        } else {
            row.style.display = 'none'; // Ocultar fila si no coincide
        }
    });

    if (!encontrado) {
        alert("No se encontraron coincidencias");
    }
}


// Función para cargar categorías en el select
let cargarCategorias = async () => {
    try {
        const respuesta = await fetch('http://localhost:8080/api/categorias', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const categorias = await respuesta.json();
        let selectCategorias = document.getElementById('categoria_insumo');
        selectCategorias.innerHTML = ''; // Limpiar opciones existentes

        // Poblar las opciones del select
        categorias.forEach(categoria => {
            let option = document.createElement('option');
            option.value = categoria.codigo_categoria;
            option.text = categoria.nombre_categoria;
            selectCategorias.appendChild(option);
        });

    } catch (error) {
        console.error('Error al cargar categorías:', error);
    }
}

// Función para editar un insumo
let editarInsumo = async (codigo_insumo) => {
    mostrarFormulario();
    idEditar = codigo_insumo;

    try {
        const peticion = await fetch(`http://localhost:8080/api/insumos/${codigo_insumo}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!peticion.ok) throw new Error('Error al obtener datos del insumo');

        const insumo = await peticion.json();
        console.log('Insumo recibido:', insumo);

        document.getElementById("codigo_insumo").value = insumo.codigo_insumo;
        document.getElementById("nombre").value = insumo.nombre;
        document.getElementById("numero_parte").value = insumo.numero_parte;
        document.getElementById("procedencia").value = insumo.procedencia;

        // Seleccionar la unidad actual en el select
        let selectUnidades = document.getElementById('unidad');
        selectUnidades.value = insumo.unidades_insumo.codigo_unidades;

        // Seleccionar la categoría actual en el select
        let selectCategorias = document.getElementById('categoria_insumo');
        selectCategorias.value = insumo.categoria_insumo.codigo_categoria;

    } catch (error) {
        console.error('Error al editar insumo:', error);
        alert('Error al cargar datos del insumo. Inténtalo de nuevo.');
    }
}

// Función para aplicar la actualización del insumo
let aplicarActualizacion = async (codigo_insumo) => {
    let campos = {
        codigo_insumo: document.getElementById('codigo_insumo').value.trim(),
        nombre: document.getElementById('nombre').value.trim(),
        numero_parte: document.getElementById('numero_parte').value.trim(),
        unidades_insumo: {
            codigo_unidades: document.getElementById('unidad').value // Obtener el valor seleccionado (ID) del select
        },
        procedencia: document.getElementById('procedencia').value.trim(),
        categoria_insumo: {
            codigo_categoria: document.getElementById('categoria_insumo').value // Obtener el valor seleccionado (ID) del select
        }
    };

    try {
        const respuesta = await fetch(`http://localhost:8080/api/insumos/${codigo_insumo}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campos)
        });

        if (!respuesta.ok) {
            const errorText = await respuesta.text();
            throw new Error(`Error en la solicitud: ${respuesta.statusText} - ${errorText}`);
        }

        console.log('Insumo actualizado con éxito:', await respuesta.json());
        listarInsumos();
        ocultarFormulario();

    } catch (error) {
        console.error('Error al actualizar insumo:', error);
        alert('Ocurrió un error al actualizar el insumo. Inténtalo nuevamente.');
    }
}



// Función para listar insumos desde la API
let listarInsumos = async () => {
    try {
        const respuesta = await fetch('http://localhost:8080/api/insumos', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) throw new Error('Error al listar insumos');

        const insumos = await respuesta.json();
        let contenidoTabla = "";

        insumos.forEach(insumo => {
            let contenidoFila = `
                <tr>
                    <td>${insumo.codigo_insumo}</td>
                    <td>${insumo.nombre}</td>
                    <td>${insumo.numero_parte}</td>
                    <td>${insumo.unidades_insumo.nombre_unidad}</td> 
                    <td>${insumo.procedencia}</td>
                    <td>${insumo.categoria_insumo.nombre_categoria}</td> 
                    <td><button onClick="editarInsumo(${insumo.codigo_insumo})" class="btn-editar">Editar</button></td>
                    <td><button onClick="borrarInsumo(${insumo.codigo_insumo})" class="btn-eliminar">Eliminar</button></td>
                </tr>
            `;
            contenidoTabla += contenidoFila;
        });

        document.querySelector('#tablaInsumos tbody').innerHTML = contenidoTabla;
    } catch (error) {
        console.error('Error al listar insumos:', error);
    }
}

// Mostrar el formulario de edición
function mostrarFormulario() {
    document.getElementById("formEditarInsumo").style.display = "block";
}

// Ocultar el formulario de edición
function ocultarFormulario() {
    document.getElementById("formEditarInsumo").style.display = "none";
}



// Esperar a que el DOM esté completamente cargado antes de añadir los eventos
document.addEventListener('DOMContentLoaded', function () {
    let btnModificar = document.getElementById("btnModificar");
    if (btnModificar) {
        btnModificar.addEventListener("click", function (evento) {
            evento.preventDefault();
            aplicarActualizacion(idEditar);
        });
    } else {
        console.error('El botón con ID "btnModificar" no se encuentra en el DOM.');
    }
});


// Función para eliminar un insumo
let borrarInsumo = async (codigo_insumo) => {
    try {
        const respuesta = await fetch(`http://localhost:8080/api/insumos/${codigo_insumo}`, {
            method: 'DELETE'
        });

        if (!respuesta.ok) throw new Error('Error al eliminar insumo');

        console.log('Insumo borrado con éxito');
        listarInsumos();

    } catch (error) {
        console.error('Error al borrar insumo:', error);
        alert('Ocurrió un error al borrar el insumo. Inténtalo de nuevo.');
    }
}
