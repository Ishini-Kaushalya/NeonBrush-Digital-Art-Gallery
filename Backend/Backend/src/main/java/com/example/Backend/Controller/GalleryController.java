package com.example.Backend.Controller;

import com.example.Backend.Model.Gallery;
import com.example.Backend.Service.GalleryService;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/galleries")

public class GalleryController {
    @Autowired
    private GalleryService galleryService;
    private static final String IMAGE_FOLDER = "src/main/resources/static/images/";

    public GalleryController() {
    }

    @PostMapping
    public ResponseEntity<Gallery> createGallery(
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("gallery") String galleryData) {
        try {
            // Parse the JSON data for the gallery
            ObjectMapper objectMapper = new ObjectMapper();
            Gallery gallery = objectMapper.readValue(galleryData, Gallery.class);

            // Handle the image upload if an image is provided
            if (image != null && !image.isEmpty()) {
                // Define the folder where images will be stored
                String folderPath = "src/main/resources/static/images/";
                File folder = new File(folderPath);
                if (!folder.exists()) {
                    folder.mkdirs();
                }

                // Save the image file
                String fileName = image.getOriginalFilename();
                String filePath = folderPath + fileName;
                File destinationFile = new File(filePath);
                image.transferTo(destinationFile);

                // Generate the image URL
                String imageUrl = "/images/" + fileName;
                gallery.setImage_url(imageUrl);
            }

            // Save the gallery object to the database
            Gallery createdGallery = galleryService.createGallery(gallery);
            return ResponseEntity.ok(createdGallery);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping({ "/{id}" })
    public ResponseEntity<Gallery> getGalleryById(@PathVariable String id) {
        Gallery gallery = this.galleryService.getGalleryById(id);
        return gallery != null ? ResponseEntity.ok(gallery) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<Gallery>> getAllGallery() {
        List<Gallery> gallery = this.galleryService.getAllGallery();
        return ResponseEntity.ok(gallery);
    }

    @PutMapping({ "/{id}" })
    public ResponseEntity<Gallery> updateGallery(@PathVariable String id, @RequestBody Gallery gallery) {
        Gallery updatedGallery = this.galleryService.updateGallery(id, gallery);
        return updatedGallery != null ? ResponseEntity.ok(updatedGallery) : ResponseEntity.notFound().build();
    }

    @DeleteMapping({ "/{id}" })
    public ResponseEntity<Void> deleteGallery(@PathVariable String id) {
        this.galleryService.deleteGallery(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Gallery>> getGalleryByCategory(@PathVariable("category") String category) {
        List<Gallery> gallery = galleryService.getGalleryByCategory(category);
        return new ResponseEntity<>(gallery, HttpStatus.OK);
    }
}
