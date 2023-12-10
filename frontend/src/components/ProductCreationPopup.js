import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";

const ProductCreationPopup = ({ open, handleClose, refreshProducts }) => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrls: [],
  });
  const [expirationDate, setExpirationDate] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "imageUrls") {
      setProductDetails({
        ...productDetails,
        [e.target.name]: e.target.value.split(","),
      });
    } else {
      setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    try {
      const ownerId = localStorage.getItem("_id"); // Retrieve the owner's _id from local storage
      if (!ownerId) {
        alert("User ID not found. Please log in again.");
        return;
      }

      const token = localStorage.getItem("userToken"); // Ensure this is the correct key for the stored token

      const productDataWithOwner = {
        ...productDetails,
        owner: ownerId, // Add owner _id to the product details
        expiresAt: expirationDate, // Include the expiration date
      };

      const response = await axios.post(
        "http://localhost:5000/products/register",
        productDataWithOwner,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Product created successfully");
        refreshProducts();
        handleClose();
      }
    } catch (error) {
      alert(
        "Error creating product: " +
          (error.response?.data.message || error.message)
      );
      console.error("Error creating product:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New Product</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Product Name"
          type="text"
          fullWidth
          variant="standard"
          value={productDetails.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          value={productDetails.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="price"
          label="Price"
          type="number"
          fullWidth
          variant="standard"
          value={productDetails.price}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="category"
          label="Category"
          type="text"
          fullWidth
          variant="standard"
          value={productDetails.category}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="imageUrls"
          label="Image URLs (comma-separated)"
          type="text"
          fullWidth
          variant="standard"
          value={productDetails.imageUrls.join(",")}
          onChange={handleChange}
          helperText="Enter image URLs separated by commas"
        />
        <TextField
          label="Expiration Date"
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
          placeholder="yyyy-mm-dd" // Format placeholder
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductCreationPopup;
