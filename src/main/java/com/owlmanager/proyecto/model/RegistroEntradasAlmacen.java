package com.owlmanager.proyecto.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@Table(name="registroentradas")
@Entity
public class RegistroEntradasAlmacen {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idregistroentrada", nullable = false)
    private long idregistroentrada;

    private int cantidad_entrada;
    private LocalDate fecha;
    

    @ManyToOne( fetch = FetchType.EAGER)
    @JoinColumn(name = "codigo_insumo")
    private Insumos insumo;

    
    @ManyToOne( fetch = FetchType.EAGER)
    @JoinColumn(name = "ubicacion")
    private Almacen estante;


    @Override
    public String toString() {
        return "RegistroEntradasAlmacen{" +
                ", cantidad_entrada=" + cantidad_entrada +
                ", fecha=" + fecha +
                ", insumo=" + insumo +
                ", estante=" + estante +
                '}';
    }
}
