package com.example.Backend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "gallery")// Specify the collection name

public class Gallery {
    @Id
    private long object_Id;
    private long artist_Id;
    private String title;
    private String description;
    private String artist;
    private String type;
    private double price;
    private Date created_at;
    private String is_available;

    public void setObject_Id(long object_Id) {
        this.object_Id = object_Id;
    }

    public long getObject_Id() {
        return object_Id;
    }

    public long getArtist_Id() {
        return artist_Id;
    }

    public void setArtist_Id(long artist_Id) {
        this.artist_Id = artist_Id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public String getIs_available() {
        return is_available;
    }

    public void setIs_available(String is_available) {
        this.is_available = is_available;
    }
}
