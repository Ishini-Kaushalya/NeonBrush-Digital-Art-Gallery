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


    public void setObject_Id(long object_Id) {
        this.object_Id = object_Id;
    }
}
