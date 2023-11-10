require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

//imports
const userRoutes = require('./app/routes/users');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI,)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Define routes here
// Example: app.use('/api/users', require('./routes/users'));
// User routes
app.use('/users', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
