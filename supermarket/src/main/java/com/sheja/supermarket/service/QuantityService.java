package com.sheja.supermarket.service;

import com.sheja.supermarket.model.Quantity;
import com.sheja.supermarket.repository.QuantityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuantityService {
    @Autowired
    private QuantityRepository quantityRepository;

    public List<Quantity> getAllQuantities() {
        return quantityRepository.findAll();
    }

    public Optional<Quantity> getQuantityById(Long id) {
        return quantityRepository.findById(id);
    }

    public Quantity saveQuantity(Quantity quantity) {
        return quantityRepository.save(quantity);
    }

    public void deleteQuantity(Long id) {
        quantityRepository.deleteById(id);
    }
} 