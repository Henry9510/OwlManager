package com.owlmanager.proyecto.Controller;

import com.owlmanager.proyecto.Repository.AlmacenRepository;
import com.owlmanager.proyecto.Repository.RegistroEntradasAlmacenRepository;
import com.owlmanager.proyecto.exception.ResourceNotFoundException;
import com.owlmanager.proyecto.model.InsumoAlmacenado;
import com.owlmanager.proyecto.model.RegistroTransferenciaAlmacen;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/transferencia-almacen")
public class RegistroTransferenciaAlmacenController {

    private final RegistroEntradasAlmacenRepository registroEntradasAlmacenRepository;
    private final AlmacenRepository almacenRepository;

    @Autowired
    public RegistroTransferenciaAlmacenController(
            RegistroEntradasAlmacenRepository registroEntradasAlmacenRepository,
            AlmacenRepository almacenRepository) {
        this.registroEntradasAlmacenRepository = registroEntradasAlmacenRepository;
        this.almacenRepository = almacenRepository;
    }

    @GetMapping
    public List<RegistroTransferenciaAlmacen> obtenerTodasLasTransferencias() {
        return registroEntradasAlmacenRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RegistroTransferenciaAlmacen> obtenerTransferenciaPorId(@PathVariable Long id) {
        Optional<RegistroTransferenciaAlmacen> transferencia = registroEntradasAlmacenRepository.findById(id);
        return transferencia.map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Transferencia no encontrada con id: " + id));
    }

    @PostMapping
    public ResponseEntity<RegistroTransferenciaAlmacen> crearRegistroEntrada(@RequestBody RegistroTransferenciaAlmacen entrada) {
        // Validar que cada ubicación del estante exista en Almacen
        for (InsumoAlmacenado insumoAlmacenado : entrada.getInsumos()) {
            almacenRepository.findById(insumoAlmacenado.getEstante().getUbicacion())
                    .orElseThrow(() -> new ResourceNotFoundException("Ubicación no encontrada: " + insumoAlmacenado.getEstante().getUbicacion()));
        }

        // Guardar el registro de entrada en la base de datos
        RegistroTransferenciaAlmacen nuevoRegistroEntrada = registroEntradasAlmacenRepository.save(entrada);

        // Responder con el nuevo registro y un estado 201 (CREATED)
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoRegistroEntrada);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RegistroTransferenciaAlmacen> actualizarRegistroEntrada(
            @PathVariable Long id, @RequestBody RegistroTransferenciaAlmacen detallesEntrada) {

        // Buscar el registro existente
        RegistroTransferenciaAlmacen entradaExistente = registroEntradasAlmacenRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transferencia no encontrada con id: " + id));

        // Validar que cada ubicación del estante existe en Almacen
        for (InsumoAlmacenado insumoAlmacenado : detallesEntrada.getInsumos()) {
            almacenRepository.findById(insumoAlmacenado.getEstante().getUbicacion())
                    .orElseThrow(() -> new ResourceNotFoundException("Ubicación no encontrada: " + insumoAlmacenado.getEstante().getUbicacion()));
        }

        // Actualizar los campos de la entrada existente con los nuevos datos
        entradaExistente.setFecha(detallesEntrada.getFecha());
        entradaExistente.setInsumos(detallesEntrada.getInsumos());
        entradaExistente.setEstado(detallesEntrada.getEstado());

        // Guardar la entrada actualizada
        RegistroTransferenciaAlmacen entradaActualizada = registroEntradasAlmacenRepository.save(entradaExistente);
        return ResponseEntity.ok(entradaActualizada);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarRegistroEntrada(@PathVariable Long id) {
        RegistroTransferenciaAlmacen entradaExistente = registroEntradasAlmacenRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transferencia no encontrada con id: " + id));

        // Eliminar la entrada existente
        registroEntradasAlmacenRepository.delete(entradaExistente);
        return ResponseEntity.noContent().build();
    }


}
