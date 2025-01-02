package com.example.Backend.Repository;
import com.example.Backend.Model.Gallery;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
public interface GalleryRepository extends MongoRepository<Gallery, Long> {
    List<Gallery> findByType(String type);
}
