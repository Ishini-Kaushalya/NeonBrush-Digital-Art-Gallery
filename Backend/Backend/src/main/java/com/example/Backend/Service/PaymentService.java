package com.example.Backend.Service;

import com.example.Backend.Model.Payment;
import java.util.List;

public interface PaymentService {

    Payment createPayment(Payment payment);
    Payment getPaymentById(long id);
    List<Payment> getAllPayment();
    Payment updatePayment(long id, Payment payment);
    void deletePayment(long id);
}
