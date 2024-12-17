package com.example.Backend.Repository;

import com.example.Backend.Model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReviewRepository extends MongoRepository<Review, Long> {
}
