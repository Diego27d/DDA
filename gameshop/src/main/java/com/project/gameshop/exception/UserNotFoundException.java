package com.project.gameshop.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super("No se encontró el usuario con id = " + id);
    }

    public UserNotFoundException(String message) {
        super(message);
    }
}
