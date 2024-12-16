package com.example.Backend.Service.Impl;

import com.example.Backend.Model.Review;
import com.example.Backend.Repository.ReviewRepository;
import com.example.Backend.Service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewServiceImpl implements ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public Review getReviewById(long id) {
        Optional<Review> review = reviewRepository.findById(id);
        return review.orElse(null);
    }

    @Override
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    @Override
    public Review updateReview(long id, Review review) {
        if (reviewRepository.existsById(id)) {
            review.setObject_Id(id);
            return reviewRepository.save(review);
        }
        return null;
    }

    @Override
    public void deleteReview(long id) {
        reviewRepository.deleteById(id);
    }
}
