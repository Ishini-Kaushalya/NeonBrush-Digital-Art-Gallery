package com.example.Backend.Service.Impl;

import com.example.Backend.Model.Gallery;
import com.example.Backend.Repository.GalleryRepository;
import com.example.Backend.Service.GalleryService;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class GalleryServiceImpl implements GalleryService {

    @Autowired
    private GalleryRepository galleryRepository;

    @Autowired
    private GridFsTemplate gridFsTemplate;

    @Autowired
    private GridFsOperations gridFsOperations;

    // GalleryServiceImpl.java
    @Override
    public Gallery saveGallery(Gallery gallery, MultipartFile image) throws IOException {
        // Save the image to GridFS
        DBObject metadata = new BasicDBObject();
        metadata.put("artId", gallery.getArtId());
        metadata.put("userName", gallery.getUserName()); // Include artistId in metadata
        ObjectId imageId = gridFsTemplate.store(image.getInputStream(), image.getOriginalFilename(), image.getContentType(), metadata);

        // Set the imageId in the gallery object
        gallery.setImageId(imageId.toString());

        // Save the gallery object to MongoDB
        return galleryRepository.save(gallery);
    }
    public void addArt(String userName, String title, String size, String description, String category, double price, MultipartFile image) throws IOException {
        // Save the image to GridFS
        DBObject metadata = new BasicDBObject();
        metadata.put("userName", userName);
        ObjectId imageId = gridFsTemplate.store(image.getInputStream(), image.getOriginalFilename(), image.getContentType(), metadata);

        // Create a new Gallery object
        Gallery gallery = new Gallery();
        gallery.setUserName(userName);
        gallery.setTitle(title);
        gallery.setSize(size);
        gallery.setDescription(description);
        gallery.setCategory(category);
        gallery.setPrice(price);
        gallery.setImageId(imageId.toString());

        // Save the gallery object to MongoDB
        galleryRepository.save(gallery);
    }

    @Override
    public List<Gallery> getAllGalleries() {
        return galleryRepository.findAll();
    }

    @Override
    public Gallery getGalleryById(String artId) {
        Optional<Gallery> gallery = galleryRepository.findById(artId);
        return gallery.orElseThrow(() -> new RuntimeException("Gallery not found with id: " + artId));
    }

    @Override
    public void deleteGallery(String artId) {
        // Delete the image from GridFS
        Gallery gallery = getGalleryById(artId);
        gridFsTemplate.delete(new Query(Criteria.where("metadata.artId").is(artId)));

        // Delete the gallery object from MongoDB
        galleryRepository.deleteById(artId);
    }
}