import React from 'react';

const About = () => {
  return (
    <section id="About" className="bg-light py-5 pt-5" style={{ backgroundColor: '#800080' }}>
      <div className="container text-center">
        <div className="row">
          <div className="col-md-6 my-5">
            <h2 className="font-monospace fw-bold text-orange">We Provide High-Quality Products</h2>
            <p className="fs-5 text-secondary">Discover our premium selection of high-quality products.</p>
            <a href="/login" className="btn btn-success fw-bold fs-5">Shop Now</a>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img src="https://growthpad.co.ke/wp-content/uploads/2020/04/ecommerce-gif.gif" alt="About" className="img-fluid" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
