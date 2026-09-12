import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminDashboard from "./pages/AdminDashboard";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/products"
                    element={
                        <ProtectedRoute>
                            <>
                                <Navbar />
                                <Products />
                            </>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <>
                                <Navbar />
                                <Cart />
                            </>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/orders"
                    element={
                        <ProtectedRoute>
                            <>
                                <Navbar />
                                <Orders />
                            </>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/dashboard"
                    element={
                        <AdminRoute>
                            <>
                                <Navbar />
                                <AdminDashboard />
                            </>
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/products"
                    element={
                        <AdminRoute>
                            <>
                                <Navbar />
                                <AdminProducts />
                            </>
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/orders"
                    element={
                        <AdminRoute>
                            <>
                                <Navbar />
                                <AdminOrders />
                            </>
                        </AdminRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;