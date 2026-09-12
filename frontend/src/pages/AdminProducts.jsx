import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AdminProducts() {

    const [products, setProducts] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [editingProductId, setEditingProductId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
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

    const clearForm = () => {
        setName("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setImageUrl("");
        setEditingProductId(null);
    };

    const addProduct = async (event) => {

        event.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await api.post(
                "/api/products",
                {
                    name: name,
                    description: description,
                    price: Number(price),
                    quantity: Number(quantity),
                    imageUrl: imageUrl
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Product added successfully");

            clearForm();
            loadProducts();

        } catch (error) {

            console.error(error);

            if (error.response?.status === 403) {
                alert("You are not authorized as ADMIN");
            } else {
                alert("Unable to add product");
            }
        }
    };

    const startEdit = (product) => {

        setEditingProductId(product.id);

        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setQuantity(product.quantity);
        setImageUrl(product.imageUrl || "");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const updateProduct = async (event) => {

        event.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await api.put(
                `/api/products/${editingProductId}`,
                {
                    name: name,
                    description: description,
                    price: Number(price),
                    quantity: Number(quantity),
                    imageUrl: imageUrl
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Product updated successfully");

            clearForm();
            loadProducts();

        } catch (error) {

            console.error(error);

            if (error.response?.status === 403) {
                alert("You are not authorized as ADMIN");
            } else {
                alert("Unable to update product");
            }
        }
    };

    const deleteProduct = async (productId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const token = localStorage.getItem("token");

            await api.delete(
                `/api/products/${productId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Product deleted successfully");

            loadProducts();

        } catch (error) {

            console.error(error);

            if (error.response?.status === 403) {
                alert("You are not authorized as ADMIN");
            } else {
                alert("Unable to delete product");
            }
        }
    };

    return (

        <div className="admin-page">

            <div className="page-title">
    <h1>Admin Product Management</h1>
    <p>Add, update and manage products</p>
</div>
            <div className="admin-form-container">

                <h2>
                    {editingProductId
                        ? "Edit Product"
                        : "Add New Product"}
                </h2>

                <form
                    className="admin-product-form"
                    onSubmit={
                        editingProductId
                            ? updateProduct
                            : addProduct
                    }
                >

                    <input
                        type="text"
                        placeholder="Product Name"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                        required
                    />

                    <textarea
                        placeholder="Product Description"
                        value={description}
                        onChange={(event) =>
                            setDescription(event.target.value)
                        }
                        required
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(event) =>
                            setPrice(event.target.value)
                        }
                        min="0"
                        required
                    />

                    <input
                        type="number"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(event) =>
                            setQuantity(event.target.value)
                        }
                        min="0"
                        required
                    />

                    <input
                        type="text"
                        placeholder="Image URL"
                        value={imageUrl}
                        onChange={(event) =>
                            setImageUrl(event.target.value)
                        }
                    />

                    <button type="submit">

                        {editingProductId
                            ? "Update Product"
                            : "Add Product"}

                    </button>

                    {editingProductId && (

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={clearForm}
                        >
                            Cancel Edit
                        </button>

                    )}

                </form>

            </div>

            <div className="admin-products">

                <h2>Existing Products</h2>

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

                            <p>
                                {product.description}
                            </p>

                            <h3>
                                ₹{product.price}
                            </h3>

                            <p>
                                Stock: {product.quantity}
                            </p>

                            <button
                                onClick={() =>
                                    startEdit(product)
                                }
                            >
                                Edit
                            </button>

                            <button
                                className="delete-button"
                                onClick={() =>
                                    deleteProduct(product.id)
                                }
                            >
                                Delete
                            </button>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default AdminProducts;