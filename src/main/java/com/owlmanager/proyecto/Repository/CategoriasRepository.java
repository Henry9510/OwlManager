package com.owlmanager.proyecto.Repository;

import com.owlmanager.proyecto.model.Categorias;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriasRepository extends JpaRepository<Categorias, Long> {

}
