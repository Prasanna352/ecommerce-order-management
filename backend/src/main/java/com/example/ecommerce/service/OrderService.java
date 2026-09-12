package com.example.ecommerce.service;

import com.example.ecommerce.entity.Cart;
import java.util.Arrays;
import com.example.ecommerce.entity.CartItem;
import com.example.ecommerce.entity.Order;
import com.example.ecommerce.entity.OrderItem;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.entity.User;

import com.example.ecommerce.repository.CartRepository;
import com.example.ecommerce.repository.OrderRepository;
import com.example.ecommerce.repository.ProductRepository;
import com.example.ecommerce.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    public OrderService(
            OrderRepository orderRepository,
            UserRepository userRepository,
            CartRepository cartRepository,
            ProductRepository productRepository) {

        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public Order checkout(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() ->
                        new RuntimeException("Cart not found"));

        if (cart.getItems().isEmpty()) {

            throw new RuntimeException(
                    "Cart is empty");
        }

        Order order = new Order();

        order.setUser(user);
        order.setStatus("PLACED");
        order.setOrderDate(LocalDateTime.now());

        List<OrderItem> orderItems =
                new ArrayList<>();

        double totalAmount = 0.0;

        for (CartItem cartItem : cart.getItems()) {

            Product product = cartItem.getProduct();

            int cartQuantity =
                    cartItem.getQuantity();

            if (cartQuantity > product.getQuantity()) {

                throw new RuntimeException(
                        "Not enough stock for product: "
                                + product.getName());
            }

            double itemTotal =
                    product.getPrice() * cartQuantity;

            totalAmount += itemTotal;

            OrderItem orderItem =
                    new OrderItem(
                            order,
                            product,
                            cartQuantity,
                            product.getPrice()
                    );

            orderItems.add(orderItem);

            product.setQuantity(
                    product.getQuantity()
                            - cartQuantity
            );

            productRepository.save(product);
        }

        order.setTotalAmount(totalAmount);
        order.setItems(orderItems);

        Order savedOrder =
                orderRepository.save(order);

        cart.getItems().clear();

        cartRepository.save(cart);

        return savedOrder;
    }

    public List<Order> getMyOrders(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return orderRepository
                .findByUserOrderByOrderDateDesc(user);
    }

    public Order getOrderById(
            String email,
            Long orderId) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Order order = orderRepository
                .findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Order not found"));

        if (!order.getUser().getId()
                .equals(user.getId())) {

            throw new RuntimeException(
                    "You cannot access this order");
        }

        return order;
    }
    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByOrderDateDesc();
    }

    public Order updateOrderStatus(Long orderId, String status) {

        List<String> allowedStatuses = Arrays.asList(
                "PLACED",
                "CONFIRMED",
                "SHIPPED",
                "DELIVERED"
        );

        if (!allowedStatuses.contains(status)) {
            throw new RuntimeException("Invalid order status");
        }

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status);

        return orderRepository.save(order);
    }
}