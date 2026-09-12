package com.example.ecommerce.controller;

import com.example.ecommerce.dto.AddToCartRequest;
import com.example.ecommerce.dto.UpdateCartItemRequest;
import com.example.ecommerce.entity.Cart;
import com.example.ecommerce.service.CartService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(
            @RequestBody AddToCartRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        Cart cart = cartService.addToCart(
                email,
                request
        );

        return ResponseEntity.ok(cart);
    }

    @GetMapping
    public ResponseEntity<Cart> getCart(
            Authentication authentication) {

        String email = authentication.getName();

        Cart cart = cartService.getCart(email);

        return ResponseEntity.ok(cart);
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<Cart> updateCartItem(
            @PathVariable Long itemId,
            @RequestBody UpdateCartItemRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        Cart cart = cartService.updateCartItem(
                email,
                itemId,
                request
        );

        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<String> removeCartItem(
            @PathVariable Long itemId,
            Authentication authentication) {

        String email = authentication.getName();

        cartService.removeCartItem(
                email,
                itemId
        );

        return ResponseEntity.ok(
                "Item removed from cart"
        );
    }
}