package com.project.gameshop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.gameshop.exception.UserNotFoundException;
import com.project.gameshop.model.User;
import com.project.gameshop.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("No se encontró el usuario con ID: " + id));
    }

    @GetMapping("/user/email/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("No se encontró un usuario con el correo: " + email));
    }

    @GetMapping("/user/firebase/{uid}")
    public User getUserByFirebaseUid(@PathVariable String uid) {
        return userRepository.findByFirebaseUid(uid)
                .orElseThrow(() -> new UserNotFoundException("No se encontró un usuario con Firebase UID: " + uid));
    }

    @PostMapping("/user")
    public User newUser(@RequestBody User newUser) {
        return userRepository.save(newUser);
    }

    @PutMapping("/user/{id}")
    public User updateUser(@RequestBody User newUser, @PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setName(newUser.getName());
                    user.setSurname(newUser.getSurname());
                    user.setEmail(newUser.getEmail());
                    user.setPassword(newUser.getPassword());
                    user.setGender(newUser.getGender());
                    user.setFirebaseUid(newUser.getFirebaseUid());
                    return userRepository.save(user);
                }).orElseThrow(() -> new UserNotFoundException("No se encontró el usuario con ID: " + id));
    }

    @DeleteMapping("/user/{id}")
    public String deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException("No se encontró el usuario con ID: " + id);
        }
        userRepository.deleteById(id);
        return "Usuario con ID " + id + " ha sido eliminado correctamente";
    }
}
