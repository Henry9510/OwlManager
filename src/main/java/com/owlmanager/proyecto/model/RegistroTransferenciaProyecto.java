package com.owlmanager.proyecto.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@Table(name="transferenciasinsumos")
@Entity
public class RegistroTransferenciaProyecto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idtranferenciasinsumo", nullable = false)
    private long idtranferenciasinsumo;


    private int cantidad_salida;
    private LocalDate fecha;

    @ManyToOne( fetch = FetchType.EAGER)
    @JoinColumn(name = "numero_proyecto")
    private Proyecto proyecto;


    @ManyToOne( fetch = FetchType.EAGER)
    @JoinColumn(name = "codigo_insumo")
    private Insumos insumo;


    @Override
    public String toString() {
        return "RegistroTransferenciaProyecto{" +
                "cantidad_salida=" + cantidad_salida +
                ", fecha=" + fecha +
                ", proyecto=" + proyecto +
                ", insumo=" + insumo +
                '}';
    }
}
