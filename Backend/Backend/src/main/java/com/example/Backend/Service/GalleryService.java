package com.example.Backend.Service;

import com.example.Backend.Model.Gallery;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface GalleryService {
    Gallery addArtItem(String userName, String title, String size, String description, String category, double price, MultipartFile image);
    List<Gallery> getAllArtItems();
    List<Gallery> getArtItemsByUserName(String userName);
    Gallery getArtItemById(String artId);
    void deleteArtItem(String artId);
}