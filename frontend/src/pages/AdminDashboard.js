// src/pages/AdminDashboard.js

import React, { useState, useEffect } from 'react';
import ProductCreationPopup from '../components/ProductCreationPopup';
import { Button, Grid } from '@mui/material';
import axios from 'axios';
import ProductCard from '../components/ProductCard'; // Assuming you have a ProductCard component

const AdminDashboard = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products/listproducts');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenPopup}>
        Add New Product
      </Button>
      <ProductCreationPopup open={openPopup} handleClose={handleClosePopup} refreshProducts={fetchProducts} />
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AdminDashboard;
