package com.project.gameshop.repository;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * WebConfig is responsible for handling SPA routing issues in the frontend.
 * It's located in the repository package for simplicity in this project setup.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/{spring:(?!api$)[^\\.]+}/**")
                .setViewName("forward:/");
    }
}
