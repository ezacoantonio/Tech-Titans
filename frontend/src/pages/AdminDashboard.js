import React, { useState, useEffect } from "react";
import ProductCreationPopup from "../components/ProductCreationPopup";
import CustomAlert from "../components/CustomAlert";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const AdminDashboard = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [products, setProducts] = useState([]);
  const [settingsPopupOpen, setSettingsPopupOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [editProductData, setEditProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (currentProduct) {
      setEditProductData({
        name: currentProduct.name,
        description: currentProduct.description,
        price: currentProduct.price,
        category: currentProduct.category,
        id: currentProduct._id,
      });
    }
  }, [currentProduct]);

  const fetchProducts = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const response = await axios.get(
        "http://localhost:5000/products/myproducts",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.data.products.length === 0) {
        // Handle the case where there are no products
        setProducts([]);
      } else {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleSettingsClick = (product) => {
    setCurrentProduct(product);
    setSettingsPopupOpen(true);
  };

  const handleEdit = () => {
    setEditPopupOpen(true);
    setSettingsPopupOpen(false);
  };

  const handleEditSave = async () => {
    try {
      const userToken = localStorage.getItem("userToken"); // Retrieve the token from local storage

      // Check if the token exists
      if (!userToken) {
        alert("No user token found. Please log in.");
        return;
      }

      await axios.put(
        `http://localhost:5000/products/update/${currentProduct._id}`,
        editProductData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`, // Include the token in the request headers
          },
        }
      );

      // alert("Updated successfully");
      setAlert({
        show: true,
        type: "success",
        message: "Product updated successfully!",
      });
      fetchProducts();
      closePopups();
    } catch (error) {
      console.error("Error updating product:", error);
      setAlert({
        show: true,
        type: "error",
        message: "Error updating product. Please try again.",
        duration: 3000,
      });
    }
  };
  const handleToggleStatus = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      if (!userToken) {
        console.error("No user token found. Please log in.");
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/products/togglestatus/${currentProduct._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      setAlert({
        show: true,
        type: "success",
        message: `Product ${
          response.data.product.isActive ? "enabled" : "disabled"
        } successfully`,
      });
      fetchProducts();
      closePopups();
    } catch (error) {
      console.error("Error toggling product status:", error);
      setAlert({
        show: true,
        type: "error",
        message: "Error toggling product status. Please try again.",
      });
    }
  };

  const closePopups = () => {
    setSettingsPopupOpen(false);
    setEditPopupOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {alert.show && (
        <CustomAlert
          showAlert={alert.show}
          alertMessage={alert.message}
          success={alert.type === "success"}
        />
      )}
      <br></br>
      <Button variant="contained" color="secondary" onClick={handleOpenPopup}>
        Add New Product
      </Button>
      <Button
        variant="contained"
        color="info"
        sx={{ marginLeft: 2, color: "white" }}
        onClick={() => (window.location.href = "/")}
      >
        View Homepage
      </Button>
      {products.length === 0 ? (
        <Typography variant="h6" sx={{ mt: 2 }}>
          You have no products on Titan Store.
        </Typography>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ marginTop: 3 }}
        ></TableContainer>
      )}
      <ProductCreationPopup
        open={openPopup}
        handleClose={handleClosePopup}
        refreshProducts={fetchProducts}
      />

      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Setting</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <Box
                    component="img"
                    sx={{
                      height: 50,
                      width: 50,
                      borderRadius: "50%",
                    }}
                    src={product.imageUrls[0]}
                    alt={product.name}
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="settings"
                    onClick={() => handleSettingsClick(product)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Settings Popup */}
      <Dialog open={settingsPopupOpen} onClose={closePopups}>
        <DialogTitle>Product Settings</DialogTitle>
        <DialogContent>
          Choose an action for {currentProduct?.name}.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={handleToggleStatus}>Toggle Status</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Popup */}
      <Dialog open={editPopupOpen} onClose={closePopups}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={editProductData.name}
            onChange={(e) =>
              setEditProductData({ ...editProductData, name: e.target.value })
            }
          />
          <TextField
            label="Description"
            fullWidth
            margin="dense"
            value={editProductData.description}
            onChange={(e) =>
              setEditProductData({
                ...editProductData,
                description: e.target.value,
              })
            }
          />
          <TextField
            label="Price"
            fullWidth
            margin="dense"
            value={editProductData.price}
            onChange={(e) =>
              setEditProductData({ ...editProductData, price: e.target.value })
            }
          />
          <TextField
            label="Category"
            fullWidth
            margin="dense"
            value={editProductData.category}
            onChange={(e) =>
              setEditProductData({
                ...editProductData,
                category: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closePopups}>Cancel</Button>
          <Button onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
