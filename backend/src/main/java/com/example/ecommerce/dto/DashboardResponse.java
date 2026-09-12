package com.example.ecommerce.dto;

public class DashboardResponse {

    private long totalProducts;
    private long totalOrders;
    private long totalCustomers;
    private double totalSales;

    public DashboardResponse() {
    }

    public DashboardResponse(
            long totalProducts,
            long totalOrders,
            long totalCustomers,
            double totalSales) {

        this.totalProducts = totalProducts;
        this.totalOrders = totalOrders;
        this.totalCustomers = totalCustomers;
        this.totalSales = totalSales;
    }

    public long getTotalProducts() {
        return totalProducts;
    }

    public void setTotalProducts(long totalProducts) {
        this.totalProducts = totalProducts;
    }

    public long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public long getTotalCustomers() {
        return totalCustomers;
    }

    public void setTotalCustomers(long totalCustomers) {
        this.totalCustomers = totalCustomers;
    }

    public double getTotalSales() {
        return totalSales;
    }

    public void setTotalSales(double totalSales) {
        this.totalSales = totalSales;
    }
}