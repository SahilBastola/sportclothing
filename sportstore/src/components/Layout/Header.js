import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import '../../style/App.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faShoppingCart, faUser, faBars } from '@fortawesome/free-solid-svg-icons';



const Header = () => {
  const token = localStorage.getItem('token');
 
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const isAdmin = localStorage.getItem('admin'); // Corrected variable name

  // Timer for automatic logout after 2 minutes
  let logoutTimer;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    logoutTimer = setTimeout(() => {
    localStorage.clear();
    navigate('/');
      console.log('User automatically logged out after 2 minutes');
    }, 5 * 60 * 1000); // 2 minutes in milliseconds

    return () => {
      clearTimeout(logoutTimer);
    };
  }, []);


  
  return (
    <nav className="navbar border-bottom navbar-expand-lg rounded homeback justify-content-start custom-header">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <div className="d-flex align-items-center">
            <h3 className="text-dark">
              <span className="">SportStore</span>
            </h3>
          </div>
        </NavLink>
  
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
  
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav ms justify-content-start">
            {isAdmin === 'true' && token !== null && (
              <>
                <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
                  <li className="nav-item">
                    <NavLink className="nav-link active ms-2 fs-5" exact to="/AdminPage" activeClassName="active-link">
                      Dashboard
                    </NavLink>
                  </li>
                </CSSTransition>
                <CSSTransition in={true} appear={true} timeout={500} classNames="fade" key="about">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active ms-2 fs-5"
                      to="/AdminproductPage"
                      activeClassName="active-link"
                    >
                      Admin Product
                    </NavLink>
                  </li>
                </CSSTransition>
              </>
            )}
  
            {isAdmin === null && token == null && (
              <>
                <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
                  <li className="nav-item">
                    <NavLink className="nav-link active ms-2 fs-5" exact to="/" activeClassName="active-link">
                      Home
                    </NavLink>
                  </li>
                </CSSTransition>
                <CSSTransition in={true} appear={true} timeout={500} classNames="fade" key="about">
                  <li className="nav-item">
                    <NavLink className="nav-link active ms-2 fs-5" to="/products" activeClassName="active-link">
                      Products
                    </NavLink>
                  </li>
                </CSSTransition>
              </>
            )}
  
            {isAdmin === 'false' && token !== null && (
              <>
                <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
                  <li className="nav-item">
                    <NavLink className="nav-link active ms-2 fs-5" exact to="/" activeClassName="active-link">
                      Home
                    </NavLink>
                  </li>
                </CSSTransition>
                <CSSTransition in={true} appear={true} timeout={500} classNames="fade" key="about">
                  <li className="nav-item">
                    <NavLink className="nav-link active ms-2 fs-5" to="/products" activeClassName="active-link">
                      Products
                    </NavLink>
                  </li>
                </CSSTransition>
                <CSSTransition in={true} appear={true} timeout={500} classNames="fade" key="products">
                  <li className="nav-item">
                    <NavLink className="nav-link active ms-2 fs-5" to="/OrderPage" activeClassName="active-link">
                      Order
                    </NavLink>
                  </li>
                </CSSTransition>
              </>
            )}
  
            {isAdmin === null && token == null && (
              <>
                <CSSTransition in={true} appear={true} timeout={500} classNames="fade" key="gallery">
                  <li className="nav-item">
                    <NavLink className="nav-link active ms-2 fs-5" to="/CartPage" activeClassName="active-link">
                      Cart
                    </NavLink>
                  </li>
                </CSSTransition>
              
              </>
            )}
  
              
          </ul>
  
         
          {token !== null ? (
            <>
            <div className="justify-content-end" style={{ paddingLeft: '400px' }}></div>
           
              
              <div className="justify-content-end" style={{ paddingLeft: '30px' }}></div>
              <a href="/CartPage" className="text-dark me-3">
    <FontAwesomeIcon icon={faShoppingCart} className="fa-fw" />
  </a>
              <a href="/ProfilePage" className="btn text-warning">
                <FontAwesomeIcon icon={faUser} className="me-2" />
               
              </a>
              <button onClick={handleLogout} className="btn btn-warning ms-2 fw-bold fs-5" type="button">
                Logout
              </button>
            </>
          ) : (
            <>
              <div className="d-flex align-items-center ms-2 justify-content-start" style={{ paddingLeft: '450px' }}>
  {/* Profile Icon */}
  {token !== null && (
    <a href="/ProfilePage" className="text-dark me-3">
      <FontAwesomeIcon icon={faUser} />
    </a>
  )}

  {/* Cart Icon */}
  {isAdmin === 'false' && token !== null && (
    <a href="/CartPage" className="text-dark me-3">
      <FontAwesomeIcon icon={faShoppingCart} />
    </a>
  )}

  {/* Menu Icon */}
  <a href="/login" className="text-dark me-3">
    <FontAwesomeIcon icon={faUser} className="fa-fw" />
  </a>
  <a href="/login" className="text-dark me-3">
    <FontAwesomeIcon icon={faShoppingCart} className="fa-fw" />
  </a>

</div>


            </>
          )}
        </div>
      </div>
    </nav>
  );
  
};

export default Header;
