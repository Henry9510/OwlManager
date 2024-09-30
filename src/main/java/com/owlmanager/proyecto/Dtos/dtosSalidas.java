package com.owlmanager.proyecto.Dtos;


import com.owlmanager.proyecto.model.Insumos;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class dtosSalidas {

        private long idregistroentrada;

        private Insumos codigo_insumo;
        private LocalDate fecha;
        private Integer cantidad;

}
