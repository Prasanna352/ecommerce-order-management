import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AdminOrders() {

    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get(
                "/api/orders/admin/all",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setOrders(response.data);

        } catch (error) {
            console.error(error);

            if (error.response?.status === 403) {
                alert("You are not authorized as ADMIN");
            } else {
                alert("Unable to load orders");
            }
        }
    };

    const updateStatus = async (orderId, status) => {

        try {
            const token = localStorage.getItem("token");

            await api.put(
                `/api/orders/admin/${orderId}/status`,
                {
                    status: status
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Order status updated successfully");

            loadOrders();

        } catch (error) {
            console.error(error);

            if (error.response?.status === 403) {
                alert("You are not authorized as ADMIN");
            } else {
                alert("Unable to update order status");
            }
        }
    };

    return (
        <div className="admin-orders-page">

            <div className="page-title">
    <h1>Order Management</h1>
    <p>View customer orders and update order status</p>
</div>

            {orders.length === 0 ? (

                <div className="empty-orders">

                    <h2>No orders found</h2>

                </div>

            ) : (

                <div className="admin-orders-container">

                    {orders.map((order) => (

                        <div
                            className="admin-order-card"
                            key={order.id}
                        >

                            <div className="admin-order-top">

                                <div>

                                    <h2>
                                        Order #{order.id}
                                    </h2>

                                    <p>
                                        Customer: {order.user?.email || "Customer"}
                                    </p>

                                    <p>
                                        Order Date:{" "}
                                        {new Date(
                                            order.orderDate
                                        ).toLocaleString()}
                                    </p>

                                </div>

                                <div className="admin-order-total">

                                    <strong>
                                        ₹{order.totalAmount}
                                    </strong>

                                </div>

                            </div>

                            <div className="admin-order-items">

                                <h3>Ordered Products</h3>

                                {order.items.map((item) => (

                                    <div
                                        className="admin-order-item"
                                        key={item.id}
                                    >

                                        <span>
                                            {item.product.name}
                                        </span>

                                        <span>
                                            Quantity: {item.quantity}
                                        </span>

                                        <span>
                                            ₹{item.price}
                                        </span>

                                    </div>

                                ))}

                            </div>

                            <div className="order-status-section">

                                <label>
                                    Order Status:
                                </label>

                                <select
                                    value={order.status}
                                    onChange={(event) =>
                                        updateStatus(
                                            order.id,
                                            event.target.value
                                        )
                                    }
                                >

                                    <option value="PLACED">
                                        PLACED
                                    </option>

                                    <option value="CONFIRMED">
                                        CONFIRMED
                                    </option>

                                    <option value="SHIPPED">
                                        SHIPPED
                                    </option>

                                    <option value="DELIVERED">
                                        DELIVERED
                                    </option>

                                </select>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default AdminOrders;