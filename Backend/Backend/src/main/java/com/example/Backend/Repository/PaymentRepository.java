package com.example.Backend.Repository;
import com.example.Backend.Model.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PaymentRepository extends MongoRepository<Payment,Long> {
}