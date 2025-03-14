package com.example.Backend.Controller;

import com.example.Backend.Security.Services.UserDetailsImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/role")
    public ResponseEntity<?> getUserRole() {
        // Get the authenticated user's details
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        // Extract roles from the authenticated user
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        // Return the roles
        return ResponseEntity.ok(roles);
    }

    @GetMapping("/username")
    public ResponseEntity<?> getUsername() {
        // Get the authenticated user's details
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        // Extract and return the username
        String username = userDetails.getUsername();
        return ResponseEntity.ok(username);
    }

    @GetMapping("/email")
    public ResponseEntity<?> getEmail() {
        // Get the authenticated user's details
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        // Extract and return the email
        String email = userDetails.getEmail(); // Assuming UserDetailsImpl has an email field
        return ResponseEntity.ok(email);
    }
}