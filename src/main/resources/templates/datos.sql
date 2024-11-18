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
VALUES (1, 'REF3K - Refueller 3K (11,000 L)', '2024-11-30', '2024-11-01', 1000, 0, 1),
       (2, 'REF5K - Refueller 5K (26,000 L)', '2024-11-30', '2024-11-01', 500, 0, 2),
       (3, 'REF7K - Refueller 7K (35,000 L)', '2024-11-30', '2024-11-01', 750, 0, 1),
       (4, 'REF10K - Refueller 10K (45,000 L)', '2024-11-30', '2024-11-01', 200, 0, 3),
       (5, 'REF15K - Refueller 15K (56,000 L)', '2024-11-30', '2024-11-01', 400, 0, 2),
       (6, 'ESC - Escaleras de acceso', '2024-11-30', '2024-11-01', 1200, 0, 1),
       (7, 'DEC - Descongelador de aeronaves', '2024-11-30', '2024-11-01', 300, 0, 2),
       (8, 'DIS - Dispensador de combustible', '2024-11-30', '2024-11-01', 150, 0, 3),
       (9, 'SAN - Carro de sanitarios', '2024-11-30', '2024-11-01', 600, 0, 1),
       (10, 'HID - Hidrante para reabastecimiento', '2024-11-30', '2024-11-01', 200, 0, 2);


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
        '2023-04-07', 'Gabriela', 'Vargas', 'Andrea', 'F', '610123456'),
       (1101234568, 'Martínez', 'Desarrollador', '3090123457', 'Calle 10 #20-40', 30, 'm.martinez@example.com',
        '2023-05-01', 'Luis', 'Fernando', 'Sánchez', 'M', '620123456'),
       (1101234569, 'Pérez', 'Diseñador', '3090123458', 'Calle 11 #30-50', 27, 'p.perez@example.com', '2023-05-10',
        'Sofia', 'María', 'Lopez', 'F', '630123456'),
       (1101234570, 'García', 'Gerente', '3090123459', 'Calle 12 #40-60', 35, 'g.garcia@example.com', '2023-06-15',
        'Roberto', 'Alfredo', 'Martinez', 'M', '640123456'),
       (1101234571, 'Rodríguez', 'Analista', '3090123460', 'Calle 13 #50-70', 29, 'r.rodriguez@example.com',
        '2023-07-20', 'Ana', 'Isabel', 'Díaz', 'F', '650123456'),
       (1101234572, 'López', 'Asistente', '3090123461', 'Calle 14 #60-80', 24, 'l.lopez@example.com', '2023-08-25',
        'Carlos', 'Eduardo', 'Cruz', 'M', '660123456'),
       (1101234573, 'González', 'Desarrollador', '3090123462', 'Calle 15 #70-90', 31, 'g.gonzalez@example.com',
        '2023-09-05', 'Laura', 'Patricia', 'Reyes', 'F', '670123456'),
       (1101234574, 'Sánchez', 'Analista', '3090123463', 'Calle 16 #80-100', 28, 's.sanchez@example.com', '2023-10-10',
        'Diego', 'Alejandro', 'Fernández', 'M', '680123456'),
       (1101234575, 'Ramírez', 'Desarrollador', '3090123464', 'Calle 17 #90-110', 32, 'r.ramirez@example.com',
        '2023-11-15', 'Carmen', 'Lucía', 'Torres', 'F', '690123456'),
       (1101234576, 'Cruz', 'Diseñador', '3090123465', 'Calle 18 #100-120', 26, 'c.cruz@example.com', '2023-12-20',
        'Javier', 'Antonio', 'Mora', 'M', '700123456'),
       (1101234577, 'Flores', 'Gerente', '3090123466', 'Calle 19 #110-130', 37, 'f.flores@example.com', '2023-12-30',
        'Ana', 'Cristina', 'Vélez', 'F', '710123456'),
       (1101234578, 'Díaz', 'Asistente', '3090123467', 'Calle 20 #120-140', 23, 'd.diaz@example.com', '2024-01-05',
        'José', 'Manuel', 'Serrano', 'M', '720123456'),
       (1101234579, 'Torres', 'Desarrollador', '3090123468', 'Calle 21 #130-150', 30, 't.torres@example.com',
        '2024-02-10', 'Valentina', 'Carmen', 'Méndez', 'F', '730123456'),
       (1101234580, 'Rojas', 'Analista', '3090123469', 'Calle 22 #140-160', 27, 'r.rojas@example.com', '2024-03-15',
        'Alejandro', 'José', 'Rivas', 'M', '740123456'),
       (1101234581, 'Hernández', 'Gerente', '3090123470', 'Calle 23 #150-170', 34, 'h.hernandez@example.com',
        '2024-04-20', 'Isabella', 'Luisa', 'Salazar', 'F', '750123456'),
       (1101234582, 'Vargas', 'Diseñador', '3090123471', 'Calle 24 #160-180', 26, 'v.vargas@example.com', '2024-05-25',
        'Carlos', 'Felipe', 'Paredes', 'M', '760123456'),
       (1101234583, 'Pérez', 'Asistente', '3090123472', 'Calle 25 #170-190', 29, 'p.perez2@example.com', '2024-06-30',
        'Samantha', 'Nicole', 'Zamora', 'F', '770123456'),
       (1101234584, 'González', 'Desarrollador', '3090123473', 'Calle 26 #180-200', 31, 'g.gonzalez2@example.com',
        '2024-07-05', 'Fernando', 'Andrés', 'Pérez', 'M', '780123456'),
       (1101234585, 'Rodríguez', 'Analista', '3090123474', 'Calle 27 #190-210', 28, 'r.rodriguez2@example.com',
        '2024-08-10', 'Gabriela', 'Andrea', 'Fernández', 'F', '790123456'),
       (1101234586, 'López', 'Gerente', '3090123475', 'Calle 28 #200-220', 36, 'l.lopez2@example.com', '2024-09-15',
        'Hugo', 'Alberto', 'Garcia', 'M', '800123456'),
       (1101234587, 'Martínez', 'Diseñador', '3090123476', 'Calle 29 #210-230', 25, 'm.martinez2@example.com',
        '2024-10-20', 'Daniela', 'Paola', 'Hernández', 'F', '810123456'),
       (1101234588, 'Sánchez', 'Asistente', '3090123477', 'Calle 30 #220-240', 24, 's.sanchez2@example.com',
        '2024-11-25', 'David', 'Alexander', 'Gómez', 'M', '820123456'),
       (1101234589, 'Ramírez', 'Desarrollador', '3090123478', 'Calle 31 #230-250', 33, 'r.ramirez2@example.com',
        '2024-12-30', 'Claudia', 'Patricia', 'Duarte', 'F', '830123456'),
       (1101234590, 'Cruz', 'Analista', '3090123479', 'Calle 32 #240-260', 29, 'c.cruz2@example.com', '2025-01-05',
        'Jorge', 'Luis', 'Velasco', 'M', '840123456'),
       (1101234591, 'Flores', 'Desarrollador', '3090123480', 'Calle 33 #250-270', 30, 'f.flores2@example.com',
        '2025-02-10', 'Paola', 'Andrea', 'Sosa', 'F', '850123456'),
       (1101234592, 'Díaz', 'Diseñador', '3090123481', 'Calle 34 #260-280', 28, 'd.diaz2@example.com', '2025-03-15',
        'Miguel', 'Angel', 'Hernández', 'M', '860123456'),
       (1101234593, 'Torres', 'Gerente', '3090123482', 'Calle 35 #270-290', 35, 't.torres2@example.com', '2025-04-20',
        'Verónica', 'Isabel', 'Vargas', 'F', '870123456'),
       (1101234594, 'Rojas', 'Asistente', '3090123483', 'Calle 36 #280-300', 22, 'r.rojas2@example.com', '2025-05-25',
        'Oscar', 'Eduardo', 'Zapata', 'M', '880123456'),
       (1101234595, 'Hernández', 'Desarrollador', '3090123484', 'Calle 37 #290-310', 32, 'h.hernandez2@example.com',
        '2025-06-30', 'Natalia', 'Lucía', 'Romero', 'F', '890123456'),
       (1101234596, 'Vargas', 'Analista', '3090123485', 'Calle 38 #300-320', 27, 'v.vargas2@example.com', '2025-07-05',
        'Luis', 'Felipe', 'Cardenas', 'M', '900123456'),
       (1101234597, 'Pérez', 'Diseñador', '3090123486', 'Calle 39 #310-330', 29, 'p.perez3@example.com', '2025-08-10',
        'Jessica', 'Carolina', 'Mendoza', 'F', '910123456'),
       (1101234598, 'González', 'Gerente', '3090123487', 'Calle 40 #320-340', 36, 'g.gonzalez3@example.com',
        '2025-09-15', 'Alberto', 'José', 'Correa', 'M', '920123456'),
       (1101234599, 'Rodríguez', 'Asistente', '3090123488', 'Calle 41 #330-350', 24, 'r.rodriguez3@example.com',
        '2025-10-20', 'Laura', 'Fernanda', 'López', 'F', '930123456'),
       (1101234600, 'López', 'Desarrollador', '3090123489', 'Calle 42 #340-360', 31, 'l.lopez3@example.com',
        '2025-11-25', 'Julián', 'Alberto', 'Villalobos', 'M', '940123456'),
       (1101234601, 'Martínez', 'Analista', '3090123490', 'Calle 43 #350-370', 27, 'm.martinez3@example.com',
        '2025-12-30', 'Camila', 'Sofia', 'Vargas', 'F', '950123456'),
       (1101234602, 'Sánchez', 'Diseñador', '3090123491', 'Calle 44 #360-380', 29, 's.sanchez3@example.com',
        '2026-01-05', 'Emilio', 'David', 'Quintero', 'M', '960123456'),
       (1101234603, 'Ramírez', 'Gerente', '3090123492', 'Calle 45 #370-390', 38, 'r.ramirez3@example.com', '2026-02-10',
        'Karina', 'Adriana', 'Ocampo', 'F', '970123456'),
       (1101234604, 'Cruz', 'Asistente', '3090123493', 'Calle 46 #380-400', 23, 'c.cruz3@example.com', '2026-03-15',
        'Edison', 'Samuel', 'Silva', 'M', '980123456'),
       (1101234605, 'Flores', 'Desarrollador', '3090123494', 'Calle 47 #390-410', 30, 'f.flores3@example.com',
        '2026-04-20', 'Angélica', 'Marisol', 'Tellez', 'F', '990123456'),
       (1101234606, 'Díaz', 'Analista', '3090123495', 'Calle 48 #400-420', 26, 'd.diaz3@example.com', '2026-05-25',
        'Victor', 'Hugo', 'García', 'M', '1000123456'),
       (1101234607, 'Torres', 'Diseñador', '3090123496', 'Calle 49 #410-430', 28, 't.torres3@example.com', '2026-06-30',
        'Elena', 'Gabriela', 'Sosa', 'F', '1010123456'),
       (1101234608, 'Rojas', 'Gerente', '3090123497', 'Calle 50 #420-440', 36, 'r.rojas3@example.com', '2026-07-05',
        'Nicolás', 'Esteban', 'Ceballos', 'M', '1020123456'),
       (1101234609, 'Hernández', 'Asistente', '3090123498', 'Calle 51 #430-450', 22, 'h.hernandez4@example.com',
        '2026-08-10', 'Mariana', 'López', 'Ponce', 'F', '1030123456'),
       (1101234610, 'Vargas', 'Desarrollador', '3090123499', 'Calle 52 #440-460', 30, 'v.vargas4@example.com',
        '2026-09-15', 'Andrés', 'Joaquín', 'Zapata', 'M', '1040123456'),
       (1101234611, 'Pérez', 'Analista', '3090123500', 'Calle 53 #450-470', 27, 'p.perez4@example.com', '2026-10-20',
        'Lucía', 'Fernanda', 'Sierra', 'F', '1050123456'),
       (1101234612, 'González', 'Diseñador', '3090123501', 'Calle 54 #460-480', 29, 'g.gonzalez4@example.com',
        '2026-11-25', 'Ricardo', 'Javier', 'Carmona', 'M', '1060123456'),
       (1101234613, 'Rodríguez', 'Gerente', '3090123502', 'Calle 55 #470-490', 34, 'r.rodriguez4@example.com',
        '2026-12-30', 'Patricia', 'Claudia', 'Vega', 'F', '1070123456'),
       (1101234614, 'López', 'Asistente', '3090123503', 'Calle 56 #480-500', 24, 'l.lopez4@example.com', '2027-01-05',
        'Juan', 'Carlos', 'Salinas', 'M', '1080123456'),
       (1101234615, 'Martínez', 'Desarrollador', '3090123504', 'Calle 57 #490-510', 31, 'm.martinez5@example.com',
        '2027-02-10', 'María', 'Elena', 'Oliva', 'F', '1090123456'),
       (1101234616, 'Sánchez', 'Analista', '3090123505', 'Calle 58 #500-520', 29, 's.sanchez5@example.com',
        '2027-03-15', 'Emilio', 'Fernando', 'Torres', 'M', '1100123456'),
       (1101234617, 'Ramírez', 'Diseñador', '3090123506', 'Calle 59 #510-530', 26, 'r.ramirez5@example.com',
        '2027-04-20', 'Natalia', 'Cristina', 'Paz', 'F', '1110123456'),
       (1101234618, 'Cruz', 'Gerente', '3090123507', 'Calle 60 #520-540', 36, 'c.cruz5@example.com', '2027-05-25',
        'José', 'Manuel', 'Cortés', 'M', '1120123456'),
       (1101234619, 'Flores', 'Asistente', '3090123508', 'Calle 61 #530-550', 23, 'f.flores5@example.com', '2027-06-30',
        'Carmen', 'Lucía', 'Bermúdez', 'F', '1130123456'),
       (1101234620, 'Díaz', 'Desarrollador', '3090123509', 'Calle 62 #540-560', 30, 'd.diaz5@example.com', '2027-07-05',
        'Alejandro', 'Julián', 'Pérez', 'M', '1140123456'),
       (1101234621, 'Torres', 'Analista', '3090123510', 'Calle 63 #550-570', 28, 't.torres5@example.com', '2027-08-10',
        'Claudia', 'Isabel', 'Benavides', 'F', '1150123456'),
       (1101234622, 'Rojas', 'Diseñador', '3090123511', 'Calle 64 #560-580', 29, 'r.rojas5@example.com', '2027-09-15',
        'Esteban', 'Roberto', 'Mena', 'M', '1160123456'),
       (1101234623, 'Hernández', 'Gerente', '3090123512', 'Calle 65 #570-590', 34, 'h.hernandez6@example.com',
        '2027-10-20', 'Juliana', 'Tatiana', 'Burgos', 'F', '1170123456'),
       (1101234624, 'Vargas', 'Asistente', '3090123513', 'Calle 66 #580-600', 22, 'v.vargas5@example.com', '2027-11-25',
        'Luis', 'Felipe', 'Montero', 'M', '1180123456'),
       (1101234625, 'Pérez', 'Desarrollador', '3090123514', 'Calle 67 #590-610', 30, 'p.perez5@example.com',
        '2027-12-30', 'Sofía', 'Ángela', 'Henao', 'F', '1190123456'),
       (1101234626, 'González', 'Analista', '3090123515', 'Calle 68 #600-620', 26, 'g.gonzalez5@example.com',
        '2028-01-05', 'Mauricio', 'Alberto', 'Salcedo', 'M', '1200123456'),
       (1101234627, 'Rodríguez', 'Diseñador', '3090123516', 'Calle 69 #610-630', 28, 'r.rodriguez5@example.com',
        '2028-02-10', 'Marta', 'Lucía', 'Ríos', 'F', '1210123456'),
       (1101234628, 'López', 'Gerente', '3090123517', 'Calle 70 #620-640', 36, 'l.lopez5@example.com', '2028-03-15',
        'Fernando', 'Andrés', 'Lara', 'M', '1220123456'),
       (1101234629, 'Martínez', 'Asistente', '3090123518', 'Calle 71 #630-650', 24, 'm.martinez6@example.com',
        '2028-04-20', 'Gabriela', 'Estefanía', 'Galindo', 'F', '1230123456'),
       (1101234630, 'Sánchez', 'Desarrollador', '3090123519', 'Calle 72 #640-660', 31, 's.sanchez6@example.com',
        '2028-05-25', 'Ricardo', 'Alfonso', 'Cisneros', 'M', '1240123456'),
       (1101234631, 'Ramírez', 'Analista', '3090123520', 'Calle 73 #650-670', 29, 'r.ramirez6@example.com',
        '2028-06-30', 'Diana', 'María', 'Quintero', 'F', '1250123456'),
       (1101234632, 'Cruz', 'Diseñador', '3090123521', 'Calle 74 #660-680', 27, 'c.cruz6@example.com', '2028-07-05',
        'Óscar', 'Emilio', 'Córdova', 'M', '1260123456'),
       (1101234633, 'Flores', 'Gerente', '3090123522', 'Calle 75 #670-690', 38, 'f.flores6@example.com', '2028-08-10',
        'Carolina', 'Inés', 'Beltrán', 'F', '1270123456'),
       (1101234634, 'Díaz', 'Asistente', '3090123523', 'Calle 76 #680-700', 22, 'd.diaz6@example.com', '2028-09-15',
        'Salomón', 'Alejandro', 'Alvarado', 'M', '1280123456'),
       (1101234635, 'Torres', 'Desarrollador', '3090123524', 'Calle 77 #690-710', 30, 't.torres6@example.com',
        '2028-10-20', 'Alberto', 'Mauricio', 'Fuentes', 'F', '1290123456'),
       (1101234636, 'Rojas', 'Analista', '3090123525', 'Calle 78 #700-720', 26, 'r.rojas6@example.com', '2028-11-25',
        'Silvia', 'Elisa', 'Ospina', 'F', '1300123456'),
       (1101234637, 'Hernández', 'Diseñador', '3090123526', 'Calle 79 #710-730', 29, 'h.hernandez7@example.com',
        '2028-12-30', 'Javier', 'Antonio', 'Suárez', 'M', '1310123456'),
       (1101234638, 'Vargas', 'Gerente', '3090123527', 'Calle 80 #720-740', 36, 'v.vargas6@example.com', '2029-01-05',
        'Beatriz', 'Victoria', 'Pérez', 'F', '1320123456'),
       (1101234639, 'Pérez', 'Asistente', '3090123528', 'Calle 81 #730-750', 24, 'p.perez6@example.com', '2029-02-10',
        'Diego', 'Alejandro', 'Tobón', 'M', '1330123456'),
       (1101234640, 'González', 'Desarrollador', '3090123529', 'Calle 82 #740-760', 30, 'g.gonzalez6@example.com',
        '2029-03-15', 'Marcela', 'Tatiana', 'Páez', 'F', '1340123456'),
       (1101234641, 'Rodríguez', 'Analista', '3090123530', 'Calle 83 #750-770', 26, 'r.rodriguez6@example.com',
        '2029-04-20', 'Manuel', 'José', 'Uribe', 'M', '1350123456'),
       (1101234642, 'López', 'Diseñador', '3090123531', 'Calle 84 #760-780', 28, 'l.lopez6@example.com', '2029-05-25',
        'Adriana', 'Verónica', 'Márquez', 'F', '1360123456'),
       (1101234643, 'Martínez', 'Gerente', '3090123532', 'Calle 85 #770-790', 34, 'm.martinez7@example.com',
        '2029-06-30', 'Raúl', 'Fernando', 'Cano', 'M', '1370123456');

