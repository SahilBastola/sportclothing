import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './profilepage.css';

const ProfilePage = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:4000/users/${window.localStorage.getItem('userid')}`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteOrder = (orderId) => {
    setUsers(users.filter((user) => user._id !== orderId));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("pic", file);

      try {
        const response = await axios.put(`http://localhost:4000/users/${window.localStorage.getItem('userid')}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Image uploaded successfully");
        // Do something with the response, if needed
      } catch (error) {
        console.log("Image upload failed", error);
        // Handle the error, if needed
      }
    }
  };

  return (
    <div className="bg-light py-5">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-4">
            <div className="card bg-grey text-white">
              {users && users.map((user) => (
                <div className="card-body">
                  <div className="profile-img-container">
                    <img src={user.pic ? `http://localhost:4000/${user.pic.replace('\\', '/')}` : ""} className="card-img-top" alt="Profile" />
                  </div>
                  <input type="file" onChange={handleImageUpload} className="upload-input" />
                  <h5 className="card-title mb-0 text-primary">{user.username}</h5>
                  <p className="card-text mb-1 text-primary">Email: {user.email}</p>
                  <p className="card-text mb-1 text-primary">Location: New York, USA</p>
                  <p className="card-text mb-0 text-primary">Interests: Reading, Travelling</p>
                  <Link to={`/EditProfilePage`}>
                    <button className="btn btn-success fw-bold fs-5" type="submit">
                      Edit Details
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
