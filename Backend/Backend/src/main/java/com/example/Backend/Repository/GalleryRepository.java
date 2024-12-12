package com.example.Backend.Repository;
import com.example.Backend.Model.Gallery;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface GalleryRepository extends MongoRepository<Gallery, Long> {
// You can define custom query methods here if needed
}
