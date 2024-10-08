

window.onload = function () {
    listarTranferencia();
  
}

let listarTranferencia = async () => {

    // Obtener los productos desde la API
    const respuesta = await fetch('http://localhost:8080/api/transferencia_proyecto', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
   

    // Convertir la respuesta en JSON
    const listaTranferenciaProyectos = await respuesta.json(); // Corregido: respuesta.json()

    // Crear contenido para la tabla
    let contenidoTabla = "";



    for (let listaTranferenciaProyecto of listaTranferenciaProyectos) {
        let contenidoFila = `
                <tr>
                     <td>${listaTranferenciaProyecto.fecha}</td>
                    <td>${listaTranferenciaProyecto.proyecto}</td>
                    <td>${listaTranferenciaProyecto.numReq}</td>
                </tr>
            `;
        contenidoTabla += contenidoFila;
    }

    // Actualizar solo el contenido del tbody
    document.querySelector('#Transferlist tbody').innerHTML = contenidoTabla; // Corregido: innerHTML
    console.log("hola")

}
