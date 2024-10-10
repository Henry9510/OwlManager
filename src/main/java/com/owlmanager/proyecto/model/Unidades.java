package com.owlmanager.proyecto.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Table(name="unidades")
@Entity
public class Unidades {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo_unidades;

    private String nombre_unidad;

    @Override
    public String toString() {
        return "Unidades{" +
                "codigo_unidades=" + codigo_unidades +
                ", nombre_unidad='" + nombre_unidad + '\'' +
                '}';
    }
}
