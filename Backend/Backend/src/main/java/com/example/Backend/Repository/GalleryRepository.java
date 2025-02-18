package com.example.Backend.Repository;

        import com.example.Backend.Model.Gallery;
        import org.springframework.data.mongodb.repository.MongoRepository;
        import org.springframework.stereotype.Repository;

        import java.util.List;

@Repository
public interface GalleryRepository extends MongoRepository<Gallery, String> {
    List<Gallery> findByUserName(String userName);
}