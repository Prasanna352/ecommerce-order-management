import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("role");

        navigate("/");
    };

    return (
        <nav className="navbar">

            <div
                className="navbar-brand"
                onClick={() =>
                    role === "ADMIN"
                        ? navigate("/admin/dashboard")
                        : navigate("/products")
                }
            >
                E-Commerce
            </div>

            <div className="navbar-links">

                <button onClick={() => navigate("/products")}>
                    Products
                </button>

                <button onClick={() => navigate("/cart")}>
                    Cart
                </button>

                <button onClick={() => navigate("/orders")}>
                    My Orders
                </button>

                {role === "ADMIN" && (
                    <>
                        <button
                            onClick={() =>
                                navigate("/admin/dashboard")
                            }
                        >
                            Dashboard
                        </button>

                        <button
                            onClick={() =>
                                navigate("/admin/products")
                            }
                        >
                            Products Management
                        </button>

                        <button
                            onClick={() =>
                                navigate("/admin/orders")
                            }
                        >
                            Order Management
                        </button>
                    </>
                )}

                <span className="navbar-user">
                    {email}
                </span>

                <button
                    className="logout-button"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;