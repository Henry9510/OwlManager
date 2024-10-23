package com.owlmanager.proyecto.Controller;

import java.util.List;
import java.util.Optional;


import com.owlmanager.proyecto.Repository.InsumosRepository;

import com.owlmanager.proyecto.exception.ResourceNotFoundException;

import com.owlmanager.proyecto.exception.*;
import com.owlmanager.proyecto.model.Almacen;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.owlmanager.proyecto.Repository.AlmacenRepository;
import com.owlmanager.proyecto.Repository.RegistroEntradasAlmacenRepository;
import com.owlmanager.proyecto.model.Insumos;
import com.owlmanager.proyecto.model.RegistroEntradasAlmacen;

@RestController
@RequestMapping("/api/registro-entradas-almacen")
public class RegistroEntradaAlmacenController {

    private final RegistroEntradasAlmacenRepository registroEntradasAlmacenRepository;
    private final InsumosRepository insumoRepository;
    private final AlmacenRepository almacenRepository;

    @Autowired
    public RegistroEntradaAlmacenController(
            RegistroEntradasAlmacenRepository registroEntradasAlmacenRepository,
            InsumosRepository insumoRepository,
            AlmacenRepository almacenRepository) {
        this.registroEntradasAlmacenRepository = registroEntradasAlmacenRepository;
        this.insumoRepository = insumoRepository;
        this.almacenRepository = almacenRepository;
    }

    @GetMapping
    public List<RegistroEntradasAlmacen> obtenerRegistroEntradaAlmacen() {
        return registroEntradasAlmacenRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RegistroEntradasAlmacen> obtenerRegistroEntrada(@PathVariable Long id) {
        Optional<RegistroEntradasAlmacen> opt = registroEntradasAlmacenRepository.findById(id);
        return opt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());

    }

    @PostMapping
    public ResponseEntity<String> guardarRegistroEntradas(@RequestBody RegistroEntradasAlmacen registroEntradasAlmacen) {
        // Validar que los campos necesarios no sean nulos o vacíos
        if (registroEntradasAlmacen.getInsumo() == null || registroEntradasAlmacen.getInsumo().getCodigo_insumo() == null) {
            throw new InvalidInputException("El código del insumo es obligatorio.");
        }

        if (registroEntradasAlmacen.getEstante() == null || registroEntradasAlmacen.getEstante().getUbicacion() == 0) {
            throw new InvalidInputException("La ubicación del estante es obligatoria.");
        }

        // Verificar si el insumo existe
        Insumos insumo = insumoRepository.findById(registroEntradasAlmacen.getInsumo().getCodigo_insumo())
                .orElseThrow(() -> new ResourceNotFoundException("Insumo no encontrado"));

        // Verificar si la ubicación existe
        Almacen estante = almacenRepository.findById(registroEntradasAlmacen.getEstante().getUbicacion())
                .orElseThrow(() -> new ResourceNotFoundException("Ubicación no encontrada"));

        // Asignar insumo y estante al registro
        registroEntradasAlmacen.setInsumo(insumo);
        registroEntradasAlmacen.setEstante(estante);

        // Guardar el registro en la base de datos
        registroEntradasAlmacenRepository.save(registroEntradasAlmacen);

        return ResponseEntity.status(HttpStatus.CREATED).body("Registro guardado exitosamente");
    }



    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @PutMapping("/{id}")
    public ResponseEntity<RegistroEntradasAlmacen> actualizarRegistroEntradas(@PathVariable Long id,
            @RequestBody RegistroEntradasAlmacen registroEntradasActualizado) {
        RegistroEntradasAlmacen registroExistente = registroEntradasAlmacenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Registro de entradas no encontrado"));

        // Actualizar campos del registro
        registroExistente.setCantidad_entrada(registroEntradasActualizado.getCantidad_entrada());
        registroExistente.setFecha(registroEntradasActualizado.getFecha());

        // Validar y asignar el insumo
        Insumos insumo = insumoRepository.findById(registroEntradasActualizado.getInsumo().getCodigo_insumo())
                .orElseThrow(() -> new RuntimeException("Insumo no encontrado"));

        Almacen almacen = almacenRepository.findById(registroEntradasActualizado.getEstante().getUbicacion())
                .orElseThrow(() -> new RuntimeException("Ubicación no encontrado"));


        registroExistente.setInsumo(insumo);
        registroExistente.setEstante(almacen);

        // Guardar los cambios
        RegistroEntradasAlmacen registroGuardado = registroEntradasAlmacenRepository.save(registroExistente);
        return ResponseEntity.ok(registroGuardado);
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarRegistroEntradas(@PathVariable Long id) {
        RegistroEntradasAlmacen registroExistente = registroEntradasAlmacenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Registro de entradas no encontrado"));

        // Eliminar el registro
        registroEntradasAlmacenRepository.delete(registroExistente);
        return ResponseEntity.noContent().build();
    }
}
