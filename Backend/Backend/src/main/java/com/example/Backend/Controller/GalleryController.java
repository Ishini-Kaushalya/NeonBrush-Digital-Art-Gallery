package com.example.Backend.Controller;

import com.example.Backend.Model.Gallery;
import com.example.Backend.Service.GalleryService;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSBuckets;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/gallery")
public class GalleryController {

    @Autowired
    private GalleryService galleryService;

    @Autowired
    private MongoTemplate mongoTemplate;
    @PostMapping("/addArtItem")
    public ResponseEntity<Gallery> addArtItem(
            @RequestParam("userName") String userName,
            @RequestParam("title") String title,
            @RequestParam("size") String size,
            @RequestParam("description") String description,
            @RequestParam("category") String category,
            @RequestParam("price") double price,
            @RequestParam("image") MultipartFile image) {
        Gallery gallery = galleryService.addArtItem(userName, title, size, description, category, price, image);
        return ResponseEntity.status(HttpStatus.CREATED).body(gallery);
    }

    @GetMapping
    public ResponseEntity<List<Gallery>> getAllArtItems() {
        List<Gallery> galleries = galleryService.getAllArtItems();
        return ResponseEntity.ok(galleries);
    }

    @GetMapping("/user/{userName}")
    public ResponseEntity<List<Gallery>> getArtItemsByUserName(@PathVariable String userName) {
        List<Gallery> galleries = galleryService.getArtItemsByUserName(userName);
        return ResponseEntity.ok(galleries);
    }

    @GetMapping("/{artId}")
    public ResponseEntity<Gallery> getArtItemById(@PathVariable String artId) {
        Gallery gallery = galleryService.getArtItemById(artId);
        if (gallery != null) {
            return ResponseEntity.ok(gallery);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{artId}")
    public ResponseEntity<Void> deleteArtItem(@PathVariable String artId) {
        galleryService.deleteArtItem(artId);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/image/{imageId}")
    public ResponseEntity<byte[]> getImage(@PathVariable String imageId) {
        try {
            GridFSBucket gridFSBucket = GridFSBuckets.create(mongoTemplate.getDb());
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            gridFSBucket.downloadToStream(new ObjectId(imageId), outputStream);
            byte[] imageBytes = outputStream.toByteArray();

            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG) // Adjust based on the image type
                    .body(imageBytes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

    }


}