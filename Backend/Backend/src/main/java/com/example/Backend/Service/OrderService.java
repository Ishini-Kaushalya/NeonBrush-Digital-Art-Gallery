package com.example.Backend.Service;


import com.example.Backend.Model.Order;
import java.util.List;

public interface OrderService {
    Order createOrder(Order order);
    Order getOrderById(long id);
    List<Order> getAllOrders();
    Order updateOrder(long id, Order order);
    void deleteOrder(long id);
}
