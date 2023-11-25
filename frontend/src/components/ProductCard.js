import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProductCard({ product, onPurchase }) {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [userBalance, setUserBalance] = useState(0);

  useEffect(() => {
    const accountBalance = localStorage.getItem("accountBalance");
    if (accountBalance) {
      setUserBalance(accountBalance);
    } else {
      console.error("No account balance found");
    }
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handlePurchaseClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleConfirmPurchase = () => {
  //   onPurchase(product._id);
  //   handleClose();
  // };

  return (
    <Card sx={{ maxWidth: 345, margin: 3 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="product">
            {product.name.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={product.name}
        subheader={`Price: $${product.price}`}
      />
      <CardMedia
        component="img"
        sx={{
          height: 194, // Fixed height
          width: "100%", // Full width of the card
          objectFit: "cover", // Ensures the image covers the area
          objectPosition: "center", // Centers the image within the area
        }}
        image={product.imageUrls[0] || "/default-product-image.jpg"}
        alt={product.name}
      />
      <CardContent>
        {/* <Button variant="contained" color="primary" onClick={handlePurchaseClick}>
          Purchase
        </Button> */}
        <Typography paragraph>Category: {product.category}</Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Button
            variant="contained"
            color="secondary"
            onClick={handlePurchaseClick}
          >
            Purchase
          </Button>
        </CardContent>
      </Collapse>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Confirm Purchase"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Price: ${product.price}
            <br />
            Your Balance: ${userBalance}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" autoFocus>
            <Link to={`/product/${product._id}`}>View Product</Link>
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
