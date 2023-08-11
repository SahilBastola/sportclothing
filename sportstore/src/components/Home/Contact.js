import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const [Fullname, setFullname] = useState('');
  const [Email, setEmail] = useState('');
  const [Address, setAddress] = useState('');
  const [Description, setDescription] = useState('');
  const navigate = useNavigate();

  const HandleContact = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/contact/createcontact', {
        Fullname,
        Email,
        Address,
        Description,
      })
      .then(() => {
        alert('SUCCESSFUL');
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <section id="contact-form">
      <div className="container shadow-lg rounded text-center">
        <div className="row">
          <h1 className="text-center mt-5">Contact Us</h1>
          <div className="col-md-6 mt-5">
            <div className="card mt-3">
              <div className="card-body">
                <form onSubmit={HandleContact} autoComplete="off">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      name="fullname"
                      placeholder="Full Name"
                      value={Fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      required
                      style={{ backgroundColor: '#f2f2f2', color: 'blue' }} // Example inline style
                    />
                    <label htmlFor="floatingInputGroup1">Full Name</label>
                  </div>

                  <div className="form-floating mt-3">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{ backgroundColor: '#f2f2f2', color: 'blue' }} // Example inline style
                    />
                    <label htmlFor="floatingInputGroup2">Email</label>
                  </div>

                  <div className="form-floating mt-3">
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      placeholder="Address"
                      value={Address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      style={{ backgroundColor: '#f2f2f2', color: 'blue' }} // Example inline style
                    />
                    <label htmlFor="floatingInputGroup3">Address</label>
                  </div>

                  <div className="form-floating mt-3">
                    <textarea
                      className="form-control"
                      name="description"
                      placeholder="Description"
                      rows="5"
                      value={Description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      style={{ backgroundColor: '#f2f2f2', color: 'blue' }} // Example inline style
                    />
                    <label htmlFor="floatingInputGroup4">Description</label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-warning fw-bold fs-5 text-center mt-4"
                    style={{ backgroundColor: 'purple', color: 'white' }} // Example inline style
                  >
                    Contact
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-6 mt-3">
            <img
              src="https://imgs.search.brave.com/HjQlAubVV1AC6EeT1iTY_DLnqr5XYxP6SOdJMpkOkYU/rs:fit:1090:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC55/X0YxSkxDX0VTSldf/TFhacjREQzBRSGFE/TyZwaWQ9QXBp"
              alt=""
              className="mt-5 img-fluid"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
