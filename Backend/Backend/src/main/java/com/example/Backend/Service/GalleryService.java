package com.example.Backend.Service;

        import com.example.Backend.Model.Gallery;
        import org.springframework.web.multipart.MultipartFile;
        import java.io.IOException;
        import java.util.List;

public interface GalleryService {
    Gallery saveGallery(Gallery gallery, MultipartFile image) throws IOException;
    List<Gallery> getAllGalleries();
    Gallery getGalleryById(String artId);
    void deleteGallery(String artId);
}