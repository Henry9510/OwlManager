package com.owlmanager.proyecto.Controller;


import com.owlmanager.proyecto.Repository.AlmacenRepository;
import com.owlmanager.proyecto.Repository.InsumosRepository;
import com.owlmanager.proyecto.model.Almacen;
import com.owlmanager.proyecto.model.Insumos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/almacen")
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"})
public class AlmacenController {

    @Autowired
    private final AlmacenRepository almacenRepository;

    @Autowired
    private final InsumosRepository insumoRepository;

    public AlmacenController(AlmacenRepository almacenRepository, InsumosRepository insumoRepository) {
        this.almacenRepository = almacenRepository;
        this.insumoRepository = insumoRepository;
    }

    @GetMapping
    public List<Almacen> obtenerAlmacen() {
        return almacenRepository.findAll();
    }

    @GetMapping("/{ubicacion}")
    public ResponseEntity<Almacen> obtenerAlmacen(@PathVariable long ubicacion) {
        return almacenRepository.findById(ubicacion)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<Almacen> registrarAlmacen(@RequestBody Almacen almacen) {
        Insumos insumo = insumoRepository.findById(almacen.getCodigo_insumo().getCodigo_insumo())
                .orElseThrow(() -> new RuntimeException("Insumo no encontrado"));

        almacen.setCodigo_insumo(insumo);
        Almacen savedAlmacen = almacenRepository.save(almacen);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAlmacen);
    }

    @PutMapping("/{ubicacion}")
    public ResponseEntity<Almacen> actualizarAlmacen(@PathVariable long ubicacion, @RequestBody Almacen almacenActualizado) {
        // Verificar que el almacén existe
        Almacen almacenExistente = almacenRepository.findById(ubicacion)
                .orElseThrow(() -> new RuntimeException("Almacen no encontrado"));

        // Actualizar campos, sin cambiar la ubicación
        almacenExistente.setStatus(almacenActualizado.getStatus());
        almacenExistente.setStock(almacenActualizado.getStock());

        // Actualizar insumo
        Insumos insumo = insumoRepository.findById(almacenActualizado.getCodigo_insumo().getCodigo_insumo())
                .orElseThrow(() -> new RuntimeException("Insumo no encontrado"));
        almacenExistente.setCodigo_insumo(insumo);

        // Guardar cambios
        Almacen almacenGuardado = almacenRepository.save(almacenExistente);

        // Devolver la respuesta con el objeto actualizado
        return ResponseEntity.ok(almacenGuardado);
    }


    @DeleteMapping("/{ubicacion}")
    public ResponseEntity<Void> eliminarAlmacen(@PathVariable long ubicacion) {
        if (almacenRepository.existsById(ubicacion)) {
            almacenRepository.deleteById(ubicacion);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/insumo/{codigo}")
    public ResponseEntity<List<Almacen>> buscarPorCodigoInsumo(@PathVariable Long codigo) {
        System.out.println("Código de insumo recibido: " + codigo); // Agrega este log
        List<Almacen> almacenList = almacenRepository.findByCodigo_insumo_Codigo_insumo(codigo);

        if (almacenList.isEmpty()) {
            return ResponseEntity.notFound().build(); // Retorna 404 si no se encuentra
        }

        return ResponseEntity.ok(almacenList); // Retorna 200 y la lista encontrada
    }

    @PutMapping("/insumo/{codigo}")
    public ResponseEntity<Almacen> actualizarStock(@PathVariable Long codigo, @RequestBody Almacen nuevoAlmacen) {
        // Verificar si el insumo existe en el almacén
        List<Almacen> almacenList = almacenRepository.findByCodigo_insumo_Codigo_insumo(codigo);

        if (almacenList.isEmpty()) {
            return ResponseEntity.notFound().build(); // Retorna 404 si no se encuentra
        }

        // Suponiendo que solo hay un insumo con ese código, puedes tomar el primero
        Almacen almacenExistente = almacenList.get(0);

        // Actualizar el stock (o cualquier otro campo que necesites)
        almacenExistente.setStock(nuevoAlmacen.getStock());

        // Guardar los cambios en la base de datos
        almacenRepository.save(almacenExistente);

        return ResponseEntity.ok(almacenExistente); // Retorna 200 y el insumo actualizado
    }

}