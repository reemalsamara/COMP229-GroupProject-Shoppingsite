import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const active = (path) =>
        location.pathname === path ? { fontWeight: "bold" } : {};

    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem",
                background: "#eee",
            }}
        >
            <div>
                <Link to="/" style={{ textDecoration: "none", fontWeight: "bold" }}>
                    Shopping Site
                </Link>
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <Link to="/" style={active("/")}>
                    Home
                </Link>

                {user && (
                    <Link to="/products" style={active("/products")}>
                        Products
                    </Link>
                )}

                {!user && (
                    <>
                        <Link to="/login" style={active("/login")}>
                            Sign In
                        </Link>
                        <Link to="/register" style={active("/register")}>
                            Sign Up
                        </Link>
                    </>
                )}

                {user && (
                    <>
                        <span>Hello, {user.name}</span>
                        <Link to="/profile" style={active("/profile")}>
                            My Profile
                        </Link>
                        <button onClick={logout}>Sign Out</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
