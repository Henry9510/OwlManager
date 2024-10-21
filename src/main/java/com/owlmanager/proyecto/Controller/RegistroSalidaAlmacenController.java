//package com.owlmanager.proyecto.Controller;
//
//import com.owlmanager.proyecto.Repository.AlmacenRepository;
//import com.owlmanager.proyecto.Repository.InsumoRepository;
//import com.owlmanager.proyecto.Repository.ProyectoRepository;
//import com.owlmanager.proyecto.Repository.SalidasRepository;
//import com.owlmanager.proyecto.exception.InsumoNotFoundException;
//import com.owlmanager.proyecto.exception.ProyectoNotFoundException;
//import com.owlmanager.proyecto.exception.RegistroNoEncontradoException;
//import com.owlmanager.proyecto.model.Almacen;
//import com.owlmanager.proyecto.model.Insumos;
//import com.owlmanager.proyecto.model.Proyecto;
//import com.owlmanager.proyecto.model.RegistroTransferenciaProyecto;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/api/registro-salidas-almacen")
//@CrossOrigin(origins = "http://127.0.0.1:5500")
//public class RegistroSalidaAlmacenController {
//
//    private final SalidasRepository registroSalidasAlmacenRepository;
//    private final InsumoRepository insumoRepository;
//    private final ProyectoRepository proyectoRepository;
//    private final AlmacenRepository almacenRepository;
//
//    @Autowired
//    public RegistroSalidaAlmacenController(SalidasRepository registroSalidasAlmacenRepository,
//                                           InsumoRepository insumoRepository,
//                                           ProyectoRepository proyectoRepository,
//                                           AlmacenRepository almacenRepository) {
//        this.registroSalidasAlmacenRepository = registroSalidasAlmacenRepository;
//        this.insumoRepository = insumoRepository;
//        this.proyectoRepository = proyectoRepository;
//        this.almacenRepository = almacenRepository;
//    }
//
//    @GetMapping
//    public List<RegistroTransferenciaProyecto> obtenerRegistroSalidas() {
//        return registroSalidasAlmacenRepository.findAll();
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<RegistroTransferenciaProyecto> obtenerRegistroSalida(@PathVariable Long id) {
//        return registroSalidasAlmacenRepository.findById(id)
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
//    }
//
//    @PostMapping
//    public ResponseEntity<RegistroTransferenciaProyecto> guardarRegistroSalidas(
//            @RequestBody RegistroTransferenciaProyecto registroTransferencia) {
//
//        List<InsumoTransferido> insumosTransferidos = new ArrayList<>();
//
//        for (InsumoTransferido insumoTransferido : registroTransferencia.getInsumosTransferidos()) {
//            Insumos insumoEncontrado = insumoRepository.findById(insumoTransferido.getInsumo().getCodigo_insumo())
//                    .orElseThrow(() -> new InsumoNotFoundException("Insumo no encontrado con código: " + insumoTransferido.getInsumo().getCodigo_insumo()));
//
//            // Recupera la cantidad de salida desde la entidad InsumoTransferido
//            int cantidadSalida = insumoTransferido.getCantidad_salida();
//
//            // Actualiza el stock en Almacen
//            Almacen almacen = almacenRepository.findByCodigoInsumo(insumoTransferido.getInsumo().getCodigo_insumo());
//            if (almacen != null && almacen.getStock() >= cantidadSalida) {
//                almacen.setStock(almacen.getStock() - cantidadSalida);
//                almacenRepository.save(almacen);
//            } else {
//                throw new RuntimeException("Stock insuficiente para el insumo: " + insumoTransferido.getInsumo().getCodigo_insumo());
//            }
//
//            insumosTransferidos.add(insumoTransferido);
//        }
//
//        // Asigna los insumos transferidos actualizados al registro de transferencia
//        registroTransferencia.setInsumosTransferidos(insumosTransferidos);
//
//        Proyecto proyecto = proyectoRepository.findById(registroTransferencia.getProyecto().getCodigo_proyecto())
//                .orElseThrow(() -> new ProyectoNotFoundException("Proyecto no encontrado"));
//
//        registroTransferencia.setProyecto(proyecto);
//
//        // Guarda el registro de transferencia
//        RegistroTransferenciaProyecto savedRegistro = registroSalidasAlmacenRepository.save(registroTransferencia);
//        return ResponseEntity.status(HttpStatus.CREATED).body(savedRegistro);
//    }
//
//
//
//    @PutMapping("/{id}")
//    public ResponseEntity<RegistroTransferenciaProyecto> actualizarRegistroSalidas(@PathVariable Long id,
//                                                                                   @RequestBody RegistroTransferenciaProyecto registroActualizado) {
//        RegistroTransferenciaProyecto registroExistente = registroSalidasAlmacenRepository.findById(id)
//                .orElseThrow(() -> new RegistroNoEncontradoException("Registro de salidas no encontrado"));
//
//        registroExistente.setCantidad_salida(registroActualizado.getCantidad_salida());
//        registroExistente.setFecha(registroActualizado.getFecha());
//
//        // Aquí puedes agregar lógica para actualizar el stock si es necesario
//
//        RegistroTransferenciaProyecto registroGuardado = registroSalidasAlmacenRepository.save(registroExistente);
//        return ResponseEntity.ok(registroGuardado);
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> eliminarRegistroSalidas(@PathVariable Long id) {
//        RegistroTransferenciaProyecto registroExistente = registroSalidasAlmacenRepository.findById(id)
//                .orElseThrow(() -> new RegistroNoEncontradoException("Registro de salidas no encontrado"));
//
//        registroSalidasAlmacenRepository.delete(registroExistente);
//        return ResponseEntity.noContent().build();
//    }
//}
