const Product = require('../models/product');
const TAX_RATE = 0.15; // 15% tax rate

exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(400).json({ message: "Error creating product", error: error.message });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const query = req.query.query;
    const products = await Product.find({ name: { $regex: query, $options: 'i' } });
    res.status(200).json({ message: "Products retrieved successfully", products });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products", error: error.message });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ message: "Products retrieved successfully", products });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products", error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product retrieved successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving product", error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(400).json({ message: "Error updating product", error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }

  exports.getProductWithTax = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      const priceWithTax = product.price + (product.price * TAX_RATE);
      res.json({ product, priceWithTax });
    } catch (error) {
      res.status(500).json({ message: "Error fetching product", error: error.message });
    }
  };

};
