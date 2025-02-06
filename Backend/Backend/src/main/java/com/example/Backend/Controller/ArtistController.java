package com.example.Backend.Controller;

import com.example.Backend.Model.Artist;
import com.example.Backend.Service.ArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    public ArtistController(){

    }
    @PostMapping
    public ResponseEntity<Artist> createArtist(@RequestBody Artist artist) {
        Artist createdArtist = this.artistService.createArtist(artist);
        return ResponseEntity.ok(createdArtist);
    }
    @GetMapping
    public ResponseEntity<List<Artist>> getAllArtists() {
        List<Artist> artists = this.artistService.getAllArtists();
        return ResponseEntity.ok(artists);
    }
    @PutMapping({"/{id}"})
    public ResponseEntity<Artist> updateArtist(@PathVariable String id, @RequestBody Artist artist) {
        Artist updatedArtist = this.artistService.updateArtist(id, artist);
        return updatedArtist != null ? ResponseEntity.ok(updatedArtist) :ResponseEntity.notFound().build();
    }
    @DeleteMapping({"/{id}"})
    public ResponseEntity<Void> deleteArtist(@PathVariable String id) {
        this.artistService.deleteArtist(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/username/{userName}")
    public ResponseEntity<Artist> getArtistByUserName(@PathVariable("userName") String userName) {
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
            @RequestParam("password") String password,
            @RequestParam("description") String description,
            @RequestParam(value = "image", required = false) MultipartFile profileImage) {
        try {
            artistService.addArtist(firstName, lastName, userName, email, password, description, profileImage);
            return ResponseEntity.ok("Artist added successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to add artist: " + e.getMessage());
        }
    }

    // Get an artist by ID
    @GetMapping("/{artistId}")
    public ResponseEntity<?> getArtistById(@PathVariable("artistId") String artistId) {
        Artist artist = artistService.getArtistById(artistId);
        if (artist != null) {
            return ResponseEntity.ok(artist);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

