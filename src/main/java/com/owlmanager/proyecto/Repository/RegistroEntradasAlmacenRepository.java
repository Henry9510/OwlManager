package com.owlmanager.proyecto.Repository;


import com.owlmanager.proyecto.model.RegistroTransferenciaAlmacen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface RegistroEntradasAlmacenRepository extends JpaRepository<RegistroTransferenciaAlmacen, Long> {
}