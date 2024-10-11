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

    @ManyToOne
    @JoinColumn(name = "id_estado", referencedColumnName = "id_estado")
    private Estado estado_proyecto;

    @Override
    public String toString() {
        return "Proyecto{" +
                "codigo_proyecto=" + codigo_proyecto +
                ", descripcion_proyecto='" + descripcion_proyecto + '\'' +
                ", fecha_inicio=" + fecha_inicio +
                ", fecha_fin=" + fecha_fin +
                ", horas_estimadas=" + horas_estimadas +
                ", horas_reales=" + horas_reales +
                ", estado_proyecto=" + estado_proyecto +
                '}';
    }
}
