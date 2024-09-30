package com.owlmanager.proyecto.Dtos;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class dtosHoras {

        private Long id;
        private String fecha;
        private int horasTrabajadas;
        private Long empleadoId;  // Solo el ID
        private Long proyectoId;  // Solo el ID


}
