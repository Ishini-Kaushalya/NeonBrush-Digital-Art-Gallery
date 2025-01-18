package com.example.Backend.Service;

import com.example.Backend.Model.Contact;

import java.util.List;


public interface ContactService {
    Contact createContact(Contact contact);
    Contact getContactById(long id);
    List<Contact> getAllContact();
    Contact updateContact(long id, Contact contact);
    void deleteContact(long id);
}
