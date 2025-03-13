package com.example.Backend.Controller;

import com.example.Backend.Model.Artist;
import com.example.Backend.Service.ArtistService;
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
import java.util.Optional;

@RestController
@RequestMapping("/api/artist")
public class ArtistController {
    @Autowired
    private ArtistService artistService;
    @Autowired
    private MongoTemplate mongoTemplate;

    @PostMapping
    public ResponseEntity<Artist> createArtist(@RequestBody Artist artist) {
        Artist createdArtist = artistService.createArtist(artist);
        return ResponseEntity.ok(createdArtist);
    }

    @GetMapping
    public ResponseEntity<List<Artist>> getAllArtists() {
        List<Artist> artists = artistService.getAllArtists();
        return ResponseEntity.ok(artists);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Artist> updateArtist(@PathVariable String id, @RequestBody Artist artist) {
        Artist updatedArtist = artistService.updateArtist(id, artist);
        return updatedArtist != null ? ResponseEntity.ok(updatedArtist) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArtist(@PathVariable String id) {
        artistService.deleteArtist(id);
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping("/username/{userName}")
    public ResponseEntity<Void> deleteArtistByUserName(@PathVariable String userName) {
        artistService.deleteArtistByUserName(userName); // This will delete both profile and artworks
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/username/{userName}")
    public ResponseEntity<Artist> getArtistByUserName(@PathVariable String userName) {
        Optional<Artist> artist = artistService.getArtistByUserName(userName);
        return artist.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping("/addArtist")
    public ResponseEntity<String> addArtist(
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("userName") String userName,
            @RequestParam("email") String email,
            @RequestParam("description") String description,
            @RequestParam(value = "image", required = false) MultipartFile profileImage) {
        try {
            artistService.addArtist(firstName, lastName, userName, email, description, profileImage);
            return ResponseEntity.ok("Artist added successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to add artist: " + e.getMessage());
        }
    }

    @GetMapping("/{artistId}")
    public ResponseEntity<?> getArtistById(@PathVariable String artistId) {
        Artist artist = artistService.getArtistById(artistId);
        if (artist != null) {
            return ResponseEntity.ok(artist);
        } else {
            return ResponseEntity.notFound().build();
        }
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
    @PutMapping("/username/{userName}")
    public ResponseEntity<String> updateArtistByUserName(
            @PathVariable String userName,
            @RequestParam(value = "firstName", required = false) String firstName,
            @RequestParam(value = "lastName", required = false) String lastName,
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "image", required = false) MultipartFile profileImage) {
        try {
            artistService.updateArtistByUserName(userName, firstName, lastName, email, description, profileImage);
            return ResponseEntity.ok("Artist updated successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update artist: " + e.getMessage());
        }
    }
}