package com.owlmanager.proyecto.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
@Table(name="proyectos")
@Entity
public class Proyecto {

    @Id
    private Long codigo_proyecto;

    private String descripcion_proyecto;
    private LocalDate fecha_inicio;
    private LocalDate fecha_fin;
    private  int horas_estimadas;
    private int horas_reales;

    @Override
    public String toString() {
        return "Proyecto{" +
                "descripcion_proyecto='" + descripcion_proyecto + '\'' +
                ", fechaInicio=" + fecha_inicio +
                ", fecha_fin=" + fecha_fin +
                ", horas_estimadas=" + horas_estimadas +
                ", horas_reales=" + horas_reales +
                '}';
    }
}
