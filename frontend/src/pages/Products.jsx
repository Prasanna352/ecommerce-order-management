import { useEffect, useState } from "react";
import api from "../services/api";

function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get(
                "/api/products",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setProducts(response.data);

        } catch (error) {
            console.error(error);
            alert("Unable to load products");
        }
    };

    const addToCart = async (productId) => {

        try {

            const token = localStorage.getItem("token");

            await api.post(
                "/api/cart/add",
                {
                    productId: productId,
                    quantity: 1
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Product added to cart");

        } catch (error) {

            console.error(error);

            if (error.response) {

                alert(
                    error.response.data?.message ||
                    "Unable to add product to cart"
                );

            } else {

                alert("Unable to connect to server");

            }
        }
    };

    return (

        <div className="products-page">

            <div className="page-title">
                <h1>Products</h1>
                <p>Browse our available products</p>
            </div>

            <div className="product-container">

                {products.map((product) => (

                    <div
                        className="product-card"
                        key={product.id}
                    >

                        <img
                            src={product.imageUrl}
                            alt={product.name}
                        />

                        <h2>{product.name}</h2>

                        <p>{product.description}</p>

                        <h3>₹{product.price}</h3>

                        <p>
                            Available: {product.quantity}
                        </p>

                        <button
                            onClick={() =>
                                addToCart(product.id)
                            }
                            disabled={product.quantity === 0}
                        >
                            {product.quantity === 0
                                ? "Out of Stock"
                                : "Add to Cart"}
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Products;