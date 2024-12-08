package com.project.gameshop.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.gameshop.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByFirebaseUid(String firebaseUid);
}
