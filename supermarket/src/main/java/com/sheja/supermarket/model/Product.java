package com.sheja.supermarket.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.time.LocalDate;

@Entity
public class Product {
    @Id
    private String code;
    private String name;
    private String productType;
    private double price;
    private LocalDate inDate;
    private String image;

    // Getters and Setters
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getProductType() { return productType; }
    public void setProductType(String productType) { this.productType = productType; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public LocalDate getInDate() { return inDate; }
    public void setInDate(LocalDate inDate) { this.inDate = inDate; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
} 