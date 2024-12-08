package com.project.gameshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.project.gameshop.model.Sale;
import com.project.gameshop.repository.SaleRepository;
import com.project.gameshop.repository.GameRepository;
import com.project.gameshop.repository.UserRepository;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class SalesController {

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/sale")
    Sale newSale(@RequestBody Sale newSale) {
        // Reducción del stock después de cada venta
        newSale.getGameIds().forEach(gameId -> {
            gameRepository.findById(gameId).ifPresent(game -> {
                if (game.getStock() >= newSale.getQuantity()) {
                    game.setStock(game.getStock() - newSale.getQuantity());
                    gameRepository.save(game);
                } else {
                    throw new IllegalArgumentException("Stock insuficiente para el juego: " + game.getNombre());
                }
            });
        });

        // Aplicar descuento si el usuario es premium
        userRepository.findById(newSale.getUserId()).ifPresent(user -> {
            if (user.isEsPremium()) {
                double discountedTotal = newSale.getTotal() * 0.8;
                newSale.setTotal(discountedTotal);
            }
        });

        return saleRepository.save(newSale);
    }

    @GetMapping("/sales")
    List<Sale> getAllSales() {
        return saleRepository.findAll();
    }

    @GetMapping("/sale/{id}")
    Sale getSaleById(@PathVariable Long id) {
        return saleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No se encontró la venta con el id: " + id));
    }
      // Listar compras realizadas por un usuario específico
      @GetMapping("/sales/user/{userId}")
      List<Sale> getSalesByUserId(@PathVariable Long userId) {
          return saleRepository.findByUserId(userId);
      }
  
      // Listar compras realizadas en una fecha específica
      @GetMapping("/sales/date/{date}")
      List<Sale> getSalesByDate(@PathVariable String date) {
          return saleRepository.findByDate(date);
      }
}
