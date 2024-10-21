package com.owlmanager.proyecto.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@Table(name = "entradas")
@Entity
public class Entrada {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "codigo_insumo")
    private Insumos insumo;

    private int cantidad;    // Cantidad de insumo a ingresar
    private LocalDate fecha; // Fecha de la entrada
}