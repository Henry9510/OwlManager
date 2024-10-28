package com.owlmanager.proyecto.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "insumo_transferido_salida")
public class InsumoTransferido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "codigo_insumo", nullable = false)
    private Insumos insumo;

    private int cantidad_salida;
}

