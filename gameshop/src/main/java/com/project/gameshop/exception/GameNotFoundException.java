package com.project.gameshop.exception;

public class GameNotFoundException extends RuntimeException {
    public GameNotFoundException(Long id) {
        super("No se pudo encontrar el juego con id " + id);
    }
}

