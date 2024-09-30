package com.owlmanager.proyecto.Repository;


import com.owlmanager.proyecto.model.RegistroEntradasAlmacen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntradasRepository extends JpaRepository <RegistroEntradasAlmacen, Long> {
}
