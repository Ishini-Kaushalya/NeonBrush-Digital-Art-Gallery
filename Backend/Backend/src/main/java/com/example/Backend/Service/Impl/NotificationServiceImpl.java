package com.example.Backend.Service.Impl;

import com.example.Backend.Model.Notification;
import com.example.Backend.Repository.NotificationRepository;
import com.example.Backend.Service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public Notification createNotification(String artistUsername, String message) {
        Notification notification = new Notification();
        notification.setArtistUsername(artistUsername);
        notification.setMessage(message);
        notification.setCreatedAt(new Date());
        notification.setRead(false);
        return notificationRepository.save(notification);
    }

    @Override
    public List<Notification> getNotificationsForArtist(String artistUsername) {
        return notificationRepository.findByArtistUsername(artistUsername);
    }

    @Override
    public Notification markAsRead(String notificationId) {
        Notification notification = notificationRepository.findById(notificationId).orElse(null);
        if (notification != null) {
            notification.setRead(true);
            notificationRepository.save(notification);
        }
        return notification;
    }
}