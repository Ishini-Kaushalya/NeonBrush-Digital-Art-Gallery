package com.example.Backend.Controller;

import com.example.Backend.Model.Gallery;
import com.example.Backend.Service.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/gallery")
public class GalleryController {

    @Autowired
    private GalleryService galleryService;

    // GalleryController.java
    @PostMapping
    public ResponseEntity<Gallery> createGallery(@RequestPart("userName") String userName,
                                                 @RequestPart("gallery") Gallery gallery,
                                                 @RequestPart("image") MultipartFile image) throws IOException {
        gallery.setUserName(userName); // Set the artistId in the gallery object
        Gallery savedGallery = galleryService.saveGallery(gallery, image);
        return new ResponseEntity<>(savedGallery, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Gallery>> getAllGalleries() {
        List<Gallery> galleries = galleryService.getAllGalleries();
        return new ResponseEntity<>(galleries, HttpStatus.OK);
    }

    @GetMapping("/{artId}")
    public ResponseEntity<Gallery> getGalleryById(@PathVariable String artId) {
        Gallery gallery = galleryService.getGalleryById(artId);
        return new ResponseEntity<>(gallery, HttpStatus.OK);
    }

    @DeleteMapping("/{artId}")
    public ResponseEntity<Void> deleteGallery(@PathVariable String artId) {
        galleryService.deleteGallery(artId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}