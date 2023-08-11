import React, { useEffect, useState } from "react";
import productService from "../../services/productServices";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./product.css"; // Import your custom CSS file for styling

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState("");

  useEffect(() => {
    productService
      .getAll()
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Discover Our Collection</h1>
        <p>Explore a wide range of SportWear</p>
      </div>
      <div className="products-list">
        {products &&
          products.data.map((product) => {
            const productPic = `http://localhost:4000${product.photos[0]}`;

            return (
              <div key={product._id} className="product-card">
                <img
                  src={productPic}
                  className="product-image"
                  alt="Sunglasses"
                />
                <div className="product-details">
                  <h2 className="product-title">{product.name}</h2>
                  <p className="product-price">Rs {product.price}</p>
                  <Link
                    to={`/productDetail/${product._id}`}
                    state={{ productId: product._id, product }}
                  >
                    <button className="buy-button">Buy Now</button>
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Products;
