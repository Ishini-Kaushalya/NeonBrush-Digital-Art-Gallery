package com.example.Backend.Service.Impl;

import com.example.Backend.Model.Gallery;
import com.example.Backend.Repository.GalleryRepository;
import com.example.Backend.Service.GalleryService;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSBuckets;
import com.mongodb.client.gridfs.model.GridFSUploadOptions;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class GalleryServiceImpl implements GalleryService {

    @Autowired
    private GalleryRepository galleryRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public Gallery addArtItem(String userName, String title, String size, String description, String category, double price, MultipartFile image) {
        Gallery gallery = new Gallery();
        gallery.setUserName(userName);
        gallery.setTitle(title);
        gallery.setSize(size);
        gallery.setDescription(description);
        gallery.setCategory(category);
        gallery.setPrice(price);

        if (image != null && !image.isEmpty()) {
            try {
                GridFSBucket gridFSBucket = GridFSBuckets.create(mongoTemplate.getDb());
                GridFSUploadOptions options = new GridFSUploadOptions()
                        .metadata(new Document("contentType", image.getContentType()));

                ObjectId fileId = gridFSBucket.uploadFromStream(image.getOriginalFilename(), image.getInputStream(), options);
                gallery.setImageId(fileId.toString());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return galleryRepository.save(gallery);
    }

    @Override
    public List<Gallery> getAllArtItems() {
        return galleryRepository.findAll();
    }

    @Override
    public List<Gallery> getArtItemsByUserName(String userName) {
        return galleryRepository.findByUserName(userName);
    }

    @Override
    public Gallery getArtItemById(String artId) {
        return galleryRepository.findById(artId).orElse(null);
    }

    @Override
    public void deleteArtItem(String artId) {
        galleryRepository.deleteById(artId);
    }

    @Override
    public List<Gallery> getArtItemsByCategory(String category) {
        return galleryRepository.findByCategory(category);
    }
}