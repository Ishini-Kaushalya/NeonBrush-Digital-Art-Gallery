package com.example.Backend.Model;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "gallery")// Specify the collection name
@Data
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
}
