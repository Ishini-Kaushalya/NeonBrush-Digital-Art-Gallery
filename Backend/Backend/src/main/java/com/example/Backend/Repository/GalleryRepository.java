package com.example.Backend.Repository;

import com.example.Backend.Model.Gallery;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GalleryRepository extends MongoRepository<Gallery, String> {
    List<Gallery> findByUserName(String userName);

    // Custom method to find art items by category
    List<Gallery> findByCategory(String category);
    Optional<Gallery> findByTitle(String title);

    void deleteByUserName(String userName);
}
