import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import productService from '../../services/productServices';
import axios from 'axios';

const EditProductPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { product, productId } = state || {}; // Destructure product and productId from state

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setCheapestPrice] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDesc(product.desc);
      setCheapestPrice(product.price);
      setAddress(product.address);
    }
  }, [product]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescChange = (event) => {
    setDesc(event.target.value);
  };

  const handleCheapestPriceChange = (event) => {
    setCheapestPrice(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:4000/product/${productId}`, {
        name,
        description: desc,
        price,
        address,
      });

      navigate('/AdminproductPage');
    } catch (error) {
      console.log(error);
      // handle error
    }
  };

  return (
    <div className='container'>
      <h2 className='text-center'>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            className='form-control'
            id='name'
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='desc' className='form-label'>
            Description
          </label>
          <textarea
            className='form-control'
            id='desc'
            rows='3'
            value={desc}
            onChange={handleDescChange}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='price' className='form-label'>
          price
          </label>
          <input
            type='text'
            className='form-control'
            id='price'
            value={price}
            onChange={handleCheapestPriceChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='address' className='form-label'>
            Address
          </label>
          <input
            type='text'
            className='form-control'
            id='address'
            value={address}
            onChange={handleAddressChange}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
