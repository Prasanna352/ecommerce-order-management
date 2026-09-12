import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Cart() {

    const [cart, setCart] = useState(null);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        getCart();
    }, []);

    const getCart = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get(
                "/api/cart",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCart(response.data);

            calculateTotal(response.data);

        } catch (error) {
            console.error(error);
            alert("Unable to load cart");
        }
    };

    const calculateTotal = (cartData) => {

        const cartTotal = cartData.items.reduce(
            (sum, item) =>
                sum + (item.product.price * item.quantity),
            0
        );

        setTotal(cartTotal);
    };

    const updateQuantity = async (itemId, quantity) => {

        if (quantity < 1) {
            return;
        }

        try {
            const token = localStorage.getItem("token");

            await api.put(
                `/api/cart/${itemId}`,
                {
                    quantity: quantity
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            getCart();

        } catch (error) {
            console.error(error);
            alert("Unable to update cart");
        }
    };

    const removeItem = async (itemId) => {

        try {
            const token = localStorage.getItem("token");

            await api.delete(
                `/api/cart/${itemId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            getCart();

        } catch (error) {
            console.error(error);
            alert("Unable to remove item");
        }
    };

    const checkout = async () => {

        if (!cart || cart.items.length === 0) {
            alert("Your cart is empty");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await api.post(
                "/api/orders/checkout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(
                `Order placed successfully! Order ID: ${response.data.id}`
            );

            navigate("/orders");

        } catch (error) {
            console.error(error);

            if (error.response) {
                alert(
                    error.response.data?.message ||
                    "Checkout failed"
                );
            } else {
                alert("Unable to connect to server");
            }
        }
    };

    if (!cart) {
        return <h2>Loading cart...</h2>;
    }

    return (
        <div className="cart-page">

            <div className="page-title">
        <h1>Shopping Cart</h1>
        <p>Review your items before checkout</p>
    </div>

            {cart.items.length === 0 ? (

                <div className="empty-cart">

                    <h2>Your cart is empty</h2>

                    <button
                        onClick={() => navigate("/products")}
                    >
                        Browse Products
                    </button>

                </div>

            ) : (

                <div className="cart-container">

                    {cart.items.map((item) => (

                        <div
                            className="cart-item"
                            key={item.id}
                        >

                            <img
                                src={item.product.imageUrl}
                                alt={item.product.name}
                            />

                            <div className="cart-item-details">

                                <h2>
                                    {item.product.name}
                                </h2>

                                <p>
                                    ₹{item.product.price}
                                </p>

                                <div className="quantity-controls">

                                    <button
                                        onClick={() =>
                                            updateQuantity(
                                                item.id,
                                                item.quantity - 1
                                            )
                                        }
                                    >
                                        -
                                    </button>

                                    <span>
                                        {item.quantity}
                                    </span>

                                    <button
                                        onClick={() =>
                                            updateQuantity(
                                                item.id,
                                                item.quantity + 1
                                            )
                                        }
                                    >
                                        +
                                    </button>

                                </div>

                                <button
                                    className="remove-button"
                                    onClick={() =>
                                        removeItem(item.id)
                                    }
                                >
                                    Remove
                                </button>

                            </div>

                            <h3>
                                ₹{item.product.price * item.quantity}
                            </h3>

                        </div>

                    ))}

                    <div className="cart-summary">

                        <h2>
                            Total: ₹{total}
                        </h2>

                        <button
                            className="checkout-button"
                            onClick={checkout}
                        >
                            Proceed to Checkout
                        </button>

                    </div>

                </div>
            )}

        </div>
    );
}

export default Cart;