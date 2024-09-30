package com.owlmanager.proyecto.Repository;

import com.owlmanager.proyecto.model.RegistroTransferenciaProyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalidasRepository extends JpaRepository <RegistroTransferenciaProyecto, Long> {
}
