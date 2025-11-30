import React, { useEffect, useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Products = () => {
    const [products, setProducts] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    const load = () => {
        api
            .get("/products")
            .then((res) => setProducts(res.data))
            .catch(console.error);
    };

    useEffect(() => {
        load();
    }, []);

    const del = async (id) => {
        if (!window.confirm("Delete?")) return;
        await api.delete("/products/" + id);
        load();
    };

    return (
        <div>
            {/*<h2>Products</h2>

            {user?.role === "admin" && (
                <button onClick={() => navigate("/products/new")}>Add</button>
            )}*/}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <h2>Products</h2>
                {user?.role === "admin" && (
                    <button onClick={() => navigate("/products/new")}>+ Add New Product</button>
                )}
            </div>

            {/*< table border="1" cellPadding={5} style={{ marginTop: "1rem" }}>*/}
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        {user?.role === "admin" && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr key={p._id}>
                            <td>{p.name}</td>
                            <td>${p.price}</td>
                            <td>{p.inStock ? "Yes" : "No"}</td>
                            {user?.role === "admin" && (
                                <td className="actions"> 
                                    <Link to={`/products/${p._id}/edit`}>Edit</Link>{" "}
                                    <button onClick={() => del(p._id)}>Delete</button>
                                </td>
                            )}
                        </tr>
                    ))}
                    {products.length === 0 && (
                        <tr className="empty-row">
                            <td colSpan={4}>No products yet.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Products;
