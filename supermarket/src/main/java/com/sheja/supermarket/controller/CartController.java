package com.sheja.supermarket.controller;

import com.sheja.supermarket.model.Cart;
import com.sheja.supermarket.model.CartItem;
import com.sheja.supermarket.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin()
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @PostMapping("/create")
    public Cart createCart(@RequestParam Long customerId) {
        return cartService.createCart(customerId);
    }

    @PostMapping("/add-item")
    public CartItem addItemToCart(@RequestParam Long cartId, @RequestParam String productCode, @RequestParam int quantity) {
        return cartService.addItemToCart(cartId, productCode, quantity);
    }

    @GetMapping("/items/{cartId}")
    public List<CartItem> getCartItems(@PathVariable Long cartId) {
        return cartService.getCartItems(cartId);
    }

    @PostMapping("/checkout")
    public void checkout(@RequestParam Long cartId, @RequestParam Long customerId) {
        cartService.checkout(cartId, customerId);
    }

    @DeleteMapping("/{cartId}")
    public void deleteCart(@PathVariable Long cartId) {
        cartService.deleteCart(cartId);
    }

    @DeleteMapping("/item/{itemId}")
    public void deleteCartItem(@PathVariable Long itemId) {
        cartService.deleteCartItem(itemId);
    }

    @PutMapping("/item/{itemId}")
    public CartItem updateCartItem(@PathVariable Long itemId, @RequestBody CartItem updatedItem) {
        return cartService.updateCartItem(itemId, updatedItem);
    }
} 