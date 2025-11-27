import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import logoImg from "..\\frontend\\public\\logo192.png";


const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const active = (path) =>
        location.pathname === path ? { fontWeight: "bold" } : {};

    return (
        <nav className="navbar"
            /*style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem",
                background: "#eee",
            }}*/
        >
            <div className="navbar-brand"> {/* Combined logo and brand */}
                <Link to="/">
                    <div className="logo">
                        <img src={logoImg} alt="ShopStack Logo" />
                    </div>
                    <h1>ShopStack</h1>
                </Link>
            </div>

            <div className="nav-links" /*style={{ display: "flex", gap: "1rem", alignItems: "center" }}*/>
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
