package com.example.Backend.Controller;

import com.example.Backend.Model.Payment;
import com.example.Backend.Service.NotificationService;
import com.example.Backend.Service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private NotificationService notificationService;

    // Create a payment
    @PostMapping
    public ResponseEntity<Payment> createPayment(@RequestBody Payment payment) {
        try {
            // Log the received payload for debugging
            System.out.println("Received Payment: " + payment);
            Payment createdPayment = paymentService.createPayment(payment);

            // Send notifications to artists
            Map<String, Object> cartAsObject = payment.getCartAsObject();
            for (Map.Entry<String, Object> entry : cartAsObject.entrySet()) {
                Map<String, Object> item = (Map<String, Object>) entry.getValue();
                String artistUsername = (String) item.get("userName");
                String message = "Your artwork '" + item.get("title") + "' has been purchased!";
                notificationService.createNotification(artistUsername, message);
            }

            return ResponseEntity.ok(createdPayment);
        } catch (Exception e) {
            System.err.println("Error creating payment: " + e.getMessage());
            return ResponseEntity.status(400).body(null);
        }
    }

    // Get payment by ID
    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable String id) {
        Payment payment = paymentService.getPaymentById(id);
        return payment != null ? ResponseEntity.ok(payment) : ResponseEntity.notFound().build();
    }

    // Get all payments
    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments() {
        List<Payment> payments = paymentService.getAllPayment();
        return ResponseEntity.ok(payments);
    }

    // Update payment by ID
    @PutMapping("/{id}")
    public ResponseEntity<Payment> updatePayment(@PathVariable String id, @RequestBody Payment payment) {
        Payment updatedPayment = paymentService.updatePayment(id, payment);
        return updatedPayment != null ? ResponseEntity.ok(updatedPayment) : ResponseEntity.notFound().build();
    }

    // Delete payment by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable String id) {
        paymentService.deletePayment(id);
        return ResponseEntity.noContent().build();
    }
}