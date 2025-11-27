import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import './App.css';

import { AuthProvider, useAuth } from "./AuthContext";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import ProductForm from "./pages/ProductForm";
import NotFound from "./pages/NotFound";


const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <div className="app-container">
      <Router>
        <Navbar />
        <div className="page-content" /*style={{ padding: "1rem" }}*/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/products"
              element={
                <ProtectedRoute roles={["admin", "customer"]}>
                  <Products />
                </ProtectedRoute>
              }
            />

            <Route
              path="/products/new"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <ProductForm />
                </ProtectedRoute>
              }
            />

            <Route
              path="/products/:id/edit"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <ProductForm />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
