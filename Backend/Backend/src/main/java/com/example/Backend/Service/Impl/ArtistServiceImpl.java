package com.example.Backend.Service.Impl;

import com.example.Backend.Model.Artist;
import com.example.Backend.Repository.ArtistRepository;
import com.example.Backend.Service.ArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ArtistServiceImpl implements ArtistService {
    @Autowired
    private ArtistRepository artistRepository;

    @Override
    public Artist createArtist(Artist artist) {
        return artistRepository.save(artist);
    }


    @Override
    public List<Artist> getAllArtists() {
        return artistRepository.findAll();
    }

    @Override
    public Artist updateArtist(String id, Artist artist) {
        if (artistRepository.existsById(id)) { artist.setArtistId(id);
            return artistRepository.save(artist);
        }
        return null;
    }

    @Override
    public void deleteArtist(String id) {
        artistRepository.deleteById(id);
    }

    @Override
    public Optional<Artist> getArtistByUserName(String userName) {
        return artistRepository.findByUserName(userName);
    }

    @Override
    public Artist addArtist(String firstName, String lastName, String userName, String email, String password,
                            String description, MultipartFile profileImage) {

        Artist artist = new Artist();
        artist.setFirstName(firstName);
        artist.setLastName(lastName);
        artist.setUserName(userName);
        artist.setEmail(email);
        artist.setPassword(password); // You should hash the password before saving
        artist.setDescription(description);

        try {
            if (profileImage != null && !profileImage.isEmpty()) {
                // Set the image details
                artist.setImageName(profileImage.getOriginalFilename());
                artist.setContentType(profileImage.getContentType());
                artist.setImageData(profileImage.getBytes()); // Convert the file to byte array
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Save the artist to MongoDB
        return artistRepository.save(artist);
    }

    @Override
    public Artist getArtistById(String artistId) {
        return artistRepository.findById(artistId).orElse(null);
    }

}

