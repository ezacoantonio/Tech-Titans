const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  imageUrls: [{ // Changed to an array of strings
    type: String,
    required: true
  }],
  // Add more fields as needed
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
