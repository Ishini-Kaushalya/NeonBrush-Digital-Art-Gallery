package com.example.Backend.Controller;

import org.springframework.http.HttpStatus;
import com.example.Backend.Model.Artist;
import com.example.Backend.Service.ArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.util.List;


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
    @GetMapping({"/{id}"})
    public ResponseEntity<Artist> getArtistById(@PathVariable String id) {
        Artist artist = this.artistService.getArtistById(id);
        return artist != null ? ResponseEntity.ok(artist) :ResponseEntity.notFound().build();
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

}
