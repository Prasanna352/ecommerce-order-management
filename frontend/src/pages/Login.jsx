import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (event) => {

        event.preventDefault();

        try {

            const response = await api.post(
                "/api/auth/login",
                {
                    email: email,
                    password: password
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "email",
                response.data.email
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            alert("Login successful");

            navigate("/products");

        } catch (error) {

            console.error(error);

            alert("Invalid email or password");
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-box">

                <h1>E-Commerce</h1>

                <h2>Login</h2>

                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        required
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

                <p>
                    Don't have an account?
                </p>

                <button
                    className="secondary-button"
                    onClick={() => navigate("/register")}
                >
                    Register
                </button>

            </div>

        </div>
    );
}

export default Login;