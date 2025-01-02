package com.example.Backend.Service.Impl;

import com.example.Backend.Model.Gallery;
import com.example.Backend.Repository.GalleryRepository;
import com.example.Backend.Service.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class GalleryServiceImpl implements GalleryService{
    @Autowired
    private GalleryRepository galleryRepository;
    @Override
    public Gallery createGallery(Gallery gallery) {
        return galleryRepository.save(gallery);
    }
    @Override
    public Gallery getGalleryById(long id) {
        Optional<Gallery> gallery = galleryRepository.findById(id);
        return gallery.orElse(null);
    }
    @Override
    public List<Gallery> getAllGallery() {
        return galleryRepository.findAll();
    }
    @Override
    public Gallery updateGallery(long id, Gallery gallery) {
        if (galleryRepository.existsById(id)) { gallery.setObject_Id(id);
            return galleryRepository.save(gallery);
        }
        return null; // Return null or throw an exception if not found
    }
    @Override
    public void deleteGallery(long id) {
        galleryRepository.deleteById(id);
    }

    @Override
    public List<Gallery> getGalleryByType(String type) {
        return GalleryRepository.findByType(type);
    }


}



