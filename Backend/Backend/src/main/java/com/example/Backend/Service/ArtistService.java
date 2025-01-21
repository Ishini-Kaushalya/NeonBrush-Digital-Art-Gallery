package com.example.Backend.Service;


import com.example.Backend.Model.Artist;

import java.util.List;
import java.util.Optional;

public interface ArtistService {
    Artist createArtist(Artist artist);
    Artist getArtistById(String id);
    List<Artist> getAllArtists();
    Artist updateArtist(String id, Artist artist);
    void deleteArtist(String id);
    Optional<Artist> getArtistByUserName(String userName);
}
