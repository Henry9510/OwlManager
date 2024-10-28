package com.owlmanager.proyecto.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "insumos")
public class Insumos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo_insumo;

    private String numero_parte;
    private String nombre;
    private String procedencia;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "codigo_categoria", nullable = false)
    private Categorias categoria_insumo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "codigo_unidades", nullable = false)
    private Unidades unidades_insumo;


}
