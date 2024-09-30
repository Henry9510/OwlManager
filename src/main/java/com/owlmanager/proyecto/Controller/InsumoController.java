package com.owlmanager.proyecto.Controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.owlmanager.proyecto.Repository.CategoriasRepository;
import com.owlmanager.proyecto.Repository.InsumoRepository;
import com.owlmanager.proyecto.model.Categoria;
import com.owlmanager.proyecto.model.Insumos;

@RestController
@RequestMapping("/api/insumos")
public class InsumoController {

    @Autowired
    private final InsumoRepository insumoRepository;

    @Autowired
    private final CategoriasRepository categoriasRepository;

    public InsumoController(InsumoRepository insumoRepository, CategoriasRepository categoriasRepository) {
        this.insumoRepository = insumoRepository;
        this.categoriasRepository = categoriasRepository;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @GetMapping
    public List<Insumos> obtenerInsumos() {
        return insumoRepository.findAll();
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @GetMapping("/{codigo_insumo}")
    public ResponseEntity<Insumos> obtenerInsumo(@PathVariable Long codigo_insumo) {
        Optional<Insumos> opt = insumoRepository.findById(codigo_insumo);
        return opt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }



    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @PostMapping
    public ResponseEntity<Insumos> registrarInsumo(@RequestBody Insumos insumo) {
        Categoria categoria = categoriasRepository.findById(insumo.getCategoria_insumo().getCodigo_categoria().intValue())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        // Asignar la categoría al insumo
        insumo.setCategoria_insumo(categoria);

        // Guardar el insumo en la base de datos
        Insumos savedRegistro = insumoRepository.save(insumo);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRegistro);
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @PutMapping("/{codigo_insumo}")
    public ResponseEntity<Insumos> actualizarInsumo(@PathVariable Long codigo_insumo, @RequestBody Insumos insumoActualizado) {
        // Verificar si el insumo existe
        Insumos insumoExistente = insumoRepository.findById(codigo_insumo)
                .orElseThrow(() -> new RuntimeException("Insumo no encontrado"));

        // Actualizar los campos
        insumoExistente.setNumero_parte(insumoActualizado.getNumero_parte());
        insumoExistente.setNombre(insumoActualizado.getNombre());
        insumoExistente.setProcedencia(insumoActualizado.getProcedencia());

        // Actualizar la categoría
        Categoria categoria = categoriasRepository.findById(insumoActualizado.getCategoria_insumo().getCodigo_categoria().intValue())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
        insumoExistente.setCategoria_insumo(categoria);

        // Guardar los cambios en la base de datos
        Insumos insumoGuardado = insumoRepository.save(insumoExistente);
        return ResponseEntity.ok(insumoGuardado);
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @DeleteMapping("/{codigo_insumo}")
    public ResponseEntity<Void> eliminarInsumo(@PathVariable Long codigo_insumo) {
        // Verificar si el insumo existe
        Insumos insumoExistente = insumoRepository.findById(codigo_insumo)
                .orElseThrow(() -> new RuntimeException("Insumo no encontrado"));

        // Eliminar el insumo
        insumoRepository.delete(insumoExistente);
        return ResponseEntity.noContent().build();
    }
}





