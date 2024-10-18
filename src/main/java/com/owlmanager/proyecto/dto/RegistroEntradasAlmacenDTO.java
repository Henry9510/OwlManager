package com.owlmanager.proyecto.dto;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

    @Getter
    @Setter
    public class RegistroEntradasAlmacenDTO {
        private int cantidadEntrada;
        private LocalDate fecha;
        private long ubicacion;  // ID de la ubicación en el almacén
    }


