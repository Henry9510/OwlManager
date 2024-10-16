package com.owlmanager.proyecto.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;


@Setter
@Getter
@Entity
@Table(name = "registroentradas")
public class RegistroEntradasAlmacen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTransferenciasAlmacen;

    private LocalDate fecha;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ubicacion", nullable = false)
    private Almacen almacen;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "codigo_insumo", nullable = false)
    private Insumos insumo;

    private int cantidad_entrada;
}