package com.example.Backend.Controller;

import com.example.Backend.Model.Notification;
import com.example.Backend.Service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    // Get all notifications for the logged-in artist
    @GetMapping
    public ResponseEntity<List<Notification>> getNotificationsForArtist(@RequestHeader("Authorization") String token) {
        String artistUsername = extractUsernameFromToken(token); // Extract username from token
        List<Notification> notifications = notificationService.getNotificationsForArtist(artistUsername);
        return ResponseEntity.ok(notifications);
    }

    // Mark a notification as read
    @PutMapping("/{id}/mark-as-read")
    public ResponseEntity<Notification> markAsRead(@PathVariable String id) {
        Notification notification = notificationService.markAsRead(id);
        return notification != null ? ResponseEntity.ok(notification) : ResponseEntity.notFound().build();
    }

    // Helper method to extract username from token
    private String extractUsernameFromToken(String token) {
        // Implement logic to extract username from JWT token
        // For example, decode the token and get the "username" claim
        return "artistUsername"; // Replace with actual logic
    }
}