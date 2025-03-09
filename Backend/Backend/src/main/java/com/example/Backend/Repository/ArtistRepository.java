package com.example.Backend.Repository;

import com.example.Backend.Model.Artist;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArtistRepository extends MongoRepository<Artist, String> {
    Optional<Artist> findByUserName(String userName);

}