import React, { useState } from "react";
// import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogContent
} from "@mui/material";
import { red } from "@mui/material/colors";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ImageIcon from "@mui/icons-material/Image";
import { Link as RouterLink } from "react-router-dom";

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

export default function ProductCard({ product }) {
  // const [expanded, setExpanded] = useState(false);
  const [imagePopupOpen, setImagePopupOpen] = useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  const handleOpenImagePopup = () => setImagePopupOpen(true);
  const handleCloseImagePopup = () => setImagePopupOpen(false);

  return (
    <Card sx={{ maxWidth: 345, margin: 3 }}>
      <CardHeader
  avatar={
    <Avatar sx={{ bgcolor: red[500] }} aria-label="product">
      {product.name.charAt(0)}
    </Avatar>
  }
  action={
    <IconButton aria-label="show image" onClick={handleOpenImagePopup}>
      <ImageIcon />
    </IconButton>
  }
  title={product.name}
  subheader={
    <Typography component="span" variant="body2" sx={{ fontWeight: 'bold' }}>
      Price: ${product.price}
    </Typography>
  }
/>
      <Dialog open={imagePopupOpen} onClose={handleCloseImagePopup}>
        <DialogContent>
          <img
            src={product.imageUrls[0]}
            alt={product.name}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </DialogContent>
      </Dialog>
      <CardMedia
        component="img"
        sx={{
          height: 194,
          width: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
        image={product.imageUrls[0] || "/default-product-image.jpg"}
        alt={product.name}
      />
      <CardContent>
        <Typography paragraph>Category: {product.category}</Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> */}
        <Button 
          variant="contained" 
          color="primary" 
          component={RouterLink} 
          to={`/product/${product._id}`}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}
