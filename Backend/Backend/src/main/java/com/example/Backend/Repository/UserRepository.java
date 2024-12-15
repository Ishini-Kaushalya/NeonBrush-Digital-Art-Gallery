package com.example.Backend.Repository;

import com.example.Backend.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User,Long> {
}
