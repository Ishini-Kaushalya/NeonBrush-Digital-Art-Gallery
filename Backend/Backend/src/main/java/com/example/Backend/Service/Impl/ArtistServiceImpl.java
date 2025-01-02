package com.example.Backend.Service.Impl;

import com.example.Backend.Model.Artist;
import com.example.Backend.Repository.ArtistRepository;
import com.example.Backend.Service.ArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public Artist getArtistById(long id) {
        Optional<Artist> artist = artistRepository.findById(id);
        return artist.orElse(null);    }

    @Override
    public List<Artist> getAllArtists() {
        return artistRepository.findAll();
    }

    @Override
    public Artist updateArtist(long id, Artist artist) {
        if (artistRepository.existsById(id)) { artist.setArtistId(id);
            return artistRepository.save(artist);
        }
        return null;
    }

    @Override
    public void deleteArtist(long id) {
        artistRepository.deleteById(id);
    }

    @Override
    public Optional<Artist> getArtistByUserName(String userName) {
        return artistRepository.findByUserName(userName);
    }
}
