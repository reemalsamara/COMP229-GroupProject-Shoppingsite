import React, { createContext, useContext, useState } from "react";
import api from "./api";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const u = localStorage.getItem("user");
        return u ? JSON.parse(u) : null;
    });

    const [token, setToken] = useState(() => localStorage.getItem("token"));

    const login = async (email, password) => {
        const res = await api.post("/auth/login", { email, password });
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
    };

    const register = async (name, email, password, role = "customer") => {
        const res = await api.post("/auth/register", { name, email, password, role });
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
