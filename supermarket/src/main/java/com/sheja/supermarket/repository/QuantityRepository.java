package com.sheja.supermarket.repository;

import com.sheja.supermarket.model.Quantity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuantityRepository extends JpaRepository<Quantity, Long> {} 