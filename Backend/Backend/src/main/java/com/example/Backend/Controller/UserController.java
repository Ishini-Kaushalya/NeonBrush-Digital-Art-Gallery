package com.example.Backend.Controller;

import com.example.Backend.Model.User;
import com.example.Backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;
    public UserController() {
    }
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = this.userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }
    @GetMapping({"/{id}"})
    public ResponseEntity<User> getUserById(@PathVariable long id) {
        User user = this.userService.getUserById(id);
        return user != null ? ResponseEntity.ok(user) :ResponseEntity.notFound().build();
    }
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> user = this.userService.getAllUsers();
        return ResponseEntity.ok(user);
    }
    @PutMapping({"/{id}"})
    public ResponseEntity<User> updateUser(@PathVariable long id, @RequestBody User user) {
        User updatedUser = this.userService.updateUser(id, user);
        return updatedUser != null ? ResponseEntity.ok(updatedUser) :ResponseEntity.notFound().build();
    }
    @DeleteMapping({"/{id}"})
    public ResponseEntity<Void> deleteUser(@PathVariable long id) {
        this.userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

}
