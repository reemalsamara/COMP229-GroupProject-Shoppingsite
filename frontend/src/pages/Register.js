import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await register(name, email, password);
            navigate("/");
        } catch (err) {
            const msg =
                err.response?.data?.message ||
                err.message ||
                "Registration failed";
            setError(msg);
            console.error("Register error:", err);
        }
    };

    return (
        <div>
            <h2>Create Account</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={submit}>
                <div>
                    <input
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button>Create</button>
            </form>
        </div>
    );
};

export default Register;
