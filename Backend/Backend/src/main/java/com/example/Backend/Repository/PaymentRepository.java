package com.example.Backend.Repository;

import com.example.Backend.Model.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends MongoRepository<Payment, String> {
    // Custom query methods can be added here if needed
}