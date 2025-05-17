package com.sheja.supermarket.controller;

import com.sheja.supermarket.model.Product;
import com.sheja.supermarket.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin()
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{code}")
    public Optional<Product> getProductByCode(@PathVariable String code) {
        return productService.getProductByCode(code);
    }

    @PostMapping
    public Product saveProduct(@RequestBody Product product) {
        return productService.saveProduct(product);
    }

    @DeleteMapping("/{code}")
    public void deleteProduct(@PathVariable String code) {
        productService.deleteProduct(code);
    }

    @PutMapping("/{code}")
    public Product updateProduct(@PathVariable String code, @RequestBody Product updatedProduct) {
        return productService.getProductByCode(code)
            .map(product -> {
                product.setName(updatedProduct.getName());
                product.setProductType(updatedProduct.getProductType());
                product.setPrice(updatedProduct.getPrice());
                product.setInDate(updatedProduct.getInDate());
                product.setImage(updatedProduct.getImage());
                return productService.saveProduct(product);
            })
            .orElseThrow(() -> new RuntimeException("Product not found"));
    }
} 