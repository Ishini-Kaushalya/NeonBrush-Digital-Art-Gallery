package com.example.Backend.Service;

import com.example.Backend.Model.Notification;
import java.util.List;

public interface NotificationService {
    // Create a notification for the artist
    Notification createNotification(String artistUsername, String message);

    // Get all notifications for an artist
    List<Notification> getNotificationsForArtist(String artistUsername);

    // Mark a notification as read
    Notification markAsRead(String notificationId);
}
