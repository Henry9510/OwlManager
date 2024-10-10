let unidadesList = [];
let categoriasList = [];

// Función para obtener las unidades
const obtenerUnidades = async () => {
    try {
        const respuesta = await fetch('http://localhost:8080/api/unidades');
        if (!respuesta.ok) throw new Error('Error al obtener las unidades');
        const data = await respuesta.json();
        unidadesList = data;  // Guardar la lista de unidades
    } catch (error) {
        console.error('Error:', error);
    }
};

// Función para obtener las categorías
const obtenerCategorias = async () => {
    try {
        const respuesta = await fetch('http://localhost:8080/api/categorias');
        if (!respuesta.ok) throw new Error('Error al obtener las categorías');
        const data = await respuesta.json();
        categoriasList = data;  // Guardar la lista de categorías
    } catch (error) {
        console.error('Error:', error);
    }
};

// Cargar las unidades y categorías cuando la página cargue
window.onload = async () => {
    await obtenerUnidades();
    await obtenerCategorias();
    poblarSelects();
};

// Función para poblar los selects de unidades y categorías
const poblarSelects = () => {
    const unidadSelect = document.getElementById('unidad');
    const categoriaSelect = document.getElementById('categoria_insumo');

    // Poblar el campo Unidad
    unidadesList.forEach(unidad => {
        let option = document.createElement('option');
        option.value = unidad.codigo_unidades;  // Código de la unidad
        option.text = unidad.nombre_unidad;  // Nombre de la unidad
        unidadSelect.appendChild(option);
    });

    // Poblar el campo Categoría
    categoriasList.forEach(categoria => {
        let option = document.createElement('option');
        option.value = categoria.codigo_categoria;  // Código de la categoría
        option.text = categoria.nombre_categoria;  // Nombre de la categoría
        categoriaSelect.appendChild(option);
    });
};

// Función para validar los campos del formulario
const validarCampos = () => {
    const campos = [
        { id: 'codigo_insumo', nombre: 'Código de Insumo' },
        { id: 'nombre', nombre: 'Nombre' },
        { id: 'numero_parte', nombre: 'Número de Parte' },
        { id: 'procedencia', nombre: 'Procedencia' },
        { id: 'unidad', nombre: 'Unidad' },
        { id: 'categoria_insumo', nombre: 'Categoría' }
    ];

    for (const campo of campos) {
        const valor = document.getElementById(campo.id).value.trim();
        if (!valor) {
            alert(`${campo.nombre} no puede estar vacío.`);
            return false; // Detener la validación si hay un campo vacío
        }
    }
    return true; // Todos los campos son válidos
};

// Función para registrar el producto
let registrarProducto = async () => {
    if (!validarCampos()) {
        return; // Si la validación falla, salir de la función
    }

    let nombreUnidad = document.getElementById('unidad').value.trim();  // ID de la unidad seleccionada
    let nombreCategoria = document.getElementById('categoria_insumo').value.trim();  // ID de la categoría seleccionada

    // Buscar el código de la unidad en la lista de unidades
    let unidadSeleccionada = unidadesList.find(unidad => unidad.codigo_unidades == nombreUnidad);
    if (!unidadSeleccionada) {
        alert('Unidad no encontrada');
        return;
    }

    // Buscar el código de la categoría en la lista de categorías
    let categoriaSeleccionada = categoriasList.find(categoria => categoria.codigo_categoria == nombreCategoria);
    if (!categoriaSeleccionada) {
        alert('Categoría no encontrada');
        return;
    }

    // Recolecta los datos del formulario
    let campos = {
        codigo_insumo: document.getElementById('codigo_insumo').value.trim(),
        nombre: document.getElementById('nombre').value.trim(),
        numero_parte: document.getElementById('numero_parte').value.trim(),
        unidades_insumo: {
            codigo_unidades: unidadSeleccionada.codigo_unidades  // Código de la unidad seleccionada
        },
        procedencia: document.getElementById('procedencia').value.trim(),
        categoria_insumo: {
            codigo_categoria: categoriaSeleccionada.codigo_categoria  // Código de la categoría seleccionada
        }
    };

    try {
        const respuesta = await fetch('http://localhost:8080/api/insumos', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campos)
        });

        if (respuesta.ok) {
            alert('Producto registrado exitosamente');
            // Limpiar los campos del formulario
            document.getElementById('codigo_insumo').value = '';
            document.getElementById('nombre').value = '';
            document.getElementById('numero_parte').value = '';
            document.getElementById('procedencia').value = '';
            document.getElementById('unidad').value = '';
            document.getElementById('categoria_insumo').value = '';
        } else {
            const errorData = await respuesta.json();
            console.error('Error en la respuesta del servidor:', errorData);
            alert('Error al registrar el producto');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la conexión con el servidor');
    }
};

// Asignar el evento al botón de crear
document.addEventListener('DOMContentLoaded', function() {
    let boton = document.getElementById("btnCrearProducto");
    if (boton) {
        boton.addEventListener("click", registrarProducto);
    } else {
        console.error('El botón con ID "btncrear" no se encuentra en el DOM.');
    }
});

