import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Orders() {

    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/api/orders",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setOrders(response.data);

        } catch (error) {

            console.error(error);
            alert("Unable to load orders");

        }
    };

    return (
        <div className="orders-page">

            

    <div className="page-title">
        <h1>My Orders</h1>
        <p>View your order history and current order status</p>
    </div>
            {orders.length === 0 ? (

                <div className="empty-orders">

                    <h2>No orders found</h2>

                    <button
                        onClick={() => navigate("/products")}
                    >
                        Browse Products
                    </button>

                </div>

            ) : (

                <div className="orders-container">

                    {orders.map((order) => (

                        <div
                            className="order-card"
                            key={order.id}
                        >

                            <div className="order-header">

                                <div>
                                    <h2>
                                        Order #{order.id}
                                    </h2>

                                    <p>
                                        Status: {order.status}
                                    </p>
                                </div>

                                <div>
                                    <strong>
                                        ₹{order.totalAmount}
                                    </strong>
                                </div>

                            </div>

                            <p>
                                Order Date:{" "}
                                {new Date(
                                    order.orderDate
                                ).toLocaleString()}
                            </p>

                            <div className="order-items">

                                {order.items.map((item) => (

                                    <div
                                        className="order-item"
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

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default Orders;