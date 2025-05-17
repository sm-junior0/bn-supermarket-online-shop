package com.sheja.supermarket.controller;

import com.sheja.supermarket.model.Purchased;
import com.sheja.supermarket.service.PurchasedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin()
@RequestMapping("/api/purchased")
public class PurchasedController {
    @Autowired
    private PurchasedService purchasedService;

    @GetMapping
    public List<Purchased> getAllPurchased() {
        return purchasedService.getAllPurchased();
    }

    @GetMapping("/{id}")
    public Optional<Purchased> getPurchasedById(@PathVariable Long id) {
        return purchasedService.getPurchasedById(id);
    }

    @PostMapping
    public Purchased savePurchased(@RequestBody Purchased purchased) {
        return purchasedService.savePurchased(purchased);
    }

    @PutMapping("/{id}")
    public Purchased updatePurchased(@PathVariable Long id, @RequestBody Purchased updatedPurchased) {
        return purchasedService.getPurchasedById(id)
            .map(purchased -> {
                purchased.setProductCode(updatedPurchased.getProductCode());
                purchased.setQuantity(updatedPurchased.getQuantity());
                purchased.setTotal(updatedPurchased.getTotal());
                purchased.setDate(updatedPurchased.getDate());
                return purchasedService.savePurchased(purchased);
            })
            .orElseThrow(() -> new RuntimeException("Purchased not found"));
    }

    @DeleteMapping("/{id}")
    public void deletePurchased(@PathVariable Long id) {
        purchasedService.deletePurchased(id);
    }
} 