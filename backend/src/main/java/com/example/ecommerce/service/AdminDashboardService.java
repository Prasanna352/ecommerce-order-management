package com.example.ecommerce.service;

import com.example.ecommerce.dto.DashboardResponse;
import com.example.ecommerce.repository.OrderRepository;
import com.example.ecommerce.repository.ProductRepository;
import com.example.ecommerce.repository.UserRepository;

import org.springframework.stereotype.Service;

@Service
public class AdminDashboardService {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public AdminDashboardService(
            ProductRepository productRepository,
            OrderRepository orderRepository,
            UserRepository userRepository) {

        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    public DashboardResponse getDashboardData() {

        long totalProducts = productRepository.count();

        long totalOrders = orderRepository.count();

        long totalCustomers = userRepository.countByRole("CUSTOMER");

        Double sales = orderRepository.getTotalSales();

        double totalSales = sales != null ? sales : 0.0;

        return new DashboardResponse(
                totalProducts,
                totalOrders,
                totalCustomers,
                totalSales
        );
    }
}