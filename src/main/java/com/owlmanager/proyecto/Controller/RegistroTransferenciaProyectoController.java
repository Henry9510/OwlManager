package com.owlmanager.proyecto.Controller;

import com.owlmanager.proyecto.model.RegistroTransferenciaProyecto;
import com.owlmanager.proyecto.model.InsumoTransferido;
import com.owlmanager.proyecto.Repository.RegistroTransferenciaProyectoRepository;
import com.owlmanager.proyecto.Repository.InsumosRepository;
import com.owlmanager.proyecto.Repository.ProyectoRepository;
import com.owlmanager.proyecto.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/transferencia-proyecto")
public class RegistroTransferenciaProyectoController {

    private final RegistroTransferenciaProyectoRepository transferenciaRepository;
    private final ProyectoRepository proyectoRepository;
    private final InsumosRepository insumosRepository;

    @Autowired
    public RegistroTransferenciaProyectoController(
            RegistroTransferenciaProyectoRepository transferenciaRepository,
            ProyectoRepository proyectoRepository,
            InsumosRepository insumosRepository) {
        this.transferenciaRepository = transferenciaRepository;
        this.proyectoRepository = proyectoRepository;
        this.insumosRepository = insumosRepository;
    }

    @GetMapping
    public List<RegistroTransferenciaProyecto> obtenerTodasLasTransferencias() {
        return transferenciaRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RegistroTransferenciaProyecto> obtenerTransferenciaPorId(@PathVariable Long id) {
        Optional<RegistroTransferenciaProyecto> transferencia = transferenciaRepository.findById(id);
        return transferencia.map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Transferencia no encontrada con id: " + id));
    }

    @PostMapping
    public ResponseEntity<RegistroTransferenciaProyecto> crearTransferencia(@RequestBody RegistroTransferenciaProyecto transferencia) {
        // Validar que el proyecto exista
        proyectoRepository.findById(transferencia.getProyecto().getCodigo_proyecto())
                .orElseThrow(() -> new ResourceNotFoundException("Proyecto no encontrado"));

        // Validar que cada insumo exista antes de guardarlo
        for (InsumoTransferido insumoTransferido : transferencia.getInsumos()) {
            insumosRepository.findById(insumoTransferido.getInsumo().getCodigo_insumo())
                    .orElseThrow(() -> new ResourceNotFoundException("Insumo no encontrado: " + insumoTransferido.getInsumo().getCodigo_insumo()));
        }

        RegistroTransferenciaProyecto nuevaTransferencia = transferenciaRepository.save(transferencia);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaTransferencia);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RegistroTransferenciaProyecto> actualizarTransferencia(@PathVariable Long id, @RequestBody RegistroTransferenciaProyecto transferenciaActualizada) {
        RegistroTransferenciaProyecto transferenciaExistente = transferenciaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transferencia no encontrada con id: " + id));

        // Actualizar campos de la transferencia
        transferenciaExistente.setFecha(transferenciaActualizada.getFecha());
        transferenciaExistente.setProyecto(transferenciaActualizada.getProyecto());
        transferenciaExistente.setEstado(transferenciaActualizada.getEstado());

        // Validar y actualizar insumos
        for (InsumoTransferido insumoTransferido : transferenciaActualizada.getInsumos()) {
            insumosRepository.findById(insumoTransferido.getInsumo().getCodigo_insumo())
                    .orElseThrow(() -> new ResourceNotFoundException("Insumo no encontrado: " + insumoTransferido.getInsumo().getCodigo_insumo()));
        }

        transferenciaExistente.setInsumos(transferenciaActualizada.getInsumos());
        RegistroTransferenciaProyecto transferenciaGuardada = transferenciaRepository.save(transferenciaExistente);

        return ResponseEntity.ok(transferenciaGuardada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarTransferencia(@PathVariable Long id) {
        RegistroTransferenciaProyecto transferenciaExistente = transferenciaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transferencia no encontrada con id: " + id));

        transferenciaRepository.delete(transferenciaExistente);
        return ResponseEntity.noContent().build();
    }


}
