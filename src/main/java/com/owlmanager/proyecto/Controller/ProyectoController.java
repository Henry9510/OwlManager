package com.owlmanager.proyecto.Controller;

import java.util.List;
import java.util.Optional;

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

    private final ProyectoRepository repositorio;

    public ProyectoController(ProyectoRepository repositorio) {
        this.repositorio = repositorio;
    }

    @GetMapping("/api/proyecto")
    public List<Proyecto> obtenerProyectos() {
        return repositorio.findAll();
    }

    @GetMapping("/api/proyecto/{id}")
    public ResponseEntity<Proyecto> obtenerProyecto(@PathVariable Long id) {
        Optional<Proyecto> opt = repositorio.findById(id);
        return opt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping("/api/proyecto")
    public ResponseEntity<Proyecto> guardarProyecto(@RequestBody Proyecto proyecto) {
        Proyecto savedProyecto = repositorio.save(proyecto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProyecto);
    }

    @PutMapping("/api/proyecto/{id}")
    public ResponseEntity<Proyecto> actualizarProyecto(@PathVariable Long id, @RequestBody Proyecto proyecto) {
        // Check if the project with the given ID exists
        if (!repositorio.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        // Retrieve the existing project
        Proyecto existingProyecto = repositorio.findById(id).orElse(null);

        if (existingProyecto == null) {
            return ResponseEntity.notFound().build();
        }

        // Update the existing project with new values
        existingProyecto.setCodigo_proyecto(proyecto.getCodigo_proyecto());
        existingProyecto.setDescripcion_proyecto(proyecto.getDescripcion_proyecto()); // Asegúrate de que este método exista
        existingProyecto.setFecha_inicio(proyecto.getFecha_inicio()); // Asegúrate de que este método exista
        existingProyecto.setFecha_fin(proyecto.getFecha_fin()); // Asegúrate de que este método exista
        existingProyecto.setHoras_estimadas(proyecto.getHoras_estimadas()); // Asegúrate de que este método exista

        // Save the updated project
        Proyecto updatedProyecto = repositorio.save(existingProyecto);

        // Return the updated project with an HTTP 200 OK status
        return ResponseEntity.ok(updatedProyecto);
    }

    @DeleteMapping("/api/proyecto/{id}")
    public ResponseEntity<Void> borrarProyecto(@PathVariable Long id) {
        if (id == null || !repositorio.existsById(id)) {
            return ResponseEntity.badRequest().build();
        }

        repositorio.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
