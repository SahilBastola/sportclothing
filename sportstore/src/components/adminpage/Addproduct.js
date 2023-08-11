import React, { useState } from 'react';
import axios from 'axios';

const CreateProductForm = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [desc, setDesc] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [price, setPrice] = useState(0);
  const [photos, setPhotos] = useState([]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('type', type);
    formData.append('desc', desc);
    formData.append('address', address);
    formData.append('phone', phone);
    formData.append('price', price);
    
    // Append each selected photo to the formData
    for (let i = 0; i < photos.length; i++) {
      formData.append('photos', photos[i]);
    }

    try {
      await axios.post('http://localhost:4000/product/createhostel', formData);
      // Product created successfully
      // Perform any desired action, such as showing a success message or redirecting
      alert("product created")
    } catch (error) {
      // Error occurred during product creation
      // Handle the error, such as displaying an error message
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="create-product-form">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name:</label>
        <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="mb-3">
        <label htmlFor="type" className="form-label">Type:</label>
        <input type="text" id="type" className="form-control" value={type} onChange={(e) => setType(e.target.value)} />
      </div>

      <div className="mb-3">
        <label htmlFor="desc" className="form-label">Description:</label>
        <textarea id="desc" className="form-control" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="address" className="form-label">Address:</label>
        <input type="text" id="address" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>

      <div className="mb-3">
        <label htmlFor="phone" className="form-label">Phone:</label>
        <input type="text" id="phone" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>

      <div className="mb-3">
        <label htmlFor="price" className="form-label">Price:</label>
        <input type="number" id="price" className="form-control" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
      </div>

      <div className="mb-3">
        <label htmlFor="photos" className="form-label">Photos:</label>
        <input type="file" id="photos" className="form-control" multiple onChange={(e) => setPhotos(e.target.files)} />
      </div>

      <button type="submit" className="btn btn-primary">Create Product</button>
    </form>
  );
};

export default CreateProductForm;
