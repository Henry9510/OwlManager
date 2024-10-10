package com.owlmanager.proyecto.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@Table(name="insumos")
@Entity
public class Insumos {
    
    @Id
    private Long codigo_insumo;

    private String numero_parte;
    private String nombre;
    private String procedencia;


    @ManyToOne( fetch = FetchType.EAGER)
    @JoinColumn(name = "codigo_categoria", nullable = false)
    private Categoria categoria_insumo;

    @ManyToOne( fetch = FetchType.EAGER)
    @JoinColumn(name = "codigo_unidades", nullable = false)
    private Unidades unidades_insumo;


    @Override
    public String toString() {
        return "Insumos{" +
                "codigo_insumo=" + codigo_insumo +
                ", numero_parte='" + numero_parte + '\'' +
                ", nombre='" + nombre + '\'' +
                ", procedencia='" + procedencia + '\'' +
                ", categoria_insumo=" + categoria_insumo +
                ", unidades_insumo=" + unidades_insumo +
                '}';
    }
}
