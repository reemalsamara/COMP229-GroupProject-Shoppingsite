import React, { useEffect, useState } from "react";
import api from "../api";

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api
            .get("/products")
            .then((res) => setProducts(res.data))
            .catch(console.error);
    }, []);

    return (
        <div>
            <h1>Welcome to Shopping Site</h1>
            <h2>Products</h2>

            {products.length === 0 ? (
                <p>No products yet.</p>
            ) : (
                <ul>
                    {products.map((p) => (
                        <li key={p._id}>
                            {p.name} - ${p.price}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Home;
