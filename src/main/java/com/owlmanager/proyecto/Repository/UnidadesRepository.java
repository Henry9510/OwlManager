package com.owlmanager.proyecto.Repository;

import com.owlmanager.proyecto.model.Unidades;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UnidadesRepository extends JpaRepository<Unidades, Long> {

}
