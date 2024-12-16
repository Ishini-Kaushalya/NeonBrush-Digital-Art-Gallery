package com.example.Backend.Repository;

import com.example.Backend.Model.Artist;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ArtistRepository extends MongoRepository<Artist,Long> {
}
