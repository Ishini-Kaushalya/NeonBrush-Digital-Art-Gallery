package com.example.Backend.Controller;

import com.example.Backend.Model.Gallery;
import com.example.Backend.Service.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/gallery")
public class GalleryController {

    @Autowired
    private GalleryService galleryService;

    // GalleryController.java
    @PostMapping
    public ResponseEntity<String> addArt(
            @RequestParam("userName") String userName,
            @RequestParam("title") String title,
            @RequestParam("size") String size,
            @RequestParam("description") String description,
            @RequestParam("category") String category,
            @RequestParam("price") double price,
            @RequestParam("image") MultipartFile image) {
        try {
            galleryService.addArt(userName, title, size, description, category, price, image);
            return ResponseEntity.ok("Art added successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add art: " + e.getMessage());
        }
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