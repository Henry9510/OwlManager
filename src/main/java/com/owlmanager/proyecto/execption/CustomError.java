package com.owlmanager.proyecto.execption;

public class CustomError extends RuntimeException {
  public CustomError(String message) {
    super(message);
  }
}