const Product = require("../models/product");
const TAX_RATE = 0.15; // 15% tax rate

exports.createProduct = async (req, res) => {
  try {
    const newProductData = {
      ...req.body,
      owner: req.body.owner, // Assuming owner is passed in the request body
      createdAt: new Date(), // Set the creation date to current date
      expiresAt: new Date(req.body.expiresAt) // Use expiresAt from the request body
    };

    const newProduct = new Product(newProductData);
    await newProduct.save();

    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(400).json({ message: "Error creating product", error: error.message });
  }
};


exports.searchProducts = async (req, res) => {
  try {
    const query = req.query.query;
    const products = await Product.find({
      name: { $regex: query, $options: "i" },
    });
    res
      .status(200)
      .json({ message: "Products retrieved successfully", products });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving products", error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res
      .status(200)
      .json({ message: "Products retrieved successfully", products });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving products", error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product retrieved successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving product", error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating product", error: error.message });
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
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }

  exports.getProductWithTax = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const priceWithTax = product.price + product.price * TAX_RATE;
      res.json({ product, priceWithTax });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching product", error: error.message });
    }
  };
};

exports.addQuestionToProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.questions.push({ text: req.body.text, postedBy: req.body.postedBy });
    await product.save();
    res.status(200).json({ message: "Question added successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error adding question", error: error.message });
  }
};

exports.getProductsByOwner = async (req, res) => {
  try {
    const ownerId = req.user._id; // Ensure the user's ID is attached to req.user
    const products = await Product.find({ owner: ownerId });

    if (products.length === 0) {
      return res.status(404).json({ message: "You have not uploaded any products" });
    }

    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products", error });
  }
};


// Backend route in products controller

exports.getMyProducts = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have user ID in req.user
    const products = await Product.find({ owner: userId });

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};


exports.answerQuestion = async (req, res) => {
  try {
      const product = await Product.findById(req.params.productId);
      if (!product) {
          return res.status(404).json({ message: "Product not found" });
      }

      if (product.owner.toString() !== req.user._id.toString()) {
          return res.status(403).json({ message: "Unauthorized: Only the product owner can answer questions" });
      }

      const question = product.questions.id(req.params.questionId);
      if (!question) {
          return res.status(404).json({ message: "Question not found" });
      }

      question.answer = req.body.answer;
      await product.save();

      res.status(200).json({ message: "Answer added successfully", product });
  } catch (error) {
      res.status(500).json({ message: "Error answering question", error: error.message });
  }
};

exports.toggleProductStatus = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.isActive = !product.isActive; // Toggle the isActive status
    await product.save();

    res.status(200).json({ message: `Product ${product.isActive ? 'enabled' : 'disabled'} successfully`, product });
  } catch (error) {
    res.status(500).json({ message: "Error updating product status", error: error.message });
  }
};

