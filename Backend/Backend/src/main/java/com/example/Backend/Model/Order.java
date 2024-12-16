package com.example.Backend.Model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "OrderItems")
public class Order {
    @Id
    private long order_Id;
    private long object_Id;
    private int quantity;
    private double price;
    private String orderStatus;

    public long getOrder_Id() {
        return order_Id;
    }

    public long getObject_Id() {
        return object_Id;
    }

    public int getQuantity() {
        return quantity;
    }

    public double getPrice() {
        return price;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrder_Id(long order_Id) {
        this.order_Id = order_Id;
    }

    public void setObject_Id(long object_Id) {
        this.object_Id = object_Id;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }
}
