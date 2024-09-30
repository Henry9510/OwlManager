package com.owlmanager.proyecto.Repository;


import com.owlmanager.proyecto.model.RegistroHoras;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistroHorasRepository extends JpaRepository<RegistroHoras, Long> {
}
