package com.example.Backend.Service;

import com.example.Backend.Model.Contact;

import java.util.List;


public interface ContactService {
    Contact createContact(Contact contact);
    Contact getContactById(String id);
    List<Contact> getAllContact();
    Contact updateContact(String id, Contact contact);
    void deleteContact(String id);
}
