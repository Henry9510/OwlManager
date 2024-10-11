package com.owlmanager.proyecto.Repository;

import com.owlmanager.proyecto.model.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProyectoRepository extends JpaRepository<Proyecto, Long> {
}
