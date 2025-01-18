package com.example.Backend.Service.Impl;

        import com.example.Backend.Model.Contact;
        import com.example.Backend.Repository.ContactRepository;
        import com.example.Backend.Service.ContactService;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.stereotype.Service;

        import java.util.List;
        import java.util.Optional;
@Service
public class ContactServiceImpl implements ContactService {
    @Autowired
    private ContactRepository contactRepository;
    @Override
    public Contact createContact(Contact contact) {
        return contactRepository.save(contact);
    }
    @Override
    public Contact getContactById(long id) {
        Optional<Contact> contact = contactRepository.findById(id);
        return contact.orElse(null);
    }
    @Override
    public List<Contact> getAllContact() {
        return contactRepository.findAll();
    }
    @Override
    public Contact updateContact(long id, Contact contact) {
        if (contactRepository.existsById(id)) { contact.setContactId(id);
            return contactRepository.save(contact);
        }
        return null; // Return null or throw an exception if not found
    }
    @Override
    public void deleteContact(long id) {
        contactRepository.deleteById(id);
    }
}
