package com.example.Backend.Repository;

import com.example.Backend.Model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends MongoRepository<Notification, String> {
    List<Notification> findByArtistUsername(String artistUsername); // Find notifications by artist username

    Optional<Notification> findByArtistUsernameAndMessage(String artistUsername, String message);
}
