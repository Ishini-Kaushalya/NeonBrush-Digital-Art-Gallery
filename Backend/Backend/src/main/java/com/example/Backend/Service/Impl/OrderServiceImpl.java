package com.example.Backend.Service.Impl;

import com.example.Backend.Model.Order;
import com.example.Backend.Repository.OrderRepository;
import com.example.Backend.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Override
    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public Order getOrderById(long id) {
        Optional<Order> order = orderRepository.findById(id);
        return order.orElse(null);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order updateOrder(long id, Order order) {
        if (orderRepository.existsById(id)) {
            order.setOrder_Id(id);
            return orderRepository.save(order);
        }
        return null;
    }

    @Override
    public void deleteOrder(long id) {
        orderRepository.deleteById(id);
    }
}
