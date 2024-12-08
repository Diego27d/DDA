package com.project.gameshop.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Deshabilita CSRF para simplificar pruebas
            .cors(cors -> cors.configurationSource(request -> new org.springframework.web.cors.CorsConfiguration().applyPermitDefaultValues())) // Habilitar CORS
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/admin/**").authenticated() // Requiere autenticación para rutas de administrador
                .requestMatchers("/game/**").permitAll() // Permitir acceso público a todas las rutas de /game
                .anyRequest().permitAll() // Permitir acceso público a todos los demás endpoints para pruebas
            )
            .formLogin(form -> form.disable()); // Deshabilitar el formulario de login para simplificar el desarrollo

        return http.build();
    }

    @Bean(name = "miPasswordEncoder")
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000") // Permitir el origen del frontend
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos permitidos
                        .allowedHeaders("*")
                        .allowCredentials(true); // Permitir credenciales (cookies, autenticación)
            }
        };
    }
}
