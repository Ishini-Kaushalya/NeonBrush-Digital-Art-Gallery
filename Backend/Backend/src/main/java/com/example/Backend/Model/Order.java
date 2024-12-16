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

    public void setOrder_Id(long order_Id) {
        this.order_Id = order_Id;
    }
}
