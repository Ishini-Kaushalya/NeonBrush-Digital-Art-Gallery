package com.example.Backend.Service;

import com.example.Backend.Model.Payment;

import java.util.List;

public interface PaymentService {
    Payment createPayment(Payment payment);
    Payment getPaymentById(String id);
    List<Payment> getAllPayment();
    Payment updatePayment(String id, Payment payment);
    void deletePayment(String id);
}