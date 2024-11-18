// Variable global para manejar el ID de edición
let idEditar = null;

// Ejecutar cuando la página haya cargado completamente
window.onload = function () {
    listarInsumos();
    ocultarFormulario();
    cargarUnidades();
    cargarCategorias();
    document.getElementById('busquedaInsumos').addEventListener('input', buscarInsumos);
}


// Función para cargar unidades en el select
let cargarUnidades = async () => {
    try {
        const respuesta = await fetch('http://localhost:8080/api/unidades');
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

// Función para cargar categorías en el select
let cargarCategorias = async () => {
    try {
        const respuesta = await fetch('http://localhost:8080/api/categorias');
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
let editarInsumo = async (ubicacion) => {
    mostrarFormulario();
    idEditar = ubicacion; // Guardar la ubicación en la variable global

    try {
        const peticion = await fetch(`http://localhost:8080/api/almacen/${ubicacion}`);
        if (!peticion.ok) throw new Error('Error al obtener datos del insumo');

        const insumo = await peticion.json();
        console.log('Insumo recibido:', insumo);

        // Rellenar los campos del formulario con los datos del insumo
        document.getElementById("estante").value = insumo.ubicacion;
        document.getElementById("codigo_insumo").value = insumo.codigo_insumo.codigo_insumo;
        document.getElementById("nombre").value = insumo.codigo_insumo.nombre;
        document.getElementById("numero_parte").value = insumo.codigo_insumo.numero_parte;
        document.getElementById("procedencia").value = insumo.codigo_insumo.procedencia;
        document.getElementById("stock").value = insumo.stock;

        // Seleccionar la unidad y categoría actuales en los selects
        document.getElementById('unidad').value = insumo.codigo_insumo.unidades_insumo.codigo_unidades;
        document.getElementById('categoria_insumo').value = insumo.codigo_insumo.categoria_insumo.codigo_categoria;
    } catch (error) {
        console.error('Error al editar insumo:', error);
        alert('Error al cargar datos del insumo. Inténtalo de nuevo.');
    }
}

// Función para aplicar la actualización del insumo
let aplicarActualizacionProducto = async () => {
    let campos = {
        codigo_insumo: document.getElementById('codigo_insumo').value.trim(),
        nombre: document.getElementById('nombre').value.trim(),
        numero_parte: document.getElementById('numero_parte').value.trim(),
        unidades_insumo: {
            codigo_unidades: document.getElementById('unidad').value
        },
        procedencia: document.getElementById('procedencia').value.trim(),
        categoria_insumo: {
            codigo_categoria: document.getElementById('categoria_insumo').value
        }
    };

    try {
        const respuesta = await fetch(`http://localhost:8080/api/insumos/${idEditar}`, {
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
        aplicarActualizacionAlmacen(idEditar); // Actualizar la ubicación en el almacén
    } catch (error) {
        console.error('Error al actualizar insumo:', error);
        alert('Ocurrió un error al actualizar el insumo. Inténtalo nuevamente.');
    }
}

// Función para actualizar la ubicación en el almacén
let aplicarActualizacionAlmacen = async (ubicacion) => {
    let campos = {
        ubicacion: document.getElementById('estante').value.trim(),
        insumo: {
            codigo_insumo: parseInt(document.getElementById('codigo_insumo').value.trim())
        },
        entrada: document.getElementById('entrada').value.trim(), // Asegúrate de tener este campo en tu formulario
        salida: 0 // Asignar un valor por defecto o desde el formulario si es necesario
    };

    try {
        const respuesta = await fetch(`http://localhost:8080/api/almacen/${ubicacion}`, {
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

        console.log('Ubicación del insumo actualizada con éxito:', await respuesta.json());
        listarInsumos(); // Volver a listar los insumos
        ocultarFormulario(); // Ocultar el formulario después de la actualización
    } catch (error) {
        console.error('Error al actualizar la ubicación del insumo:', error);
        alert('Ocurrió un error al actualizar la ubicación del insumo. Inténtalo nuevamente.');
    }
}

// Función para listar insumos desde la API
let listarInsumos = async () => {
    try {
        const respuesta = await fetch('http://localhost:8080/api/almacen');
        if (!respuesta.ok) throw new Error('Error al listar insumos');

        const insumos = await respuesta.json();
        let contenidoTabla = "";

        insumos.forEach(insumo => {
            let contenidoFila = `
                <tr>
                  <td>${insumo.ubicacion}</td>
                  <td>${insumo.codigo_insumo.codigo_insumo}</td>
                  <td>${insumo.codigo_insumo.nombre}</td>
                  <td>${insumo.codigo_insumo.numero_parte}</td>
                  <td>${insumo.codigo_insumo.unidades_insumo.nombre_unidad}</td>
                  <td>${insumo.codigo_insumo.procedencia}</td>
                  <td>${insumo.codigo_insumo.categoria_insumo.nombre_categoria}</td>
                  <td>${insumo.stock}</td>
                  <td><button onClick="editarInsumo(${insumo.ubicacion})" class="btn-editar">Editar</button></td>
                  <td><button onClick="borrarInsumo(${insumo.ubicacion})" class="btn-eliminar">Eliminar</button></td>
                </tr>
            `;
            contenidoTabla += contenidoFila;
        });

        document.querySelector('#tablaInsumos tbody').innerHTML = contenidoTabla;
    } catch (error) {
        console.error('Error al listar insumos:', error);
    }
}

// Función para eliminar un insumo
let borrarInsumo = async (ubicacion) => {
    try {
        const respuesta = await fetch(`http://localhost:8080/api/almacen/${ubicacion}`, {
            method: 'DELETE'
        });

        if (!respuesta.ok) throw new Error('Error al eliminar insumo');

        console.log('Insumo borrado con éxito');
        listarInsumos(); // Volver a listar insumos después de la eliminación
    } catch (error) {
        console.error('Error al borrar insumo:', error);
        alert('Ocurrió un error al borrar el insumo. Inténtalo de nuevo.');
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
        const ubicacion = cells[0].innerText.toLowerCase(); // Ubicación está en la primera columna
        const codigo = cells[1].innerText.toLowerCase(); // Código está en la segunda columna

        // Comprobar si la búsqueda coincide con la ubicación o el código
        if (ubicacion.includes(busqueda) || codigo.includes(busqueda)) {
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
        btnModificar.addEventListener('click', aplicarActualizacionProducto);
    }
});
