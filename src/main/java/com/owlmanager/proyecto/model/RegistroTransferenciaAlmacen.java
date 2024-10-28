package com.owlmanager.proyecto.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;


@Setter
@Getter
@Table(name="registro-transferencia-almacen")
@Entity
public class RegistroTransferenciaAlmacen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id_entrada;

    private LocalDate fecha;

    private String estado;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "codigo_proyecto", nullable = false)
    private Proyecto proyecto;


    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_transferencia_entrada")
    private List<InsumoAlmacenado> insumos;  // Lista de insumos dentro de la transferencia

}