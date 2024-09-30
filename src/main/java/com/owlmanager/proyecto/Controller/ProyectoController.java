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
    public class ProyectoController {

        private final ProyectoRepository repositorio;

        public ProyectoController(ProyectoRepository repositorio) {
            this.repositorio = repositorio;
        }

        @CrossOrigin(origins = "http://127.0.0.1:5500")
        @GetMapping("/api/proyecto")
        public List<Proyecto> obtenerProyecto() {
            return repositorio.findAll();
        }

        @CrossOrigin(origins = "http://127.0.0.1:5500")
        @GetMapping("/api/proyecto/{id}")
        public ResponseEntity<Proyecto> obtenerProyecto(@PathVariable Long id) {
            Optional<Proyecto> opt = repositorio.findById(id);

            return opt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        }

        @PostMapping("/api/proyecto")
        @CrossOrigin(origins = "http://127.0.0.1:5500")
        public ResponseEntity<Proyecto> guardarProyecto(@RequestBody Proyecto proyecto) {
            Proyecto savedProyecto = repositorio.save(proyecto);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedProyecto);
        }



        @PutMapping("/api/proyecto/{id}")
        @CrossOrigin(origins = "http://127.0.0.1:5500")
        public ResponseEntity<Proyecto> actualizarProyecto(@PathVariable Long id, @RequestBody Proyecto Proyecto) {
            // Check if the product with the given ID exists
            if (!repositorio.existsById(id)) {
                return ResponseEntity.notFound().build();
            }

            // Retrieve the existing product
            Proyecto existingProyecto = repositorio.findById(id).orElse(null);

            if (existingProyecto == null) {
                return ResponseEntity.notFound().build();
            }

            // Update the existing product with new values
            existingProyecto.setCodigo_proyecto(Proyecto.getCodigo_proyecto());

            // Save the updated product
            Proyecto updatedProyecto = repositorio.save(existingProyecto);

            // Return the updated product with an HTTP 200 OK status
            return ResponseEntity.ok(updatedProyecto);
        }


        @DeleteMapping("/api/proyecto/{id}")
        @CrossOrigin(origins = "http://127.0.0.1:5500")
        public ResponseEntity<Proyecto> borrarProducto(@PathVariable Long id) {
            if (id == null || !repositorio.existsById(id)) {
                return ResponseEntity.badRequest().build();
            }

            repositorio.deleteById(id);
            return ResponseEntity.noContent().build();
        }
    }



