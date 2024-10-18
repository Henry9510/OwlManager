package com.owlmanager.proyecto.Repository;

import com.owlmanager.proyecto.model.Almacen;
import com.owlmanager.proyecto.model.Insumos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AlmacenRepository extends JpaRepository<Almacen, Long> {
    Optional<Almacen> findByInsumo_Codigo_insumo(String codigoInsumo);
}