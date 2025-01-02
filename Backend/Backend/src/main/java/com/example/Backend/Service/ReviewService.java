package com.example.Backend.Service;
import com.example.Backend.Model.Review;
import java.util.List;

public interface ReviewService {
    Review createReview(Review review);
    Review getReviewById(long id);
    List<Review> getAllReviews();
    Review updateReview(long id, Review review);
    void deleteReview(long id);
    List<Review> getReviewsByArtist_Id(long artist_Id);
}

