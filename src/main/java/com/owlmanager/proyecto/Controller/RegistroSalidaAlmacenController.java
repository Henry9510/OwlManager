package com.owlmanager.proyecto.Controller;

import com.owlmanager.proyecto.Repository.*;
import com.owlmanager.proyecto.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/registro-salidas-almacen")
public class RegistroSalidaAlmacenController {

    private final SalidasRepository registroSalidasAlmacenRepository;
    private final InsumoRepository insumoRepository;
    private final ProyectoRepository proyectoRepository;

    @Autowired
    public RegistroSalidaAlmacenController(SalidasRepository registroSalidasAlmacenRepository,
                                           InsumoRepository insumoRepository,
                                           ProyectoRepository proyectoRepository) {
        this.registroSalidasAlmacenRepository = registroSalidasAlmacenRepository;
        this.insumoRepository = insumoRepository;
        this.proyectoRepository = proyectoRepository;
    }

    @GetMapping
    public List<RegistroTransferenciaProyecto> obtenerRegistroSalidas() {
        return registroSalidasAlmacenRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RegistroTransferenciaProyecto> obtenerRegistroSalida(@PathVariable Long id) {
        Optional<RegistroTransferenciaProyecto> opt = registroSalidasAlmacenRepository.findById(id);
        return opt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @PostMapping
    public ResponseEntity<RegistroTransferenciaProyecto> guardarRegistroSalidas(@RequestBody RegistroTransferenciaProyecto registroTransferencia) {
        // Fetch the Insumo based on the provided codigo_insumo
        Insumos insumos = insumoRepository.findById(registroTransferencia.getInsumo().getCodigo_insumo())
                .orElseThrow(() -> new RuntimeException("Insumo no encontrado"));

        Proyecto proyecto = proyectoRepository.findById(registroTransferencia.getProyecto().getCodigo_proyecto())
                .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));

        // Set the fetched Insumos into RegistroTransferenciaProyecto
        registroTransferencia.setInsumo(insumos);
        registroTransferencia.setProyecto(proyecto);

        // Save the RegistroTransferenciaProyecto entity
        RegistroTransferenciaProyecto savedRegistro = registroSalidasAlmacenRepository.save(registroTransferencia);


        // Return a response with status CREATED
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRegistro);
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @PutMapping("/{id}")
    public ResponseEntity<RegistroTransferenciaProyecto> actualizarRegistroSalidas(@PathVariable Long id,
                                                                                   @RequestBody RegistroTransferenciaProyecto registroActualizado) {
        RegistroTransferenciaProyecto registroExistente = registroSalidasAlmacenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Registro de salidas no encontrado"));

        // Actualizar campos del registro
        registroExistente.setCantidad_salida(registroActualizado.getCantidad_salida());
        registroExistente.setFecha(registroActualizado.getFecha());

        // Validar y asignar el insumo
        Insumos insumo = insumoRepository.findById(registroActualizado.getInsumo().getCodigo_insumo())
                .orElseThrow(() -> new RuntimeException("Insumo no encontrado"));

        Proyecto proyecto = proyectoRepository.findById(registroActualizado.getProyecto().getCodigo_proyecto())
                .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));


        registroExistente.setInsumo(insumo);
        registroExistente.setProyecto(proyecto);

        // Guardar los cambios
        RegistroTransferenciaProyecto registroGuardado = registroSalidasAlmacenRepository.save(registroExistente);
        return ResponseEntity.ok(registroGuardado);
    }


@CrossOrigin(origins = "http://127.0.0.1:5500")
@DeleteMapping("/{id}")
public ResponseEntity<Void> eliminarRegistroSalidas(@PathVariable Long id) {
    RegistroTransferenciaProyecto registroExistente = registroSalidasAlmacenRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Registro de salidas no encontrado"));

    // Eliminar el registro
    registroSalidasAlmacenRepository.delete(registroExistente);
    return ResponseEntity.noContent().build();
}
}