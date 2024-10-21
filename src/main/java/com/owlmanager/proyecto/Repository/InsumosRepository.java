package com.owlmanager.proyecto.Repository;


import com.owlmanager.proyecto.model.Insumos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsumosRepository extends JpaRepository <Insumos, Long> {
}
