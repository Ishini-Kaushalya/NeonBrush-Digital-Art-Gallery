package com.example.Backend.Service;

import com.example.Backend.Model.Payment;
import com.example.Backend.Repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public Payment createPayment(Payment payment) {
        payment.setCreatedAt(new Date()); // Set the creation timestamp
        return paymentRepository.save(payment);
    }

    @Override
    public Payment getPaymentById(String id) {
        return paymentRepository.findById(id).orElse(null);
    }

    @Override
    public List<Payment> getAllPayment() {
        return paymentRepository.findAll();
    }

    @Override
    public Payment updatePayment(String id, Payment payment) {
        Payment existingPayment = paymentRepository.findById(id).orElse(null);
        if (existingPayment != null) {
            existingPayment.setUserName(payment.getUserName());
            existingPayment.setAddress(payment.getAddress());
            existingPayment.setNameOnCard(payment.getNameOnCard());
            existingPayment.setCardNumber(payment.getCardNumber());
            existingPayment.setExpirationDate(payment.getExpirationDate());
            existingPayment.setCVV(payment.getCVV());
            existingPayment.setCartAsObject(payment.getCartAsObject());
            existingPayment.setTotalAmount(payment.getTotalAmount());
            return paymentRepository.save(existingPayment);
        }
        return null;
    }

    @Override
    public void deletePayment(String id) {
        paymentRepository.deleteById(id);
    }
}