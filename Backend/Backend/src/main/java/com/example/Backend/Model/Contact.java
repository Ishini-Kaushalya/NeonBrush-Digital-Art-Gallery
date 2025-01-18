package com.example.Backend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Contact")
public class Contact {
    @Id
    private long contactId;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String message;


}
