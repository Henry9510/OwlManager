

document.addEventListener("DOMContentLoaded", function() {

});
let registrarInsumos = async () => {
    // Datos de ejemplo para enviar al servidor
    let insumos = [
    ];

    for (let insumo of insumos) {
        try {
            // Enviar el dato del insumo al servidor
            const respuesta = await fetch('http://localhost:8080/api/insumos', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(insumo) // Convierte el objeto a una cadena JSON
            });

            // Verifica si la respuesta es exitosa
            if (!respuesta.ok) {
                const respuestaTexto = await respuesta.text(); // Obtener respuesta en texto
                console.log('Respuesta del servidor:', respuestaTexto);
                throw new Error(`Error en la solicitud: ${respuesta.statusText}`);
            }

            // Procesa la respuesta JSON
            const datos = await respuesta.json();
            console.log('Insumo registrado con éxito:', datos);

        } catch (error) {
            console.error('Error al registrar el insumo:', error);
            alert('Ocurrió un error al registrar el insumo. Por favor, inténtelo de nuevo.');
        }
    }
}


let registrarProyectos = async () => {
    let proyectos = [


    ];

    for (let proyecto of proyectos) {
        try {
            const respuesta = await fetch('http://localhost:8080/api/proyecto', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(proyecto)
            });

            if (!respuesta.ok) {
                const respuestaTexto = await respuesta.text();
                console.log('Respuesta del servidor:', respuestaTexto);
                throw new Error(`Error en la solicitud: ${respuesta.statusText}`);
            }

            const datos = await respuesta.json();
            console.log('Proyecto registrado con éxito:', datos);

        } catch (error) {
            console.error('Error al registrar el proyecto:', error);
            alert('Ocurrió un error al registrar el proyecto. Inténtelo de nuevo.');
        }
    }
}


