require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//imports
const userRoutes = require('./app/routes/users');
const productRoutes = require('./app/routes/products');
const purchaseRoutes = require('./app/routes/purchase');
const orderRoutes = require('./app/routes/orders');
const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Define routes here
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/orders', orderRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
