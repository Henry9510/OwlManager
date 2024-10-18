package com.owlmanager.proyecto.exception;

public class InsumoNotFoundException extends RuntimeException {
    public InsumoNotFoundException(String message) {
        super(message);
    }
}