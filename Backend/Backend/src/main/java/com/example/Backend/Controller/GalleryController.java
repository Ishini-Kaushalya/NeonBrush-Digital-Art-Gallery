package com.example.Backend.Controller;

import com.example.Backend.Model.Gallery;
import com.example.Backend.Service.GalleryService;
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
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/galleries")

public class GalleryController {
    @Autowired
    private GalleryService galleryService;
    public GalleryController() {
    }
    @PostMapping
    public ResponseEntity<Gallery> createGallery(@RequestBody Gallery gallery) {
        Gallery createdGallery = this.galleryService.createGallery(gallery);
        return ResponseEntity.ok(createdGallery);
    }
    @GetMapping({"/{id}"})
    public ResponseEntity<Gallery> getGalleryById(@PathVariable long id) {
        Gallery gallery = this.galleryService.getGalleryById(id);
        return gallery != null ? ResponseEntity.ok(gallery) :ResponseEntity.notFound().build();
    }
    @GetMapping
    public ResponseEntity<List<Gallery>> getAllGallery() {
        List<Gallery> gallery = this.galleryService.getAllGallery();
        return ResponseEntity.ok(gallery);
    }
    @PutMapping({"/{id}"})
    public ResponseEntity<Gallery> updateGallery(@PathVariable long id, @RequestBody Gallery gallery) {
        Gallery updatedGallery = this.galleryService.updateGallery(id, gallery);
        return updatedGallery != null ? ResponseEntity.ok(updatedGallery) :ResponseEntity.notFound().build();
    }
    @DeleteMapping({"/{id}"})
    public ResponseEntity<Void> deleteGallery(@PathVariable long id) {
        this.galleryService.deleteGallery(id);
        return ResponseEntity.noContent().build();
    }
}
