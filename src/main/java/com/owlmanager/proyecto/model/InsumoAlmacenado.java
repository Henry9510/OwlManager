package com.owlmanager.proyecto.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "insumo_transferido_entrada")
public class InsumoAlmacenado {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ubicacion", nullable = false)
    private Almacen estante; // Relación con el almacén (ubicación)

    private int cantidad_entrada; // Cantidad de entrada de este insumo
}