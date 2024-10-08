window.onload = function () {
    listarProductos();
  
}






let listarProductos = async () => {

    // Obtener los productos desde la API
    const respuesta = await fetch('http://localhost:8080/api/producto', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    // Convertir la respuesta en JSON
    const productos = await respuesta.json(); // Corregido: respuesta.json()

    // Crear contenido para la tabla
    let contenidoTabla = "";

    for (let producto of productos) {
        let contenidoFila = `
                <tr>
                    <td>${producto.id}</td>
                     <td>${producto.codigo}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.partNumber}</td>
                    <td>${producto.unidad}</td>
                    <td>${producto.procedencia}</td>
                    <td>${producto.material}</td>
                    <td>${producto.precio}</td>
                    <td><button onClick = "editarProducto(${producto.id})" class="btn-editar">Editar</button></td>
                    <td><button onClick = "borrarProducto(${producto.id})" class="btn-eliminar">Eliminar</button></td>
                </tr>
            `;
        contenidoTabla += contenidoFila;
    }

    // Actualizar solo el contenido del tbody
    document.querySelector('#tablaProductos tbody').innerHTML = contenidoTabla; // Corregido: innerHTML

}






let borrarProducto = async (id) => {

    const respuesta = await fetch(`http://localhost:8080/api/producto/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    listarProductos();

}



function mostrarFormulario() {

    let formulario = document.getElementById("formEditarProducto").style.visibility = "visible";
}

function ocultarFormulario() {

    let formulario = document.getElementById("formEditarProducto").style.visibility = "hidden";
}


let idEditar;

let editarProducto = async (id) => {
    mostrarFormulario();
    idEditar = id;


    const peticion = await fetch(`http://localhost:8080/api/producto/` + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });


    const producto = await peticion.json();

    console.log('Producto recibido:', producto);

    document.getElementById("codigo").value = producto.codigo;
    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("partNumber").value = producto.partNumber;
    document.getElementById("unidad").value = producto.unidad;
    document.getElementById("procedencia").value = producto.procedencia;
    document.getElementById("material").value = producto.material;
    document.getElementById("precio").value = producto.precio;


}

document.addEventListener('DOMContentLoaded', function () {
    let btnModificar = document.getElementById("btnModificar");
    if (btnModificar) {
        btnModificar.addEventListener("click", evento => {
            evento.preventDefault(); // Evita el envío del formulario para la demostración
            aplicarActualizacion(idEditar);
        });
    } else {
        console.error('El botón con ID "btnModificar" no se encuentra en el DOM.');
    }
});



let aplicarActualizacion = async (id) => {

    // Recopilar datos de los campos del formulario
    let campos = {

        id: id,  // Usa el ID que recibes como parámetro
        codigo: document.getElementById('codigo').value,
        nombre: document.getElementById('nombre').value,
        unidad: document.getElementById('unidad').value,
        material: document.getElementById('material').value,
        precio: document.getElementById('precio').value,
        procedencia: document.getElementById('procedencia').value,
        partNumber: document.getElementById('partNumber').value
    };


    try {
        // Realizar la solicitud PUT
        const respuesta = await fetch("http://localhost:8080/api/producto/" + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campos)
        });

        // Verificar si la respuesta es exitosa
        if (!respuesta.ok) {
            const errorText = await respuesta.text();
            throw new Error(`Error en la solicitud: ${respuesta.status} ${respuesta.statusText} - ${errorText}`);


        }

        // Procesar la respuesta si es exitosa
        const datos = await respuesta.json();
        console.log('Producto actualizado con éxito:', datos);

        // Llama a una función para actualizar la lista de productos
        listarProductos();
        ocultarFormulario();

    } catch (error) {
        const errorText = await respuesta.text();
        console.error('Detalles del error:', errorText);
        console.error('Error al aplicar la actualización:', error);
        alert('Ocurrió un error al actualizar el producto. Por favor, inténtelo de nuevo.');
    }
}
