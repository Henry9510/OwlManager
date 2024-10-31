-- Insertar datos en la tabla Categorias
INSERT INTO Categorias (codigo_categoria, nombre_categoria)
VALUES (1, 'Material de Construcción'),
       (2, 'Equipos Eléctricos'),
       (3, 'Herramientas Manuales'),
       (4, 'Material de Oficina'),
       (5, 'Suministros de Limpieza'),
       (6, 'Equipos de Protección Personal'),
       (7, 'Material de Jardinería'),
       (8, 'Productos Químicos'),
       (9, 'Muebles'),
       (10, 'Artículos de Ferretería');

-- Insertar datos en la tabla Estados
INSERT INTO Estados (id_estado, nombre_estado)
VALUES (1, 'En Progreso'),
       (2, 'Finalizado'),
       (3, 'Pendiente'),
       (4, 'Cancelado'),
       (5, 'Suspendido'),
       (6, 'Aplazado'),
       (7, 'En Revisión'),
       (8, 'Completado'),
       (9, 'En Espera'),
       (10, 'En Preparación');

-- Insertar datos en la tabla Proyectos
INSERT INTO Proyectos (codigo_proyecto, descripcion_proyecto, fecha_fin, fecha_inicio, horas_estimadas, horas_reales,
                       id_estado)
VALUES (1, 'Construcción de un edificio', '2024-12-15', '2024-10-01', 1000, 800, 1),
       (2, 'Instalación de paneles solares', '2024-12-30', '2024-10-01', 500, 300, 2),
       (3, 'Rehabilitación de vías', '2024-11-20', '2024-10-05', 750, 600, 1),
       (4, 'Mantenimiento de instalaciones eléctricas', '2024-10-30', '2024-10-15', 200, 150, 3),
       (5, 'Suministro de materiales para obra', '2024-10-15', '2024-10-01', 400, 200, 2),
       (6, 'Construcción de una planta de tratamiento', '2024-11-30', '2024-10-10', 1200, 900, 1),
       (7, 'Desarrollo de software para gestión de proyectos', '2024-10-30', '2024-10-01', 300, 250, 2),
       (8, 'Reparación de maquinaria', '2024-10-30', '2024-10-01', 150, 120, 3),
       (9, 'Instalación de sistemas de climatización', '2024-11-15', '2024-10-01', 600, 400, 1),
       (10, 'Organización de un evento corporativo', '2024-12-01', '2024-10-10', 200, 180, 2);

-- Insertar datos en la tabla Unidades
INSERT INTO Unidades (codigo_unidades, nombre_unidad)
VALUES (1, 'Unidad'),
       (2, 'Metro'),
       (3, 'Kilogramo'),
       (4, 'Litro'),
       (5, 'Caja'),
       (6, 'Paquete'),
       (7, 'Rollo'),
       (8, 'Set'),
       (9, 'Pieza'),
       (10, 'Tanda');


-- Insertar datos en la tabla Insumos
INSERT INTO Insumos (codigo_insumo, nombre, numero_parte, procedencia, codigo_categoria, codigo_unidades)
VALUES (1, 'Tornillo', 'A123', 'N/A', 1, 3),
       (2, 'Cable Eléctrico', 'C456', 'México', 2, 4),
       (3, 'Martillo', 'B789', 'N/A', 1, 3),
       (4, 'Pintura Acrílica', 'D012', 'Colombia', 3, 5),
       (5, 'Cemento', 'E345', 'Ecuador', 1, 2),
       (6, 'Arena', 'F678', 'Perú', 1, 2),
       (7, 'Grúa', 'G901', 'N/A', 4, 1),
       (8, 'Panel Solar', 'H234', 'China', 5, 6),
       (9, 'Tubos de PVC', 'I567', 'N/A', 3, 4),
       (10, 'Martillo Eléctrico', 'J890', 'Alemania', 2, 1);


INSERT INTO empleados (cedula, apellido, cargo, celular, direccion, edad, email, fecha_ingreso, nombre,
                       segundo_apellido, segundo_nombre, sexo, telefono)
VALUES (1012345678, 'Gómez', 'Analista', '3001234567', 'Calle 10 #20-30', 28, 'j.gomez@example.com', '2023-05-10',
        'Juan', 'López', 'Carlos', 'M', '601234567'),
       (1023456789, 'Rodríguez', 'Supervisor', '3012345678', 'Carrera 15 #10-20', 35, 'm.rodriguez@example.com',
        '2022-08-15', 'María', 'Martínez', 'Elena', 'F', '602345678'),
       (1034567890, 'Martínez', 'Desarrollador', '3023456789', 'Avenida 5 #15-40', 30, 'p.martinez@example.com',
        '2021-07-25', 'Pedro', 'González', 'Luis', 'M', '603456789'),
       (1045678901, 'Pérez', 'Gerente', '3034567890', 'Calle 8 #6-50', 45, 'a.perez@example.com', '2020-01-20', 'Ana',
        'Ramírez', 'María', 'F', '604567890'),
       (1056789012, 'García', 'Ingeniero', '3045678901', 'Carrera 12 #9-15', 29, 'd.garcia@example.com', '2023-03-12',
        'Daniel', 'Ruiz', 'Fernando', 'M', '605678901'),
       (1067890123, 'López', 'Técnico', '3056789012', 'Avenida 7 #2-80', 32, 'c.lopez@example.com', '2019-09-30',
        'Carlos', 'Ramírez', 'Eduardo', 'M', '606789012'),
       (1078901234, 'Moreno', 'Consultor', '3067890123', 'Calle 14 #4-50', 40, 'l.moreno@example.com', '2021-11-05',
        'Laura', 'Gómez', 'Isabel', 'F', '607890123'),
       (1089012345, 'Jiménez', 'Administrador', '3078901234', 'Carrera 5 #18-70', 27, 's.jimenez@example.com',
        '2022-12-20', 'Sofía', 'Hernández', 'Paula', 'F', '608901234'),
       (1090123456, 'Torres', 'Coordinador', '3089012345', 'Avenida 11 #3-60', 31, 'e.torres@example.com', '2020-06-18',
        'Esteban', 'Morales', 'Alberto', 'M', '609012345'),
       (1101234567, 'Hernández', 'Analista', '3090123456', 'Calle 9 #17-35', 26, 'g.hernandez@example.com',
        '2023-04-07', 'Gabriela', 'Vargas', 'Andrea', 'F', '610123456');
