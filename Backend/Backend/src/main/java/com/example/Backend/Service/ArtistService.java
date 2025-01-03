package com.example.Backend.Service;


import com.example.Backend.Model.Artist;

import java.util.List;
import java.util.Optional;

public interface ArtistService {
    Artist createArtist(Artist artist);
    Artist getArtistById(long id);
    List<Artist> getAllArtists();
    Artist updateArtist(long id, Artist artist);
    void deleteArtist(long id);
    Optional<Artist> getArtistByArtistName(String artistName);
}
