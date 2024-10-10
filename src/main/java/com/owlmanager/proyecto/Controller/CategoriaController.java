package com.owlmanager.proyecto.Controller;

import com.owlmanager.proyecto.Repository.CategoriasRepository;
import com.owlmanager.proyecto.model.Categoria;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    private final CategoriasRepository categoriasRepository;

    // Constructor para inyección de dependencias
    public CategoriaController(CategoriasRepository categoriasRepository) {
        this.categoriasRepository = categoriasRepository;
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @GetMapping
    public List<Categoria> obtenerCategorias() {
        return categoriasRepository.findAll();
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @GetMapping("/{codigo_categoria}")
    public ResponseEntity<Categoria> obtenerCategoria(@PathVariable Long codigo_categoria) {
        Optional<Categoria> opt = categoriasRepository.findById(codigo_categoria);
        return opt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @PostMapping
    public ResponseEntity<Categoria> crearCategoria(@RequestBody Categoria nuevaCategoria) {
        // Guardar la nueva categoría en la base de datos
        Categoria categoriaGuardada = categoriasRepository.save(nuevaCategoria);
        return ResponseEntity.status(HttpStatus.CREATED).body(categoriaGuardada);
    }

}
