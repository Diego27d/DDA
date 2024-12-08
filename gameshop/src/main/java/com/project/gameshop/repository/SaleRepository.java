package com.project.gameshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.project.gameshop.model.Sale;

import java.util.List;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {
   
    List<Sale> findByUserId(Long userId);

   
    List<Sale> findByDate(String date);
}
