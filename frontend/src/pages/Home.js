import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import bannerImageUrl from "..\\frontend\\public\\Home_Banner.png";


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
            <h1>Welcome to ShopStack</h1>
            <div className="promo-banner">
                <img 
                    src={bannerImageUrl} 
                    alt="Promotional Banner: Summer Sale" 
                    onError={(e) => { e.target.style.display = 'none'; e.target.closest('.promo-banner').style.background = '#007bff'; }}
                />
                <div className="banner-content">
                    <h2>🔥 End of Season Blowout!</h2>
                    <p>Discover massive discounts on all categories. Limited stock available—shop now and save big!</p>
                    <Link to="/products"> 
                        <button>Shop All Deals</button>
                    </Link>
                </div>
            </div>



            <h2>Products</h2>


            {products.length === 0 ? (
                <p>No products yet.</p>
            ) : (
                <ul className="product-list">
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
