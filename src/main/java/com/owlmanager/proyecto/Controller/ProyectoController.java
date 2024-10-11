package com.owlmanager.proyecto.Controller;

import java.util.List;
import java.util.Optional;

import com.owlmanager.proyecto.Repository.EstadoRepository;
import com.owlmanager.proyecto.Repository.ProyectoRepository;
import com.owlmanager.proyecto.model.Proyecto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500") // Aplica CrossOrigin a toda la clase
public class ProyectoController {

    private final ProyectoRepository proyectoRepository;
    private final EstadoRepository estadoRepository;

    public ProyectoController(ProyectoRepository repositorio, EstadoRepository estadoRepository) {
        this.proyectoRepository = repositorio;
        this.estadoRepository = estadoRepository;
    }

    // Obtener todos los proyectos
    @GetMapping("/api/proyecto")
    public List<Proyecto> obtenerProyectos() {
        return proyectoRepository.findAll();
    }

    // Obtener proyecto por ID
    @GetMapping("/api/proyecto/{id}")
    public ResponseEntity<Proyecto> obtenerProyecto(@PathVariable Long id) {
        Optional<Proyecto> opt = proyectoRepository.findById(id);
        return opt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Obtener proyectos por estado




    // Guardar un nuevo proyecto
    @PostMapping("/api/proyecto")
    public ResponseEntity<Proyecto> guardarProyecto(@RequestBody Proyecto proyecto) {
        Proyecto savedProyecto = proyectoRepository.save(proyecto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProyecto);
    }

    // Actualizar un proyecto existente
    @PutMapping("/api/proyecto/{id}")
    public ResponseEntity<Proyecto> actualizarProyecto(@PathVariable Long id, @RequestBody Proyecto proyecto) {
        // Verifica si existe el proyecto con el ID dado
        if (!proyectoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        // Recuperar el proyecto existente
        Proyecto existingProyecto = proyectoRepository.findById(id).orElse(null);

        if (existingProyecto == null) {
            return ResponseEntity.notFound().build();
        }

        // Actualizar el proyecto con nuevos valores
        existingProyecto.setCodigo_proyecto(proyecto.getCodigo_proyecto());
        existingProyecto.setDescripcion_proyecto(proyecto.getDescripcion_proyecto());
        existingProyecto.setFecha_inicio(proyecto.getFecha_inicio());
        existingProyecto.setFecha_fin(proyecto.getFecha_fin());
        existingProyecto.setHoras_estimadas(proyecto.getHoras_estimadas());
        existingProyecto.setHoras_reales(proyecto.getHoras_reales());
        existingProyecto.setEstado_proyecto(proyecto.getEstado_proyecto());

        // Guardar el proyecto actualizado
        Proyecto updatedProyecto = proyectoRepository.save(existingProyecto);

        // Retornar el proyecto actualizado con estado HTTP 200 OK
        return ResponseEntity.ok(updatedProyecto);
    }

    // Eliminar un proyecto
    @DeleteMapping("/api/proyecto/{id}")
    public ResponseEntity<Void> borrarProyecto(@PathVariable Long id) {
        if (id == null || !proyectoRepository.existsById(id)) {
            return ResponseEntity.badRequest().build();
        }

        proyectoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}