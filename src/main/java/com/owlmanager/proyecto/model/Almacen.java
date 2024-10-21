package com.owlmanager.proyecto.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Table(name="almacen")
@Entity
public class Almacen {
    
    @Id
    private long ubicacion;

    @ManyToOne( fetch = FetchType.EAGER)
    @JoinColumn(name = "codigo_insumo")
    private Insumos codigo_insumo;


    private int entrada;
    private  int salida;
    private int status;
    private int stock;


}
