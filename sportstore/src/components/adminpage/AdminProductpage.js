  import React, { useState ,useEffect} from 'react'
  import axios from "axios";
  import productService from "../../services/productServices";
  import { Link } from 'react-router-dom';

  const AdminproductPage = () => {
      const [products, setProducts] = useState("");
      useEffect(() => {
        productService
          .getAll()
          .then((res) => {
            setProducts(res.data);
          })
          .catch((err) => console.log(err));
      }, []);
    
      const handleDeleteProduct = async (productId) => {
        try {
          const token = window.localStorage.getItem('token');
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
      
          await axios.delete(`http://localhost:4000/product/${productId}`, config);
          setProducts(products.filter((product) => product._id !== productId));
          alert("Product has been removed.");
        } catch (error) {
          console.log(error);
        }
      };
      

      return (
          <>

  <div class="container py-5">
  <Link to="/CreateProductForm">
              <button className="btn btn-success fw-bold fs-5">Add New Products</button>
            </Link>
          <h2 className="text-danger">Products Details</h2>
          {/* {
                          products && products?.data.map([product] => )
                          } */}
          <div class="col mt-2">
          {products &&
                    products?.data.map((product) => {
                      return (
            <div class="col-md-10">
              <div class="card shadow-md mb-10 bg-body rounded mt-5 border-dark">
              <div class="card-body">
    <div class="row">
      <div class="col-md-4">
        <div class="container text-center py-3">
          <img src={`http://localhost:4000${product.photos[0]}`} class="card-img-top" alt="..." />
        </div>
      </div>
      <div class="col-md-8">
        <div>
          <h5 class="card-title">{product.name}</h5>
          <h5>Description:{product.desc}</h5>
          <h5>Rs {product.price}</h5>
          <h5>Address: {product.address}</h5>
        </div>
        <div class="card-footer">
        <Link to={`/EditProductPage/${product.id}`} state={{ productId: product._id, product }}>
    <button className="btn btn-success fw-bold fs-5" type="submit">Edit</button>
        </Link>
          <button
            className="btn btn-danger fw-bold fs-5"
            onClick={() => handleDeleteProduct(product._id)}
          >
            Delete
          </button>
        
        </div>
      </div>
    </div>
  
  </div>
              </div>
              
            </div>
            
  );
  })}

  
          </div>
        </div>
          </>
      )
  }

  export default AdminproductPage
