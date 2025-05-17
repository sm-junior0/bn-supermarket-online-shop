package com.sheja.supermarket.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Purchased {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String productCode;
    private int quantity;
    private double total;
    private LocalDate date;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getProductCode() { return productCode; }
    public void setProductCode(String productCode) { this.productCode = productCode; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public double getTotal() { return total; }
    public void setTotal(double total) { this.total = total; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
} 