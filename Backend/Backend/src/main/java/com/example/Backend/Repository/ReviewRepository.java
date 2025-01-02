package com.example.Backend.Repository;

import com.example.Backend.Model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ReviewRepository extends MongoRepository<Review, Long> {
    List<Review> findByArtist_userName(String artist_userName);
}
