package com.example.Backend.Controller;

        import com.example.Backend.Model.Contact;
        import com.example.Backend.Service.ContactService;
        import java.util.List;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.http.ResponseEntity;
        import org.springframework.web.bind.annotation.DeleteMapping;
        import org.springframework.web.bind.annotation.GetMapping;
        import org.springframework.web.bind.annotation.PathVariable;
        import org.springframework.web.bind.annotation.PostMapping;
        import org.springframework.web.bind.annotation.PutMapping;
        import org.springframework.web.bind.annotation.RequestBody;
        import org.springframework.web.bind.annotation.RequestMapping;
        import org.springframework.web.bind.annotation.RestController;
        import org.springframework.http.HttpStatus;
@RestController
@RequestMapping("/api/contacts")

public class ContactController {
    @Autowired
    private ContactService contactService;
    public ContactController() {
    }
    @PostMapping
    public ResponseEntity<Contact> createContact(@RequestBody Contact contact) {
        Contact createdContact = this.contactService.createContact(contact);
        return ResponseEntity.ok(createdContact);
    }
    @GetMapping({"/{id}"})
    public ResponseEntity<Contact> getContactById(@PathVariable long id) {
        Contact contact = this.contactService.getContactById(id);
        return contact != null ? ResponseEntity.ok(contact) :ResponseEntity.notFound().build();
    }
    @GetMapping
    public ResponseEntity<List<Contact>> getAllContact() {
        List<Contact> contact = this.contactService.getAllContact();
        return ResponseEntity.ok(contact);
    }
    @PutMapping({"/{id}"})
    public ResponseEntity<Contact> updateContact(@PathVariable long id, @RequestBody Contact contact) {
        Contact updatedContact = this.contactService.updateContact(id, contact);
        return updatedContact != null ? ResponseEntity.ok(updatedContact) :ResponseEntity.notFound().build();
    }
    @DeleteMapping({"/{id}"})
    public ResponseEntity<Void> deleteContact(@PathVariable long id) {
        this.contactService.deleteContact(id);
        return ResponseEntity.noContent().build();
    }

}


