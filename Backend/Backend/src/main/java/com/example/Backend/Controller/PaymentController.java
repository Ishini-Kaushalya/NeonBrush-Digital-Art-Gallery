package com.example.Backend.Controller;

import com.example.Backend.Model.Payment;
import com.example.Backend.Service.PaymentService;
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

import java.util.List;
@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;
    public PaymentController() {
    }
    @PostMapping
    public ResponseEntity<Payment> createPayment(@RequestBody Payment payment) {
        Payment createdPayment = this.paymentService.createPayment(payment);
        return ResponseEntity.ok(createdPayment);
    }
    @GetMapping({"/{id}"})
    public ResponseEntity<Payment> getPaymentById(@PathVariable long id) {
        Payment payment = this.paymentService.getPaymentById(id);
        return payment != null ? ResponseEntity.ok(payment) :ResponseEntity.notFound().build();
    }
    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayment() {
        List<Payment> payment = this.paymentService.getAllPayment();
        return ResponseEntity.ok(payment);
    }
    @PutMapping({"/{id}"})
    public ResponseEntity<Payment> updatePayment(@PathVariable long id, @RequestBody Payment payment) {
        Payment updatedPayment = this.paymentService.updatePayment(id, payment);
        return updatedPayment != null ? ResponseEntity.ok(updatedPayment) :ResponseEntity.notFound().build();
    }
    @DeleteMapping({"/{id}"})
    public ResponseEntity<Void> deletePayment(@PathVariable long id) {
        this.paymentService.deletePayment(id);
        return ResponseEntity.noContent().build();
    }
}
