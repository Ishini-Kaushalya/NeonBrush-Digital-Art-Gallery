package com.example.Backend.Repository;
import com.example.Backend.Model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, Long> {
    // Define custom query methods if needed
}

