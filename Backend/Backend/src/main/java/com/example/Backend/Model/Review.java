package com.example.Backend.Model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Review")
public class Review {
    @Id
    private long object_Id;
    private long artist_Id;
    private long user_Id;
    private int rating;
    private String comment;

    public long getObject_Id() {
        return object_Id;
    }

    public long getArtist_Id() {
        return artist_Id;
    }

    public long getUser_Id() {
        return user_Id;
    }

    public int getRating() {
        return rating;
    }

    public String getComment() {
        return comment;
    }

    public void setObject_Id(long object_Id) {
        this.object_Id = object_Id;
    }

    public void setArtist_Id(long artist_Id) {
        this.artist_Id = artist_Id;
    }

    public void setUser_Id(long user_Id) {
        this.user_Id = user_Id;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
