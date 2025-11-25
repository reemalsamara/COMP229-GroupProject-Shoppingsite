import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const ProductForm = () => {
    const { id } = useParams();
    const edit = Boolean(id);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const [stock, setStock] = useState(true);

    useEffect(() => {
        if (edit) {
            api
                .get("/products/" + id)
                .then((res) => {
                    const p = res.data;
                    setName(p.name);
                    setPrice(p.price);
                    setDesc(p.description || "");
                    setStock(p.inStock);
                })
                .catch(console.error);
        }
    }, [edit, id]);

    const submit = async (e) => {
        e.preventDefault();
        const data = {
            name,
            price: Number(price),
            description: desc,
            inStock: stock,
        };

        if (edit) await api.put("/products/" + id, data);
        else await api.post("/products", data);

        navigate("/products");
    };

    return (
        <div>
            <h2>{edit ? "Edit Product" : "New Product"}</h2>
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
                        placeholder="Price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <textarea
                        placeholder="Description"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={stock}
                            onChange={(e) => setStock(e.target.checked)}
                        />{" "}
                        In Stock
                    </label>
                </div>
                <button>Save</button>
            </form>
        </div>
    );
};

export default ProductForm;
