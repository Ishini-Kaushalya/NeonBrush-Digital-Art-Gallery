package com.example.Backend.Service.Impl;

import com.example.Backend.Model.Artist;
import com.example.Backend.Repository.ArtistRepository;
import com.example.Backend.Service.ArtistService;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSBuckets;
import com.mongodb.client.gridfs.model.GridFSUploadOptions;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ArtistServiceImpl implements ArtistService {

    @Autowired
    private ArtistRepository artistRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

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
        if (artistRepository.existsById(id)) {
            artist.setArtistId(id);
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

        if (profileImage != null && !profileImage.isEmpty()) {
            try {
                GridFSBucket gridFSBucket = GridFSBuckets.create(mongoTemplate.getDb());
                GridFSUploadOptions options = new GridFSUploadOptions()
                        .metadata(new Document("contentType", profileImage.getContentType()));

                ObjectId fileId = gridFSBucket.uploadFromStream(profileImage.getOriginalFilename(), profileImage.getInputStream(), options);
                artist.setImageId(fileId.toString()); // Store the GridFS file ID
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return artistRepository.save(artist);
    }

    @Override
    public Artist getArtistById(String artistId) {
        return artistRepository.findById(artistId).orElse(null);
    }
}