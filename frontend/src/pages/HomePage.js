import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ProductCard from '../components/ProductCard'; // Import the ProductCard component
import { useLocation } from 'react-router-dom';


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  // useEffect(() => {
  //   fetch('http://localhost:5000/products/listproducts')
  //     .then(response => response.json())
  //     .then(data => {
  //       setProducts(data.products);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching products:', error);
  //     });
  // }, []);

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('search');
    fetch(`http://localhost:5000/products/search?query=${query || ''}`)
      .then(response => response.json())
      .then(data => {
        setProducts(data.products);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, [location]);

  return (
        <Grid container spacing={2}>
      {products.map(product => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
    
  );
};

export default HomePage;
