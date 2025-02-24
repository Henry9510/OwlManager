package com.owlmanager.proyecto.Controller;

import java.util.List;
import java.util.Optional;


import com.owlmanager.proyecto.Repository.EmpleadoRepository;
import com.owlmanager.proyecto.model.Empleado;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
public class EmpleadoController {
    private final EmpleadoRepository repositorio;

    public EmpleadoController(EmpleadoRepository repositorio) {
        this.repositorio = repositorio;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @GetMapping("/api/empleado")
    public List<Empleado> obtenerEmpleados() {
        return repositorio.findAll();
    }



    @CrossOrigin(origins = "*")
    @GetMapping("/api/empleado/{id}")
    public ResponseEntity<Empleado> obtenerEmpleado(@PathVariable Long id) {
        Optional<Empleado> opt = repositorio.findById(id);
        return opt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping("/api/empleado")
    public ResponseEntity<?> guardarEmpleado(@RequestBody Empleado empleado) {
        Empleado savedEmpleado = repositorio.save(empleado);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEmpleado);


    }



    @PutMapping("/api/empleado/{id}")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public ResponseEntity<Empleado> actualizarEmpleado(@PathVariable Long id, @RequestBody Empleado empleadoActualizado) {
        // Verificar si el empleado existe
        if (!repositorio.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        // Obtener el empleado existente
        Empleado existingEmpleado = repositorio.findById(id).orElse(null);

        if (existingEmpleado == null) {
            return ResponseEntity.notFound().build();
        }

        // Actualizar el empleado existente con los nuevos valores
        existingEmpleado.setNombre(empleadoActualizado.getNombre());
        existingEmpleado.setSegundo_nombre(empleadoActualizado.getSegundo_nombre());
        existingEmpleado.setApellido(empleadoActualizado.getApellido());
        existingEmpleado.setSegundo_apellido(empleadoActualizado.getSegundo_apellido());
        existingEmpleado.setEdad(empleadoActualizado.getEdad());
        existingEmpleado.setSexo(empleadoActualizado.getSexo());
        existingEmpleado.setDireccion(empleadoActualizado.getDireccion());
        existingEmpleado.setEmail(empleadoActualizado.getEmail());
        existingEmpleado.setCelular(empleadoActualizado.getCelular());
        existingEmpleado.setFecha_ingreso(empleadoActualizado.getFecha_ingreso());
        existingEmpleado.setCargo(empleadoActualizado.getCargo());

        // Guardar los cambios en la base de datos
        Empleado updatedEmpleado = repositorio.save(existingEmpleado);

        return ResponseEntity.ok(updatedEmpleado);
    }


    @DeleteMapping("/api/empleado/{id}")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public ResponseEntity<Void> borrarEmpleado(@PathVariable Long id) {
        if (id == null || !repositorio.existsById(id)) {
            return ResponseEntity.badRequest().build();
        }

        repositorio.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}



