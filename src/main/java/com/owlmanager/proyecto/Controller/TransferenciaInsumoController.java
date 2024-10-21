package com.owlmanager.proyecto.Controller;

import com.owlmanager.proyecto.model.RegistroEntradasAlmacen;
import com.owlmanager.proyecto.model.RegistroTransferenciaProyecto;
import com.owlmanager.proyecto.service.TransferenciaInsumoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/transferencias")
public class TransferenciaInsumoController {

    @Autowired
    private TransferenciaInsumoService transferenciaInsumoService;

    @PostMapping("/salida")
    public ResponseEntity<RegistroTransferenciaProyecto> registrarSalida(@RequestBody RegistroTransferenciaProyecto transferencia) {
        transferenciaInsumoService.registrarSalida(transferencia);
        return ResponseEntity.status(HttpStatus.CREATED).body(transferencia);
    }

    @PostMapping("/entrada")
    public ResponseEntity<RegistroEntradasAlmacen> registrarEntrada(@RequestBody RegistroEntradasAlmacen entrada) {
        transferenciaInsumoService.registrarEntrada(entrada);
        return ResponseEntity.status(HttpStatus.CREATED).body(entrada);
    }
}