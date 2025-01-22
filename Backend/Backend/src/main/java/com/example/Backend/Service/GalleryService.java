package com.example.Backend.Service;

import com.example.Backend.Model.Gallery;
import java.util.List;
public interface GalleryService {
    Gallery createGallery(Gallery gallery);
    Gallery getGalleryById(String id);
    List<Gallery> getAllGallery();
    Gallery updateGallery(String id, Gallery gallery);
    void deleteGallery(String id);
    List<Gallery> getGalleryByCategory(String category);
}
