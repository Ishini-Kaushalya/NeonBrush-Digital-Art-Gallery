package com.example.Backend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "User")
public class User {
    @Id
    private long userId;
    private String userName;
    private String email;
    private String password;

    public long getUserId() {
        return userId;
    }
    public void setUserId(long userId) {
        this.userId = userId;
    }
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


}


