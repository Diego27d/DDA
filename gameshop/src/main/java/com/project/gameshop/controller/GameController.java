package com.project.gameshop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.gameshop.exception.GameNotFoundException;
import com.project.gameshop.model.Game;
import com.project.gameshop.repository.GameRepository;

@RestController
@CrossOrigin("http://localhost:3000")
public class GameController {

    @Autowired
    private GameRepository gameRepository;

    // Crear un nuevo juego (Solo para administradores)
    @PostMapping("/game")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Game createGame(@RequestBody Game newGame) {
        return gameRepository.save(newGame);
    }

    // Obtener todos los juegos
    @GetMapping("/games")
    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    // Obtener un juego por su ID
    @GetMapping("/game/{id}")
    public Game getGameById(@PathVariable Long id) {
        return gameRepository.findById(id)
                .orElseThrow(() -> new GameNotFoundException(id));
    }

    // Listar videojuegos con stock bajo
    @GetMapping("/games/low-stock/{threshold}")
    public List<Game> getGamesWithLowStock(@PathVariable Long threshold) {
        return gameRepository.findByStockLessThan(threshold);
    }

    // Buscar juegos por nombre
    @GetMapping("/games/search")
    public List<Game> searchGamesByName(@RequestParam String nombre) {
        return gameRepository.findByNombreContainingIgnoreCase(nombre);
    }

    // Actualizar un juego existente por su ID (Solo para administradores)
    @PutMapping("/game/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Game updateGame(@RequestBody Game newGame, @PathVariable Long id) {
        return gameRepository.findById(id)
                .map(game -> {
                    game.setNombre(newGame.getNombre());
                    game.setDescripcion(newGame.getDescripcion());
                    game.setPeso(newGame.getPeso());
                    game.setIdioma(newGame.getIdioma());
                    game.setPrecio(newGame.getPrecio());
                    game.setConsola(newGame.getConsola());
                    game.setImguno(newGame.getImguno());
                    game.setImgdos(newGame.getImgdos());
                    game.setImgtres(newGame.getImgtres());
                    game.setStock(newGame.getStock());
                    game.setGenero(newGame.getGenero());
                    game.setLanzamiento(newGame.getLanzamiento());
                    game.setVersion(newGame.getVersion());
                    game.setVideo(newGame.getVideo());
                    game.setCategoria(newGame.getCategoria());
                    game.setCantidadCopias(newGame.getCantidadCopias());
                    return gameRepository.save(game);
                }).orElseThrow(() -> new GameNotFoundException(id));
    }

    // Eliminar un juego por su ID (Solo para administradores)
    @DeleteMapping("/game/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String deleteGame(@PathVariable Long id) {
        if (!gameRepository.existsById(id)) {
            throw new GameNotFoundException(id);
        }
        gameRepository.deleteById(id);
        return "Game con id " + id + " ha sido eliminado correctamente";
    }
}
