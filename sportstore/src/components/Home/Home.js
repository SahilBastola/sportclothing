import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import productService from "../../services/productServices";
import { useNavigate } from "react-router-dom";
import Contact from "./Contact";

const Home = () => {
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
    <>
      <section
        className="home pb-5"
        style={{
          height: "100vh",
          background: `url("https://www.sqsoccercustomizer.com/zupload/site-options/Website-banner11.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container-fluid">
          <div className="row d-flex justify-content-center">
            <div className="col-md-6 mt-5 py-3 text-center home-content">
              <div className="text-bg">
                <p className="text-light fw-bold fs-4">STYLE PICKS BEATS</p>
                <p className="text-light fw-bold fs-4">THE HEAT</p>
                <Link to="/Products" className="btn btn-buy fw-bold fs-5">
                  BUY NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Contact></Contact>
    </>
  );
};

export default Home;
