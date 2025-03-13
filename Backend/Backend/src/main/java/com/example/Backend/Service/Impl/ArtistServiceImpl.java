package com.example.Backend.Service.Impl;

import com.example.Backend.Model.Artist;
import com.example.Backend.Repository.ArtistRepository;
import com.example.Backend.Service.ArtistService;
import com.example.Backend.Service.GalleryService;
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
    private GalleryService galleryService;
    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public Artist createArtist(Artist artist) {
        return artistRepository.save(artist);
    }
    @Override
    public void deleteArtistByUserName(String userName) {
        // Delete all artworks by the artist
        galleryService.deleteArtItemsByUserName(userName);

        // Delete the artist profile
        Optional<Artist> artist = artistRepository.findByUserName(userName);
        artist.ifPresent(artistRepository::delete);
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
    public Artist addArtist(String firstName, String lastName, String userName, String email,
                            String description, MultipartFile profileImage) {
        Artist artist = new Artist();
        artist.setFirstName(firstName);
        artist.setLastName(lastName);
        artist.setUserName(userName);
        artist.setEmail(email);
        // You should hash the password before saving
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

    @Override
    public void updateArtistByUserName(
            String userName,
            String firstName,
            String lastName,
            String email,
            String description,
            MultipartFile profileImage) throws IOException {
        Optional<Artist> optionalArtist = artistRepository.findByUserName(userName);
        if (optionalArtist.isPresent()) {
            Artist artist = optionalArtist.get();

            if (firstName != null) artist.setFirstName(firstName);
            if (lastName != null) artist.setLastName(lastName);
            if (email != null) artist.setEmail(email);
            if (description != null) artist.setDescription(description);

            if (profileImage != null && !profileImage.isEmpty()) {
                // Delete the old image if it exists
                if (artist.getImageId() != null) {
                    GridFSBucket gridFSBucket = GridFSBuckets.create(mongoTemplate.getDb());
                    gridFSBucket.delete(new ObjectId(artist.getImageId()));
                }

                // Upload the new image
                GridFSBucket gridFSBucket = GridFSBuckets.create(mongoTemplate.getDb());
                ObjectId imageId = gridFSBucket.uploadFromStream(profileImage.getOriginalFilename(), profileImage.getInputStream());
                artist.setImageId(imageId.toString());
            }

            artistRepository.save(artist);
        } else {
            throw new RuntimeException("Artist not found with username: " + userName);
        }
    }

    @Override
    public void deleteArtItemsByUserName(String userName) {

    }
}
