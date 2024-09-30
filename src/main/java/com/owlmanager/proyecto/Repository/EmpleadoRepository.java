package com.owlmanager.proyecto.Repository;

import com.owlmanager.proyecto.model.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface EmpleadoRepository extends JpaRepository <Empleado, Long> {


}