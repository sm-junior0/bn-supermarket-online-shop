package com.sheja.supermarket.repository;

import com.sheja.supermarket.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, String> {} 