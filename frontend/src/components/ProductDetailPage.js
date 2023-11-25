import React, { useState, useEffect } from 'react';
import CustomAlert from './CustomAlert';
import { useParams } from 'react-router-dom';
import { Typography, Button, CircularProgress, Box, Container, Paper } from '@mui/material';

function ProductDetailPage() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const [purchaseMade, setPurchaseMade] = useState(false); 

  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/listproduct/${productId}`);
        const data = await response.json();
        if (response.ok) {
          setProduct(data.product);
          //setAlert({ show: true, type: 'success', message: 'Purchase Successful!' });
        } else {
          console.error('Error fetching product:', data.message);
          //setAlert({ show: true, type: 'error', message: "Error providing the product :/" });
        }
      } catch (error) {
        console.error('Error:', error);
        //setAlert({ show: true, type: 'error', message: "Error Occured :[" });
        
      }
    };

    fetchProduct();
  }, [productId, purchaseMade]);



const handleConfirmPurchase = async () => {
    try {
      const response = await fetch(`http://localhost:5000/purchase/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: JSON.stringify({ _id: localStorage.getItem('_id') })
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Purchase successful:', data);
        // alert("Purchase Successful!");
        setAlert({ show: true, type: 'success', message: 'Purchase Successful!' });
        setPurchaseMade(true);
        
      } else {
        console.error('Purchase error:', data.message);
        setAlert({ show: true, type: 'error', message: data.message || 'Error processing purchase' });
      }
    } catch (error) {
      console.error('Error:', error);
      setAlert({ show: true, type: 'error', message: error.message || 'An error occurred' });
    }
  };

  if (!product) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  }

  const backToHomepage = () => {
    window.location.href = "/homepage";
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {alert.show && <CustomAlert showAlert={alert.show} alertMessage={alert.message} success={alert.type === 'success'} />}
      <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 2 }}>
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
            borderRadius: 2,
            boxShadow: 3,
          }}
          alt={product.name}
          src={product.imageUrls[0]}
        />
        <Box sx={{ flex: 1 }}>
          <Typography gutterBottom variant="h4" component="div">
            {product.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {product.description}
          </Typography>
          <Typography variant="h5" color="text.primary">
            Price: ${product.price}
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleConfirmPurchase}>
          Confirm Purchase
        </Button>
        </Box>
      </Paper>
      <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={backToHomepage}>
      Continue Shopping
    </Button>
    </Container>
  );
}

export default ProductDetailPage;
