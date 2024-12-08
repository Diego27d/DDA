package com.project.gameshop.controller;

import com.project.gameshop.exception.UserNotFoundException;
import com.project.gameshop.model.User;
import com.project.gameshop.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.project.gameshop.model.LoginRequest;
import com.project.gameshop.model.AuthResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

  
  @PostMapping("/login")
public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
    User user = userRepository.findByEmail(loginRequest.getEmail())
            .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado"));

    if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
        String token = Jwts.builder()
                .setSubject(user.getEmail())
                .claim("roles", user.getAuthorities())
                .signWith(SignatureAlgorithm.HS512, "clave_secreta")
                .compact();
        return ResponseEntity.ok(new AuthResponse(token));
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}


}
