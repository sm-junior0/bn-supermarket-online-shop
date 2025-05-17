package com.sheja.supermarket.controller;

import com.sheja.supermarket.model.Quantity;
import com.sheja.supermarket.service.QuantityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin()
@RequestMapping("/api/quantities")
public class QuantityController {
    @Autowired
    private QuantityService quantityService;

    @GetMapping
    public List<Quantity> getAllQuantities() {
        return quantityService.getAllQuantities();
    }

    @GetMapping("/{id}")
    public Optional<Quantity> getQuantityById(@PathVariable Long id) {
        return quantityService.getQuantityById(id);
    }

    @PostMapping
    public Quantity saveQuantity(@RequestBody Quantity quantity) {
        return quantityService.saveQuantity(quantity);
    }

    @DeleteMapping("/{id}")
    public void deleteQuantity(@PathVariable Long id) {
        quantityService.deleteQuantity(id);
    }

    @PutMapping("/{id}")
    public Quantity updateQuantity(@PathVariable Long id, @RequestBody Quantity updatedQuantity) {
        return quantityService.getQuantityById(id)
            .map(quantity -> {
                quantity.setProductCode(updatedQuantity.getProductCode());
                quantity.setQuantity(updatedQuantity.getQuantity());
                quantity.setOperation(updatedQuantity.getOperation());
                quantity.setDate(updatedQuantity.getDate());
                return quantityService.saveQuantity(quantity);
            })
            .orElseThrow(() -> new RuntimeException("Quantity not found"));
    }

} 