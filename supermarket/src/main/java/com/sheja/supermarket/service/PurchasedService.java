package com.sheja.supermarket.service;

import com.sheja.supermarket.model.Purchased;
import com.sheja.supermarket.repository.PurchasedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PurchasedService {
    @Autowired
    private PurchasedRepository purchasedRepository;

    public List<Purchased> getAllPurchased() {
        return purchasedRepository.findAll();
    }

    public Optional<Purchased> getPurchasedById(Long id) {
        return purchasedRepository.findById(id);
    }

    public Purchased savePurchased(Purchased purchased) {
        return purchasedRepository.save(purchased);
    }

    public void deletePurchased(Long id) {
        purchasedRepository.deleteById(id);
    }
} 