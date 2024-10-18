package com.owlmanager.proyecto.model;


import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@Entity
@Table(name = "registro_transferencia_proyecto")
public class RegistroTransferenciaProyecto {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long idTransferencia;

        private LocalDate fecha;

        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "codigo_proyecto", nullable = false)
        private Proyecto proyecto;

        @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
        @JoinColumn(name = "id_transferencia")
        private List<InsumoTransferido> insumos;


}
