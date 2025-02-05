package com.example.Backend.Service;


import com.example.Backend.Model.Artist;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface ArtistService {
    Artist createArtist(Artist artist);

    List<Artist> getAllArtists();
    Artist updateArtist(String id, Artist artist);
    void deleteArtist(String id);
    Optional<Artist> getArtistByUserName(String userName);
    Artist addArtist(String firstName, String lastName, String userName, String email, String password,
                     String description, MultipartFile profileImage);

    Artist getArtistById(String artistId);

}

