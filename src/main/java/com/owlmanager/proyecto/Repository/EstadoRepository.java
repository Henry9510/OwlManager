package com.owlmanager.proyecto.Repository;

import com.owlmanager.proyecto.model.Estado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface EstadoRepository extends JpaRepository<Estado, Long> {


    }
