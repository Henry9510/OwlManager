package com.owlmanager.proyecto.exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InsumoNotFoundException.class)
    public ResponseEntity<String> handleInsumoNotFoundException(InsumoNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ProyectoNotFoundException.class)
    public ResponseEntity<String> handleProyectoNotFoundException(ProyectoNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(RegistroNoEncontradoException.class)
    public ResponseEntity<String> handleRegistroNoEncontradoException(RegistroNoEncontradoException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

}
