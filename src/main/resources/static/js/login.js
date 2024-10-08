$(document).ready(function() {
  // on ready
});



async function iniciarSesion() {
  let datos = {};
  datos.username = document.getElementById('txtEmail').value;
  datos.password = document.getElementById('txtPassword').value;

  try {
    const request = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos) // Coma añadida aquí

    });

    const respuesta = await request.text();
    if (request.ok && respuesta !== 'FAIL') { // Verifica si la respuesta fue exitosa
      localStorage.token = respuesta;
      localStorage.email = datos.username; // Corrige a username
      window.location.href = 'index';
    } else {
      alert("Las credenciales son incorrectas. Por favor intente nuevamente.");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    alert("Hubo un problema al iniciar sesión. Intente nuevamente.");
  }
}