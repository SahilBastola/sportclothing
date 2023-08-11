import React, { useEffect, useState } from "react";
import "./cart.css";
import cartService from "../../services/cart";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  let totalAmount = 0;
  const [showModal, setShowModal] = useState(false);
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userid = window.localStorage.getItem("userid");
        const response = await axios.get(
          `http://localhost:4000/cart/mycart?userid=${userid}`,
          {
            headers: {
              Authorization: `bearer ${window.localStorage.getItem("token")}`,
            },
          }
        );
        setCarts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCartItems();
  }, []);

  const handleOrder = async () =>  {

 
    const orderDetails = {
      
      userId: window.localStorage.getItem("userid"),
      cartItems: carts.map((cart) => ({
        
        cartId: cart._id,
        productId: cart.productid._id, // Include productId from cart
        quantity: cart.quantity,
      })),
      location: document.getElementById("location").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
    };
  
 
  
    const config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };
  
    axios
      .post("http://localhost:4000/order/createOrder", orderDetails, config)
      .then((response) => {
        window.alert(response.data.status);
        alert("Successfully ordered");
        navigate("/"); // Redirect to home page after successful order
      })
      .catch((err) => console.log(err));
  };
  

  const handleDeleteCart = (cartId) => {
    axios
      .delete(`http://localhost:4000/cart/${cartId}`, {
        headers: {
          Authorization: `bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setCarts((prevCarts) => prevCarts.filter((cart) => cart._id !== cartId));
      })
      .catch((err) => console.log(err));
  };

  const handleQuantityChange = (cartId, value) => {
    setCarts((prevCarts) =>
      prevCarts.map((cart) => {
        if (cart._id === cartId) {
          return { ...cart, quantity: parseInt(value) };
        }
        return cart;
      })
    );
  };

  const handleUpdateQuantity = (cartId) => {
    const updatedCart = carts.find((cart) => cart._id === cartId);

    if (!updatedCart || isNaN(updatedCart.quantity)) {
      alert("Please enter a valid quantity.");
      return;
    }

    axios
      .put(`http://localhost:4000/cart/${cartId}`, updatedCart, {
        headers: {
          Authorization: `bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        alert("Quantity updated successfully.");
      })
      .catch((err) => console.log(err));
  };

  const calculateTotalAmount = () => {
    let total = 0;
    carts.forEach((cart) => {
      total += cart.productid.price * cart.quantity;
    });
    return total * 10;
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="cart-page">
      <h1>Carts Total</h1>
      <div className="cart-items">
        {carts.map((cart) => (
          <div key={cart._id} className="cart-item row mb-3">
            <div className="col-sm-2">
              <img
                src={`http://localhost:4000${cart.productid.photos[0]}  `}
                alt={cart.productid.name}
                className="img-fluid"
              />
            </div>
            
            <div className="col-md-8">
              <div className="card-body">
                <h3 className="card-title">{cart.productid.name}</h3>
                <p className="card-text">{cart.productid.type}</p>
                <div className="cart-item-price">Rs{cart.productid.price}</div>
                <div className="cart-item-quantity">
                  Quantity:{" "}
                  <input
                    type="number"
                    min="1"
                    value={cart.quantity}
                    onChange={(e) =>
                      handleQuantityChange(cart._id, e.target.value)
                    }
                  />
                  <button onClick={() => handleUpdateQuantity(cart._id)}>
                    Update
                  </button>
                </div>
                <div className="cart-item-total">
                  Total: Rs{cart.productid.price * cart.quantity}
                  
                </div>
                
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteCart(cart._id)}
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          </div>
        ))}
           <div className="cart-total">Total Amount: Rs {calculateTotalAmount() }</div>
      </div>
      
      {carts.length > 0 && (
        
        <div className="cart-summary">
          
          <button className="btn btn-primary" style={{ color: 'white', backgroundColor: '#D6763C', height: '45px', width: '200px' }} onClick={openModal}>
            Proceed to Checkout
          </button>
     
        </div>
      )}
  
    
      <div
        className="modal"
        tabIndex="-1"
        role="dialog"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Verify Order</h5>
              <button type="button" className="close" onClick={closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="name">Location:</label>
                <input type="text" className="form-control" id="location" />
              </div>
              <div className="form-group">
                <label htmlFor="name">Phone:</label>
                <input type="text" className="form-control" id="phone" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" className="form-control" id="email" />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleOrder}>
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