let registrarEmpleado = async () => {
    // Datos de ejemplo para enviar al servidor
    let empleados =

        [
            {
                "cedula": 1012345678,
                "nombre": "Carlos",
                "apellido": "Gómez",
                "segundo_nombre": "Andrés",
                "segundo_apellido": "Rodríguez",
                "fecha_ingreso": "2023-05-12",
                "cargo": "Ingeniero de Software",
                "edad": 29,
                "sexo": "m",
                "telefono": "3001234567",
                "direccion": "Calle 45 #12-34",
                "email": "cgomez@empresa.com",
                "celular": "3112345678"
            },
            {
                "cedula": 1023456789,
                "nombre": "Laura",
                "apellido": "Martínez",
                "segundo_nombre": "Patricia",
                "segundo_apellido": "Suárez",
                "fecha_ingreso": "2022-08-25",
                "cargo": "Gerente de Proyectos",
                "edad": 34,
                "sexo": "f",
                "telefono": "3109876543",
                "direccion": "Carrera 50 #23-45",
                "email": "lmartinez@empresa.com",
                "celular": "3009876543"
            },
            {
                "cedula": 1034567890,
                "nombre": "Andrés",
                "apellido": "Pérez",
                "segundo_nombre": "Felipe",
                "segundo_apellido": "López",
                "fecha_ingreso": "2021-11-10",
                "cargo": "Analista Financiero",
                "edad": 31,
                "sexo": "m",
                "telefono": "3201122334",
                "direccion": "Avenida 68 #32-67",
                "email": "aperez@empresa.com",
                "celular": "3211122334"
            },
            {
                "cedula": 1045678901,
                "nombre": "Ana",
                "apellido": "Gutiérrez",
                "segundo_nombre": "Isabel",
                "segundo_apellido": "Ramírez",
                "fecha_ingreso": "2020-02-15",
                "cargo": "Diseñadora Gráfica",
                "edad": 27,
                "sexo": "f",
                "telefono": "3112233445",
                "direccion": "Transversal 34 #65-23",
                "email": "agutierrez@empresa.com",
                "celular": "3222233445"
            },
            {
                "cedula": 1056789012,
                "nombre": "Juan",
                "apellido": "Sánchez",
                "segundo_nombre": "José",
                "segundo_apellido": "Moreno",
                "fecha_ingreso": "2023-09-01",
                "cargo": "Desarrollador Frontend",
                "edad": 24,
                "sexo": "m",
                "telefono": "3203344556",
                "direccion": "Calle 100 #10-45",
                "email": "jsanchez@empresa.com",
                "celular": "3233344556"
            },
            {
                "cedula": 1067890123,
                "nombre": "María",
                "apellido": "Vargas",
                "segundo_nombre": "Lucía",
                "segundo_apellido": "Díaz",
                "fecha_ingreso": "2019-06-18",
                "cargo": "Consultora de Negocios",
                "edad": 36,
                "sexo": "f",
                "telefono": "3004455667",
                "direccion": "Carrera 15 #45-67",
                "email": "mvargas@empresa.com",
                "celular": "3244455667"
            },
            {
                "cedula": 1078901234,
                "nombre": "Diego",
                "apellido": "Castro",
                "segundo_nombre": "Esteban",
                "segundo_apellido": "Mejía",
                "fecha_ingreso": "2024-01-10",
                "cargo": "Ingeniero DevOps",
                "edad": 30,
                "sexo": "m",
                "telefono": "3105566778",
                "direccion": "Calle 80 #50-30",
                "email": "dcastro@empresa.com",
                "celular": "3255566778"
            },
            {
                "cedula": 1089012345,
                "nombre": "Camila",
                "apellido": "Ortiz",
                "segundo_nombre": "Alejandra",
                "segundo_apellido": "Cruz",
                "fecha_ingreso": "2021-12-01",
                "cargo": "Marketing Digital",
                "edad": 28,
                "sexo": "f",
                "telefono": "3206677889",
                "direccion": "Avenida 19 #130-12",
                "email": "cortiz@empresa.com",
                "celular": "3266677889"
            },
            {
                "cedula": 1090123456,
                "nombre": "Santiago",
                "apellido": "Muñoz",
                "segundo_nombre": "David",
                "segundo_apellido": "Ariza",
                "fecha_ingreso": "2022-03-20",
                "cargo": "Administrador de Sistemas",
                "edad": 35,
                "sexo": "m",
                "telefono": "3007788990",
                "direccion": "Calle 123 #45-67",
                "email": "smunoz@empresa.com",
                "celular": "3277788990"
            },
            {
                "cedula": 1101234567,
                "nombre": "Lucía",
                "apellido": "Hernández",
                "segundo_nombre": "Beatriz",
                "segundo_apellido": "Salazar",
                "fecha_ingreso": "2023-07-30",
                "cargo": "Especialista en Recursos Humanos",
                "edad": 33,
                "sexo": "f",
                "telefono": "3128899001",
                "direccion": "Carrera 100 #200-45",
                "email": "lhernandez@empresa.com",
                "celular": "3288899001"
            }
        ];


    for (let empleado of empleados) {
        try {
            // Enviar el dato del empleado al servidor
            const respuesta = await fetch('http://localhost:8080/api/empleado', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(empleado) // Convierte el objeto a una cadena JSON
            });

            // Verifica si la respuesta es exitosa
            if (!respuesta.ok) {
                const respuestaTexto = await respuesta.text(); // Obtener respuesta en texto
                console.log('Respuesta del servidor:', respuestaTexto);
                throw new Error(`Error en la solicitud: ${respuesta.statusText}`);
            }

            // Procesa la respuesta JSON
            const datos = await respuesta.json();
            console.log('Empleado registrado con éxito:', datos);

        } catch (error) {
            console.error('Error al registrar el empleado:', error);
            alert('Ocurrió un error al registrar el empleado. Por favor, inténtelo de nuevo.');
        }
    }


}