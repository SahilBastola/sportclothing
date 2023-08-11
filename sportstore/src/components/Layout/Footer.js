import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Company Links</h5>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>
          <div className="col-md-6">
            <h5>Helpful Links</h5>
            <ul className="footer-links">
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
