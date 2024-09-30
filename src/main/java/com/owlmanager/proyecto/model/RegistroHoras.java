package com.owlmanager.proyecto.model;


import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Table(name="registrohoras")
@Entity
public class RegistroHoras {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fecha;
    private int horas_trabajadas;

    @ManyToOne( fetch = FetchType.EAGER)
    @JoinColumn(name = "cedula", nullable = false)
    private Empleado empleado;

    @ManyToOne( fetch = FetchType.EAGER)
    @JoinColumn(name = "codigo_proyecto", nullable = false)
    private Proyecto proyecto;


    @Override
    public String toString() {
        return "RegistroHoras{" +
                "fecha=" + fecha +
                ", horas_trabajadas=" + horas_trabajadas +
                ", empleado=" + empleado +
                ", proyecto=" + proyecto +
                '}';
    }
}
