package com.owlmanager.proyecto.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@Entity
@Table(name = "almacen")
public class Almacen {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long ubicacion;

        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "codigo_insumo", nullable = false)
        private Insumos insumo;

        private LocalDate fecha;
        private int entrada;
        private int salida;
        private String status;
        private int stock;
}
