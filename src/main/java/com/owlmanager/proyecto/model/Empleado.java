package com.owlmanager.proyecto.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
@Table(name="empleados")
@Entity
public class Empleado {

    @Id
    private Long cedula;

    private String nombre;
    private String apellido;
    private String segundo_nombre;
    private String segundo_apellido;
    private LocalDate fecha_ingreso;
    private String cargo;
    private int edad;
    private String sexo;
    private String telefono;
    private String direccion;
    private String email;
    private String celular;

    @Override
    public String toString() {
        return "Empleado{" +
                ", nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", segundo_nombre='" + segundo_nombre + '\'' +
                ", segundo_apellido='" + segundo_apellido + '\'' +
                ", fecha_ingreso=" + fecha_ingreso +
                ", cargo='" + cargo + '\'' +
                ", edad=" + edad +
                ", sexo='" + sexo + '\'' +
                ", telefono='" + telefono + '\'' +
                ", direccion='" + direccion + '\'' +
                ", email='" + email + '\'' +
                ", celular='" + celular + '\'' +
                '}';
    }
}
