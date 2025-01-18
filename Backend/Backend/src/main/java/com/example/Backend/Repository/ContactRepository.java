package com.example.Backend.Repository;

import com.example.Backend.Model.Contact;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContactRepository extends MongoRepository<Contact, Long>{
}
