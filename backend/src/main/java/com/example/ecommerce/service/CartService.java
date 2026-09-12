package com.example.ecommerce.service;

import com.example.ecommerce.dto.AddToCartRequest;
import com.example.ecommerce.dto.UpdateCartItemRequest;
import com.example.ecommerce.entity.Cart;
import com.example.ecommerce.entity.CartItem;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.entity.User;
import com.example.ecommerce.repository.CartItemRepository;
import com.example.ecommerce.repository.CartRepository;
import com.example.ecommerce.repository.ProductRepository;
import com.example.ecommerce.repository.UserRepository;

import org.springframework.stereotype.Service;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartService(
            CartRepository cartRepository,
            CartItemRepository cartItemRepository,
            ProductRepository productRepository,
            UserRepository userRepository) {

        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public Cart addToCart(
            String email,
            AddToCartRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Product product = productRepository
                .findById(request.getProductId())
                .orElseThrow(() ->
                        new RuntimeException("Product not found"));

        if (request.getQuantity() == null ||
                request.getQuantity() <= 0) {

            throw new RuntimeException(
                    "Quantity must be greater than zero");
        }

        if (request.getQuantity() > product.getQuantity()) {

            throw new RuntimeException(
                    "Not enough product stock");
        }

        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() ->
                        cartRepository.save(
                                new Cart(user)
                        )
                );

        CartItem cartItem =
                cartItemRepository
                        .findByCartAndProduct(cart, product)
                        .orElse(null);

        if (cartItem != null) {

            int newQuantity =
                    cartItem.getQuantity()
                            + request.getQuantity();

            if (newQuantity > product.getQuantity()) {

                throw new RuntimeException(
                        "Not enough product stock");
            }

            cartItem.setQuantity(newQuantity);

        } else {

            cartItem = new CartItem(
                    cart,
                    product,
                    request.getQuantity()
            );

            cart.getItems().add(cartItem);
        }

        cartItemRepository.save(cartItem);

        return cart;
    }

    public Cart getCart(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return cartRepository.findByUser(user)
                .orElseGet(() ->
                        cartRepository.save(
                                new Cart(user)
                        )
                );
    }

    public Cart updateCartItem(
            String email,
            Long itemId,
            UpdateCartItemRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() ->
                        new RuntimeException("Cart not found"));

        CartItem cartItem =
                cartItemRepository.findById(itemId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Cart item not found"));

        if (!cartItem.getCart().getId()
                .equals(cart.getId())) {

            throw new RuntimeException(
                    "You cannot modify this cart item");
        }

        if (request.getQuantity() == null ||
                request.getQuantity() <= 0) {

            throw new RuntimeException(
                    "Quantity must be greater than zero");
        }

        if (request.getQuantity()
                > cartItem.getProduct().getQuantity()) {

            throw new RuntimeException(
                    "Not enough product stock");
        }

        cartItem.setQuantity(request.getQuantity());

        return cartItemRepository.save(cartItem)
                .getCart();
    }

    public void removeCartItem(
            String email,
            Long itemId) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() ->
                        new RuntimeException("Cart not found"));

        CartItem cartItem =
                cartItemRepository.findById(itemId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Cart item not found"));

        if (!cartItem.getCart().getId()
                .equals(cart.getId())) {

            throw new RuntimeException(
                    "You cannot remove this cart item");
        }

        cartItemRepository.delete(cartItem);
    }
}
