package com.example.Backend.Controller;

import com.example.Backend.Model.Notification;
import com.example.Backend.Repository.NotificationRepository;
import com.example.Backend.Security.JWT.JwtUtils;
import com.example.Backend.Service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;
    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private JwtUtils jwtUtils; // Inject JwtUtils to decode the token

    // Get all notifications for the logged-in artist
    @GetMapping
    public ResponseEntity<List<Notification>> getNotificationsForArtist(@RequestHeader("Authorization") String token) {
        String artistUsername = extractUsernameFromToken(token);
        List<Notification> notifications = notificationService.getNotificationsForArtist(artistUsername);
        return ResponseEntity.ok(notifications);
    }

    // Create a new notification
    @PostMapping
    public Notification createNotification(String artistUsername, String message) {
        // Check if a similar notification already exists
        Optional<Notification> existingNotification = notificationRepository
                .findByArtistUsernameAndMessage(artistUsername, message);

        if (existingNotification.isPresent()) {
            return existingNotification.get(); // Return the existing notification
        }

        // Create a new notification
        Notification notification = new Notification();
        notification.setArtistUsername(artistUsername);
        notification.setMessage(message);
        notification.setCreatedAt(new Date());
        notification.setRead(false);
        return notificationRepository.save(notification);
    }

    // Mark a notification as read
    @PutMapping("/{id}/mark-as-read")
    public ResponseEntity<Notification> markAsRead(@PathVariable String id) {
        Notification notification = notificationService.markAsRead(id);
        return notification != null ? ResponseEntity.ok(notification) : ResponseEntity.notFound().build();
    }

    // Helper method to extract username from token using JwtUtils
    private String extractUsernameFromToken(String token) {
        // Remove the "Bearer " prefix from the token
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        // Decode the token and extract the username
        return jwtUtils.getUserNameFromJwtToken(token);
    }

    // Inner class to represent the request body for creating a notification
    public static class CreateNotificationRequest {
        private String artistUsername;
        private String message;

        // Getters and Setters
        public String getArtistUsername() {
            return artistUsername;
        }

        public void setArtistUsername(String artistUsername) {
            this.artistUsername = artistUsername;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}