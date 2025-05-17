package com.sheja.supermarket.service;

import com.sheja.supermarket.model.*;
import com.sheja.supermarket.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private PurchasedRepository purchasedRepository;

    public Cart createCart(Long customerId) {
        Cart cart = new Cart();
        cart.setCustomerId(customerId);
        cart.setCreatedDate(LocalDate.now());
        return cartRepository.save(cart);
    }

    public CartItem addItemToCart(Long cartId, String productCode, int quantity) {
        CartItem item = new CartItem();
        item.setCartId(cartId);
        item.setProductCode(productCode);
        item.setQuantity(quantity);
        return cartItemRepository.save(item);
    }

    public List<CartItem> getCartItems(Long cartId) {
        return cartItemRepository.findByCartId(cartId);
    }

    public void checkout(Long cartId, Long customerId) {
        List<CartItem> items = cartItemRepository.findByCartId(cartId);
        for (CartItem item : items) {
            Product product = productRepository.findById(item.getProductCode()).orElse(null);
            if (product != null) {
                Purchased purchased = new Purchased();
                purchased.setProductCode(product.getCode());
                purchased.setQuantity(item.getQuantity());
                purchased.setTotal(product.getPrice() * item.getQuantity());
                purchased.setDate(LocalDate.now());
                purchasedRepository.save(purchased);
            }
        }
        cartItemRepository.deleteAll(items);
        cartRepository.deleteById(cartId);
    }

    public void deleteCart(Long cartId) {
        cartRepository.deleteById(cartId);
    }

    public void deleteCartItem(Long itemId) {
        cartItemRepository.deleteById(itemId);
    }

    public CartItem updateCartItem(Long itemId, CartItem updatedItem) {
        return cartItemRepository.findById(itemId)
            .map(item -> {
                item.setProductCode(updatedItem.getProductCode());
                item.setQuantity(updatedItem.getQuantity());
                return cartItemRepository.save(item);
            })
            .orElseThrow(() -> new RuntimeException("CartItem not found"));
    }
} 