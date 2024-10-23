package com.owlmanager.proyecto.exception;

public class CustomError extends RuntimeException {
  public CustomError(String message) {
    super(message);
  }
}