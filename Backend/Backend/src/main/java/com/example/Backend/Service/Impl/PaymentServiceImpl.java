package com.example.Backend.Service.Impl;

import com.example.Backend.Model.Payment;
import com.example.Backend.Repository.PaymentRepository;
import com.example.Backend.Service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class PaymentServiceImpl implements PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;
    @Override
    public Payment createPayment(Payment payment) {
        return paymentRepository.save(payment);
    }
    @Override
    public Payment getPaymentById(long id) {
        Optional<Payment> payment = paymentRepository.findById(id);
        return payment.orElse(null);
    }
    @Override
    public List<Payment> getAllPayment() {
        return paymentRepository.findAll();
    }
    @Override
    public Payment updatePayment(long id, Payment payment) {
        if (paymentRepository.existsById(id)) { payment.setPayment_id(id);
            return paymentRepository.save(payment);
        }
        return null; // Return null or throw an exception if not found
    }
    @Override
    public void deletePayment(long id) {
        paymentRepository.deleteById(id);
    }
}
