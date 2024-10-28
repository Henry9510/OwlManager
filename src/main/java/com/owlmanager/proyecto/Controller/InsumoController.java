package com.owlmanager.proyecto.Controller;

import com.owlmanager.proyecto.model.Insumos;
import com.owlmanager.proyecto.Repository.InsumosRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/insumos")
public class InsumoController {

    @Autowired
    private InsumosRepository insumosRepository;

    @GetMapping
    public List<Insumos> obtenerTodosLosInsumos() {
        return insumosRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Insumos> obtenerInsumoPorId(@PathVariable Long id) {
        Insumos insumo = insumosRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Insumo no encontrado con ID: " + id));
        return ResponseEntity.ok(insumo);
    }

    @PostMapping
    public ResponseEntity<Insumos> crearInsumo(@RequestBody Insumos insumo) {
        Insumos nuevoInsumo = insumosRepository.save(insumo);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoInsumo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Insumos> actualizarInsumo(@PathVariable Long id, @RequestBody Insumos insumoActualizado) {
        Insumos insumoExistente = insumosRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Insumo no encontrado con ID: " + id));

        // Actualizamos los campos del insumo existente
        insumoExistente.setNombre(insumoActualizado.getNombre());
        insumoExistente.setNumero_parte(insumoActualizado.getNumero_parte());
        insumoExistente.setProcedencia(insumoActualizado.getProcedencia());
        insumoExistente.setCategoria_insumo(insumoActualizado.getCategoria_insumo());
        insumoExistente.setUnidades_insumo(insumoActualizado.getUnidades_insumo());

        Insumos insumoActualizadoSave = insumosRepository.save(insumoExistente);
        return ResponseEntity.ok(insumoActualizadoSave);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarInsumo(@PathVariable Long id) {
        Insumos insumo = insumosRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Insumo no encontrado con ID: " + id));

        insumosRepository.delete(insumo);
        return ResponseEntity.noContent().build();
    }
}