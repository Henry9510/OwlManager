//package com.owlmanager.proyecto.Controller;
//
//import java.util.List;
//import java.util.Optional;
//
//import com.owlmanager.proyecto.model.Almacen;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.owlmanager.proyecto.Repository.AlmacenRepository;
//import com.owlmanager.proyecto.Repository.EntradasRepository;
//import com.owlmanager.proyecto.Repository.InsumoRepository;
//import com.owlmanager.proyecto.model.Insumos;
//import com.owlmanager.proyecto.model.RegistroEntradasAlmacen;
//
//@RestController
//@RequestMapping("/api/registro-entradas-almacen")
//public class RegistroEntradaAlmacenController {
//
//    private final EntradasRepository registroEntradasAlmacenRepository;
//    private final AlmacenRepository almacenRepository;
//
//    @Autowired
//    public RegistroEntradaAlmacenController(EntradasRepository registroEntradasAlmacenRepository,
//            InsumoRepository insumoRepository,
//            AlmacenRepository almacenRepository) {
//        this.registroEntradasAlmacenRepository = registroEntradasAlmacenRepository;
//        this.almacenRepository = almacenRepository;
//    }
//
//    @GetMapping
//    public List<RegistroEntradasAlmacen> obtenerRegistroEntradaAlmacen() {
//        return registroEntradasAlmacenRepository.findAll();
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<RegistroEntradasAlmacen> obtenerRegistroEntrada(@PathVariable Long id) {
//        Optional<RegistroEntradasAlmacen> opt = registroEntradasAlmacenRepository.findById(id);
//        return opt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
//
//    }
//
//    @CrossOrigin(origins = "http://127.0.0.1:5500")
//    @PostMapping
//    public ResponseEntity<RegistroEntradasAlmacen> guardarRegistroEntradas(@RequestBody RegistroEntradasAlmacen registroEntradasAlmacen) {
//
//        // Verificar que la ubicación existe en Almacen
//        Almacen almacenUbi = almacenRepository.findById(registroEntradasAlmacen.getUbicacion())
//                .orElseThrow(() -> new RuntimeException("Ubicacion no encontrada"));
//
//        // Asignar la ubicación al registro de entradas
//        registroEntradasAlmacen.setEstante(almacenUbi);
//
//        // Guardar el registro de entradas en la base de datos
//        RegistroEntradasAlmacen savedRegistro = registroEntradasAlmacenRepository.save(registroEntradasAlmacen);
//
//        // Retornar una respuesta con el registro creado y el código 201 CREATED
//        return ResponseEntity.status(HttpStatus.CREATED).body(savedRegistro);
//    }
//
//
//
//    @CrossOrigin(origins = "http://127.0.0.1:5500")
//    @PutMapping("/{id}")
//    public ResponseEntity<RegistroEntradasAlmacen> actualizarRegistroEntradas(@PathVariable Long id,
//                                                                              @RequestBody RegistroEntradasAlmacen registroEntradasActualizado) {
//
//        // Verificar que el registro de entradas existe
//        RegistroEntradasAlmacen registroExistente = registroEntradasAlmacenRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Registro de entradas no encontrado"));
//
//        // Actualizar los campos
//        registroExistente.setCantidad_entrada(registroEntradasActualizado.getCantidad_entrada());
//        registroExistente.setFecha(registroEntradasActualizado.getFecha());
//
//        // Verificar y asignar el estante
//        Almacen almacen = almacenRepository.findById(registroEntradasActualizado.getEstante().getUbicacion())
//                .orElseThrow(() -> new RuntimeException("Estante no encontrado"));
//
//        registroExistente.setEstante(almacen);
//
//        // Guardar el registro actualizado en la base de datos
//        RegistroEntradasAlmacen registroGuardado = registroEntradasAlmacenRepository.save(registroExistente);
//
//        // Retornar el registro actualizado
//        return ResponseEntity.ok(registroGuardado);
//    }
//
//    @CrossOrigin(origins = "http://127.0.0.1:5500")
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> eliminarRegistroEntradas(@PathVariable Long id) {
//        RegistroEntradasAlmacen registroExistente = registroEntradasAlmacenRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Registro de entradas no encontrado"));
//
//        // Eliminar el registro
//        registroEntradasAlmacenRepository.delete(registroExistente);
//        return ResponseEntity.noContent().build();
//    }
//}
