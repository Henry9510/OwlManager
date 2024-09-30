package com.owlmanager.proyecto.Controller;


import com.owlmanager.proyecto.Dtos.dtosHoras;
import com.owlmanager.proyecto.Repository.EmpleadoRepository;
import com.owlmanager.proyecto.Repository.ProyectoRepository;
import com.owlmanager.proyecto.Repository.RegistroHorasRepository;
import com.owlmanager.proyecto.model.Empleado;
import com.owlmanager.proyecto.model.Insumos;
import com.owlmanager.proyecto.model.Proyecto;
import com.owlmanager.proyecto.model.RegistroHoras;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/registro-horas")
public class RegistroHorasController {

    private final RegistroHorasRepository registroHorasRepository;
    private final EmpleadoRepository empleadoRepository;
    private final ProyectoRepository proyectoRepository;

    public RegistroHorasController(RegistroHorasRepository registroHorasRepository,
                                   EmpleadoRepository empleadoRepository,
                                   ProyectoRepository proyectoRepository) {
        this.registroHorasRepository = registroHorasRepository;
        this.empleadoRepository = empleadoRepository;
        this.proyectoRepository = proyectoRepository;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @PostMapping
    public ResponseEntity<RegistroHoras> guardarRegistroHoras(@RequestBody RegistroHoras registroHoras) {
        Empleado empleado = empleadoRepository.findById(registroHoras.getEmpleado().getCedula())
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));

        Proyecto proyecto = proyectoRepository.findById(registroHoras.getProyecto().getCodigo_proyecto())
                .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));

        registroHoras.setEmpleado(empleado);
        registroHoras.setProyecto(proyecto);

        RegistroHoras savedRegistro = registroHorasRepository.save(registroHoras);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRegistro);
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @GetMapping
    public List<RegistroHoras> obtenerRegistroHoras() {
        return registroHorasRepository.findAll();
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @GetMapping("/{id}")
    public ResponseEntity<RegistroHoras> obtenerRegistro(@PathVariable Long id) {
        Optional<RegistroHoras> opt = registroHorasRepository.findById(id);
        return opt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @PutMapping("/{id}")
    public ResponseEntity<RegistroHoras> actualizarRegistroHoras(@PathVariable Long id, @RequestBody RegistroHoras registroHorasActualizado) {
        RegistroHoras registroExistente = registroHorasRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Registro de horas no encontrado"));

        // Actualizar campos del registro
        registroHorasActualizado.setFecha(registroExistente.getFecha());
        registroExistente.setHoras_trabajadas(registroHorasActualizado.getHoras_trabajadas());

        // Validar y asignar el empleado
        Empleado empleado = empleadoRepository.findById(registroHorasActualizado.getEmpleado().getCedula())
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));
        registroExistente.setEmpleado(empleado);

        // Validar y asignar el proyecto
        Proyecto proyecto = proyectoRepository.findById(registroHorasActualizado.getProyecto().getCodigo_proyecto())
                .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));
        registroExistente.setProyecto(proyecto);

        // Guardar los cambios
        RegistroHoras registroGuardado = registroHorasRepository.save(registroExistente);
        return ResponseEntity.ok(registroGuardado);
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarRegistroHoras(@PathVariable Long id) {
        RegistroHoras registroExistente = registroHorasRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Registro de horas no encontrado"));

        // Eliminar el registro
        registroHorasRepository.delete(registroExistente);
        return ResponseEntity.noContent().build();
    }
}


