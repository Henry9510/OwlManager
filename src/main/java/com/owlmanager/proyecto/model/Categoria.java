package com.owlmanager.proyecto.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Table(name="categoria")
@Entity
public class Categoria {

    @Id
    private Long codigo_categoria;

    private String nombre_categoria;

    @Override
    public String toString() {
        return "Categoria{" +
                "codigo_categoria=" + codigo_categoria +
                ", nombre_categoria='" + nombre_categoria + '\'' +
                '}';
    }
}
