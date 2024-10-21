package com.owlmanager.proyecto.Repository;

import com.owlmanager.proyecto.model.Almacen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlmacenRepository extends JpaRepository<Almacen, Long> {

    @Query("SELECT a FROM Almacen a WHERE a.codigo_insumo.codigo_insumo = ?1")
    List<Almacen> findByCodigo_insumo_Codigo_insumo(Long codigoInsumo);
    }

