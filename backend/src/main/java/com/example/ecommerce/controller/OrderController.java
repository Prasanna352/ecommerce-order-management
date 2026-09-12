package com.example.ecommerce.controller;

import com.example.ecommerce.entity.Order;
import com.example.ecommerce.service.OrderService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.example.ecommerce.dto.UpdateOrderStatusRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/checkout")
    public ResponseEntity<Order> checkout(
            Authentication authentication) {

        String email = authentication.getName();

        Order order =
                orderService.checkout(email);

        return ResponseEntity.ok(order);
    }

    @GetMapping
    public ResponseEntity<List<Order>> getMyOrders(
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                orderService.getMyOrders(email)
        );
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(
            @PathVariable Long orderId,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                orderService.getOrderById(
                        email,
                        orderId
                )
        );
    }
    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Order>> getAllOrders() {

        return ResponseEntity.ok(
                orderService.getAllOrders()
        );
    }
    @PutMapping("/admin/{orderId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestBody UpdateOrderStatusRequest request) {

        return ResponseEntity.ok(
                orderService.updateOrderStatus(
                        orderId,
                        request.getStatus()
                )
        );
    }
}
