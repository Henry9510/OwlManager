//package com.owlmanager.proyecto.service;
//
//import com.owlmanager.proyecto.Repository.AlmacenRepository;
//import com.owlmanager.proyecto.Repository.RegistroTransferenciaProyectoRepository;
//
//import com.owlmanager.proyecto.model.InsumoTransferido;
//
//import com.owlmanager.proyecto.model.Almacen;
//
//import com.owlmanager.proyecto.model.RegistroEntradasAlmacen;
//import com.owlmanager.proyecto.model.RegistroTransferenciaProyecto;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//
//@Service
//public class TransferenciaInsumoService {
//
//    private final RegistroTransferenciaProyectoRepository transferenciaProyectoRepository;
//    private final AlmacenRepository almacenRepository;
//
//    @Autowired
//    public TransferenciaInsumoService(RegistroTransferenciaProyectoRepository transferenciaProyectoRepository,
//                                      AlmacenRepository almacenRepository) {
//        this.transferenciaProyectoRepository = transferenciaProyectoRepository;
//        this.almacenRepository = almacenRepository;
//    }
//
//    @Transactional
//    public void registrarSalida(RegistroTransferenciaProyecto transferencia) {
//        // Guardar la transferencia en la base de datos
//        transferenciaProyectoRepository.save(transferencia);
//
//        // Procesar cada insumo transferido
//        for (InsumoTransferido insumo : transferencia.getInsumos()) {
//            String codigoInsumo = insumo.getInsumo().getCodigo_insumo().toString();
//            System.out.println("Buscando insumo con código: " + codigoInsumo);
//
//            // Buscar el insumo en el almacen
//            Almacen almacen = almacenRepository.findByCodigo_insumo_Codigo_insumo(codigoInsumo)
//                    .orElseThrow(() -> new RuntimeException("Insumo no encontrado con código: " + codigoInsumo));
//
//            // Verificar si hay stock suficiente
//            if (almacen.getStock() >= insumo.getCantidad_salida()) {
//                // Restar el stock de la cantidad de salida
//                almacen.setStock(almacen.getStock() - insumo.getCantidad_salida());
//                almacenRepository.save(almacen);
//            } else {
//                // Lanzar una excepción si el stock es insuficiente
//                throw new RuntimeException("Stock insuficiente para el insumo: " + codigoInsumo);
//            }
//        }
//    }
//
//    @Transactional
//    public void registrarEntrada(RegistroEntradasAlmacen registro) {
//        // Guardar los datos de entrada en el almacén
//        almacenRepository.save(registro.getAlmacen());
//    }
//
//}
