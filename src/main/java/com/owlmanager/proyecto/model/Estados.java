package com.owlmanager.proyecto.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Table(name="estados")
@Entity
public class Estados {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_estado;

    private String nombre_estado;

    @Override
    public String toString() {
        return "Estado{" +
                "id_estado=" + id_estado +
                ", nombre_estado='" + nombre_estado + '\'' +
                '}';
    }
}
