package com.example.Backend.Repository;

import com.example.Backend.Model.Artist;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface ArtistRepository extends MongoRepository<Artist,Long> {
    Optional<Artist> getArtistByUserName(String userName);
}
