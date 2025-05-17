package com.sheja.supermarket.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Quantity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String productCode;
    private int quantity;
    private String operation;
    private LocalDate date;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getProductCode() { return productCode; }
    public void setProductCode(String productCode) { this.productCode = productCode; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public String getOperation() { return operation; }
    public void setOperation(String operation) { this.operation = operation; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
} 