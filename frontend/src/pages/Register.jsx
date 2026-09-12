import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (event) => {

        event.preventDefault();

        try {

            await api.post(
                "/api/auth/register",
                {
                    name: name,
                    email: email,
                    password: password
                }
            );

            alert("Registration successful");

            navigate("/");

        } catch (error) {

            console.error(error);

            alert("Registration failed");
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-box">

                <h1>E-Commerce</h1>

                <h2>Create Account</h2>

                <form onSubmit={handleRegister}>

                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                        required
                    />

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
                        Register
                    </button>

                </form>

                <p>
                    Already have an account?
                </p>

                <button
                    className="secondary-button"
                    onClick={() => navigate("/")}
                >
                    Back to Login
                </button>

            </div>

        </div>
    );
}

export default Register;