import React, { useState, useEffect } from "react";
import ProductCreationPopup from "../components/ProductCreationPopup";
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
} from "@mui/material";
import axios from "axios";

const AdminDashboard = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/products/listproducts"
      );
      setProducts(response.data.products);
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
  const backToHomepage = () => {
    window.location.href = "/homepage";
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button variant="contained" color="secondary" onClick={handleOpenPopup}>
        Add New Product
      </Button>
      <Button
        variant="contained"
        color="info"
        sx={{ marginLeft: 2, color: "white" }}
        onClick={backToHomepage}
      >
        View Homepage
      </Button>
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
                <TableCell>{/* Add any action buttons here */}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminDashboard;
