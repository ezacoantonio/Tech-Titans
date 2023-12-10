const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const questionSchema = new Schema({
  text: { type: String, required: true },
  answer: { type: String, default: "" }, // Adding an 'answer' field with a default empty string
  postedBy: { type: String }, // Optional: Include user identifier or name
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrls: [
    {
      // Changed to an array of strings
      type: String,
      required: true,
    },
  ],
  owner: {
    type: Schema.Types.ObjectId, // or type: String if you prefer using uniqueId
    ref: "User",
    required: true,
  },
  // In your Product model
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to current time
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  questions: [questionSchema],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
