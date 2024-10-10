package com.owlmanager.proyecto.Controller;

import com.owlmanager.proyecto.Repository.UnidadesRepository;
import com.owlmanager.proyecto.model.Unidades;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/unidades")
public class UnidadesController {

    private final UnidadesRepository unidadesRepository;

    // Constructor para la inyección de dependencias
    public UnidadesController(UnidadesRepository unidadesRepository) {
        this.unidadesRepository = unidadesRepository;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @GetMapping
    public List<Unidades> obtenerUnidades() {
        return unidadesRepository.findAll();
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @GetMapping("/{codigo_unidad}")
    public ResponseEntity<Unidades> obtenerUnidad(@PathVariable Long codigo_unidad) {
        Optional<Unidades> opt = unidadesRepository.findById(codigo_unidad);
        return opt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @PostMapping
    public ResponseEntity<Unidades> crearUnidad(@RequestBody Unidades nuevaUnidad) {
        // Guardar la nueva unidad en la base de datos
        Unidades unidadGuardada = unidadesRepository.save(nuevaUnidad);
        return ResponseEntity.status(HttpStatus.CREATED).body(unidadGuardada);
    }

}






