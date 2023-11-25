// const User = require('../models/user');
// const Product = require('../models/product');

// const TAX_RATE = 0.15; // 15% tax rate

// exports.getProductWithTax = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     const priceWithTax = product.price + (product.price * TAX_RATE);
//     res.json({ product, priceWithTax });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching product", error: error.message });
//   }
// };

// exports.handlePurchase = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { productId } = req.params;

//     const user = await User.findById(userId);
//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     const TAX_RATE = 0.15;
//     const totalPrice = product.price + (product.price * TAX_RATE);
    
//     if (user.accountBalance < totalPrice) {
//       return res.status(400).json({ message: "Insufficient funds" });
//     }

//     user.accountBalance -= totalPrice;
//     await user.save();

//     // Additional logic for recording the purchase, updating product stock, etc.

//     res.json({ message: "Purchase successful", balance: user.accountBalance });
//   } catch (error) {
//     res.status(500).json({ message: "Error processing purchase", error: error.message });
//   }
// };

const User = require('../models/user');
const Product = require('../models/product');

const TAX_RATE = 0.15; // 15% tax rate

exports.handlePurchase = async (req, res) => {
  try {
    const userId = req.body._id; // Retrieve user ID from request body
    const { productId } = req.params;

    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const totalPrice = product.price + (product.price * TAX_RATE);
    
    if (user.accountBalance < totalPrice) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    user.accountBalance -= totalPrice;
    await user.save();

    // Additional logic for recording the purchase, updating product stock, etc.

    res.json({ message: "Purchase successful", balance: user.accountBalance });
  } catch (error) {
    res.status(500).json({ message: "Error processing purchase", error: error.message });
  }
};

