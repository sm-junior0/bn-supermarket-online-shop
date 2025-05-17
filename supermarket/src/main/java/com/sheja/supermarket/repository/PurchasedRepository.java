package com.sheja.supermarket.repository;

import com.sheja.supermarket.model.Purchased;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchasedRepository extends JpaRepository<Purchased, Long> {} 