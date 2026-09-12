import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AdminDashboard() {

    const [dashboard, setDashboard] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/api/admin/dashboard",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setDashboard(response.data);

        } catch (error) {

            console.error(error);

            if (error.response?.status === 403) {
                alert("You are not authorized as ADMIN");
            } else {
                alert("Unable to load dashboard");
            }
        }
    };

    if (!dashboard) {
        return <h2>Loading dashboard...</h2>;
    }

    return (

        <div className="admin-dashboard">

            <div className="page-title">
    <h1>Admin Dashboard</h1>
    <p>Overview of your e-commerce application</p>
</div>

            <div className="dashboard-cards">

                <div className="dashboard-card">

                    <h2>Total Products</h2>

                    <p>
                        {dashboard.totalProducts}
                    </p>

                </div>

                <div className="dashboard-card">

                    <h2>Total Orders</h2>

                    <p>
                        {dashboard.totalOrders}
                    </p>

                </div>

                <div className="dashboard-card">

                    <h2>Total Customers</h2>

                    <p>
                        {dashboard.totalCustomers}
                    </p>

                </div>

                <div className="dashboard-card">

                    <h2>Total Sales</h2>

                    <p>
                        ₹{dashboard.totalSales}
                    </p>

                </div>

            </div>

            <div className="dashboard-actions">

                <h2>Quick Actions</h2>

                <div className="action-buttons">

                    <button
                        onClick={() =>
                            navigate("/admin/products")
                        }
                    >
                        Manage Products
                    </button>

                    <button
                        onClick={() =>
                            navigate("/admin/orders")
                        }
                    >
                        Manage Orders
                    </button>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;