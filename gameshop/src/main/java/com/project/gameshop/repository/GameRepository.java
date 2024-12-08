package com.project.gameshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.project.gameshop.model.Game;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {

    List<Game> findByNombreContainingIgnoreCase(String nombre);
    List<Game> findByStockLessThan(Long stock);
}
