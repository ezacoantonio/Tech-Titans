import React, { useState, useEffect } from 'react';
import CustomAlert from './CustomAlert';
import { useParams } from 'react-router-dom';
import { Typography, Button, CircularProgress, Box, Container, Paper, TextField } from '@mui/material';
import HalfRating from './HalfRating';  // Adjust the path based on your project structure


function ProductDetailPage() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const [purchaseMade, setPurchaseMade] = useState(false); 

  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState({});

  const fetchProduct = async () => {
    try {
        const response = await fetch(`http://localhost:5000/products/listproduct/${productId}`);
        const data = await response.json();
        if (response.ok) {
            setProduct(data.product);
        } else {
            console.error('Error fetching product:', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

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
        setAlert({ show: true, type: 'error', message: data.message && 'Log in or Create an account to purchase this item' });
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
    window.location.href = "/";
  }

  const handleQuestionSubmit = async () => {
    try {
      fetchProduct();
      const response = await fetch(`http://localhost:5000/products/add-question/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        },
        body: JSON.stringify({ text: newQuestion, askedBy: 'UserIdentifier' }) // Replace 'UserIdentifier' with actual user data if available
      });
      if (response.ok) {
        // alert('Question added successfully');
        // Refresh the product details to show the new question
        fetchProduct(); 
        
      } else {
        console.error('Error adding question');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAnswerSubmit = async (questionId) => {
    try {
        const response = await fetch(`http://localhost:5000/products/answer-question/${productId}/${questionId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`
            },
            body: JSON.stringify({ answer: newAnswer[questionId] })
        });

        if (response.ok) {
            fetchProduct(); // Refresh data after submitting answer
        } else {
            console.error('Error submitting answer');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
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
          <HalfRating /> {/* Add this line for star ratings */}
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

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* Section to display questions/comments */}

      {/* Form to submit a new question/comment */}
      <Box sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Add a question/comment"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <Button variant="contained" sx={{ mt: 1 }} onClick={handleQuestionSubmit}>
          Submit
        </Button>
      </Box>
      </Container>
      {/* Questions and Answers Section */}
      <Box sx={{ mt: 2 }}>
  <Typography variant="h6">Questions and Comments</Typography>
  {product?.questions.map((question) => (
    <Box key={question._id} sx={{ mb: 2 }}>
      <Typography variant="body1"><strong>Q:</strong> {question.text}</Typography>
      <Typography variant="body2">
        <strong>A:</strong> {question.answer || 'Awaiting Answer'}
      </Typography>

      {/* Show answer field and submit button only if the user is the product owner */}
      {localStorage.getItem('_id') === product.owner.toString() && (
        <Box>
          <TextField
            fullWidth
            label="Your Answer"
            value={newAnswer[question._id] || ''}
            onChange={(e) => setNewAnswer({ ...newAnswer, [question._id]: e.target.value })}
            margin="normal"
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => handleAnswerSubmit(question._id)}
          >
            Submit Answer
          </Button>
        </Box>
      )}
    </Box>
  ))}
</Box>
      <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={backToHomepage}>
        Continue Shopping
      </Button>
    </Container>
    
  );
}

export default ProductDetailPage;
