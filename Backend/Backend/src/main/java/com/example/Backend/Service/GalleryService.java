package com.example.Backend.Service;

import com.example.Backend.Model.Gallery;
import java.util.List;
public interface GalleryService {
    Gallery createGallery(Gallery gallery);
    Gallery getGalleryById(long id);
    List<Gallery> getAllGallery();
    Gallery updateGallery(long id, Gallery gallery);
    void deleteGallery(long id);
    List<Gallery> getGalleryByType(String type);
}
