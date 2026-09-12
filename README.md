# E-Commerce & Order Management System

A full-stack e-commerce web application developed using Java Spring Boot, React.js, and MySQL.

This application allows customers to register and login, browse products, manage their shopping cart, place orders, and track order status. Administrators can manage products, view customer orders, update order status, and monitor overall application statistics through an admin dashboard.

---

## Features

### Customer Features

- Customer registration
- Customer login
- JWT-based authentication
- Browse available products
- View product information
- Add products to shopping cart
- Update cart quantity
- Remove products from cart
- View cart total
- Checkout and place orders
- Automatic stock reduction after checkout
- View order history
- View order details
- Track order status
- Logout

### Admin Features

- Admin login
- Role-based admin access
- Admin dashboard
- View total number of products
- View total number of orders
- View total number of customers
- View total sales
- Add new products
- Edit existing products
- Delete products
- View all customer orders
- View ordered products
- Update order status

---

## Order Status Flow

Orders follow the following status flow:

PLACED → CONFIRMED → SHIPPED → DELIVERED

The customer can view the updated order status from the My Orders page.

---

## Technologies Used

### Backend

- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- REST APIs
- JWT
- Maven

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Axios
- React Router

### Database

- MySQL

### Development Tools

- Spring Tool Suite (STS)
- Visual Studio Code
- Git
- GitHub

---

## Project Architecture

The backend follows a layered architecture.

```text
Client
  |
  | HTTP Request
  ↓
Controller
  |
  ↓
Service
  |
  ↓
Repository
  |
  ↓
MySQL Database
