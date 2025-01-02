package com.example.Backend.Model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Review")
public class Review {
    @Id
    private long object_Id;
    private String artist_userName;
    private long user_Id;
    private int rating;
    private String comment;

    public long getObject_Id() {
        return object_Id;
    }

    public void setObject_Id(long object_Id) {
        this.object_Id = object_Id;
    }

    public String getArtist_userName() {
        return artist_userName;
    }

    public void setArtist_userName(String artist_userName) {
        this.artist_userName = artist_userName;
    }

    public long getUser_Id() {
        return user_Id;
    }

    public void setUser_Id(long user_Id) {
        this.user_Id = user_Id;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
