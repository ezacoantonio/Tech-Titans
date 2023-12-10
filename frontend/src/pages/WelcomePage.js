import React, { useState, useEffect } from "react";
import useWelcomePageStyles from "../styles/useWelcomePageStyles";
import Carousel from "react-material-ui-carousel";
import {
  Paper,
  Typography,
  Button,
  Grid,
  Link,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ProductCard from '../components/ProductCard'; // Assuming you have this component

const WelcomePage = () => {
  const classes = useWelcomePageStyles();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products/listproducts")
      .then(response => response.json())
      .then(data => {
        // Filter out products where 'isActive' is false
        const enabledProducts = data.products.filter(product => product.isActive);
        setProducts(enabledProducts);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const images = [
    "https://i.ibb.co/94Bykwk/PC-Picture.png",
    "https://i.ibb.co/g7wFQWH/Smart-Phones.png",
    "https://i.ibb.co/Xb139Q4/Smart-Watches.png",
    "https://i.ibb.co/1dBQ2BW/Gamming.png",
    "https://i.ibb.co/NSnrLwk/Cameras.png",
    "https://i.ibb.co/xsy04xK/SignUp.png",
  ];

  const featuredProducts = [
    {
      name: "Smartwatch X200",
      description:
        "Latest in wearable tech, featuring heart rate monitor, GPS, and water resistance.",
      image:
        "https://i.pinimg.com/originals/b3/fe/53/b3fe5384aebc30b2b8b3d9e462d69847.jpg",
    },
    {
      name: "Virtual Reality Set",
      description:
        "Immerse yourself in virtual worlds with our high-definition VR set.",
      image:
        "https://m.media-amazon.com/images/I/51d1xo+MUYL._AC_UF894,1000_QL80_.jpg",
    },
    {
      name: "Wireless Earbuds",
      description:
        "Experience crystal-clear sound and true wireless freedom with our latest earbuds.",
      image:
        "https://www.cnet.com/a/img/resize/7e31d04cb60a04161a0dc9ebb15a8c67bbc34cef/hub/2023/01/26/45115595-4ba3-4f6e-93ab-2c4f07d4ad7d/earfun-air-pro-3-red-background.png?auto=webp&fit=crop&height=576&width=768",
    },
    {
      name: "Portable Charger 10000mAh",
      description:
        "Stay charged on the go with our high-capacity, fast-charging portable power bank.",
      image:
        "https://c1.neweggimages.com/productimage/nb640/AVR3S210802w3G2o.jpg",
    },
    // Add more products as needed
  ];
  const testimonials = [
    {
      name: "Julio Azevedo de Carvalho",
      statement:
        "I love the magic mouse from Titan Store. It's sleek, stylish, and comfortable to use. I highly recommend it, because it really makes your money dissapear!",
      image:
        "https://media.licdn.com/dms/image/C5603AQEJ_AljfP40CA/profile-displayphoto-shrink_800_800/0/1587771477052?e=1707350400&v=beta&t=pp-rJRlpAZoJIEqdG-LTPr-APkxsGjwC7RJsLIvapuo", // Replace with actual image path
    },
    {
      name: "Leonel Messi",
      statement:
        "I was for looking to get a soccer ball, but I found a great deal on a laptop instead. I'm glad I found Titan Store!",
      image:
        "https://i.pinimg.com/474x/70/01/0d/70010df057bb304649da087fa4966bf0.jpg", // Replace with actual image path
    },
    // Add more testimonials as needed
  ];

  const welcomeImageUrl = "https://i.ibb.co/gFMdg0n/Banner.gif"; // Replace with your image URL


  
  return (
    <div className={classes.root}>
      <Typography variant="h3" gutterBottom className={classes.welcomeText}>
        Welcome to the
        <img src={welcomeImageUrl} alt="Welcome" className={classes.welcomeImage} />
      </Typography>

      <Grid container spacing={2}>
        {/* Carousel Column */}
        <Grid item xs={12} md={7}>
          <Carousel autoPlay={true} animation="slide" interval={3000}>
            {images.map((image, i) => (
              <Paper key={i} elevation={3} className={classes.carouselPaper}>
                <img src={image} alt={`Featured Product ${i}`} className={classes.carouselImage} />
              </Paper>
            ))}
          </Carousel>
        </Grid>

        {/* Featured Products Column */}
        <Grid item xs={12} md={5} style={{ overflowX: "auto", height: "500px" }}>
          {featuredProducts.map((product, index) => (
            <Card key={index} style={{ display: "inline-block", width: "400px", marginLeft: "20px" }}>
              <CardMedia component="img" image={product.image} />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">{product.description}</Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>

      {/* Display Products from HomePage */}
      <Grid container spacing={2}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {/* Testimonials Section */}
      <div className={classes.testimonialsContainer}>
        <Typography variant="h4" className={classes.testimonialsTitle}>
          What Our Customers Say
        </Typography>
        {testimonials.map((testimonial, index) => (
          <Card key={index} className={classes.testimonialCard}>
            <CardMedia component="img" image={testimonial.image} alt={testimonial.name} className={classes.testimonialImage} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {testimonial.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {testimonial.statement}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Newsletter and Social Media Links */}
      <div className={classes.newsletterSection}>
        <Typography variant="h5">Stay Updated with Titan Store</Typography>
        <Button variant="contained" color="primary" onClick={() => alert("You will now recieve promotial Emails :D")}>
          Subscribe to Newsletter
        </Button>
      </div>

      <div className={classes.socialMediaLinks}>
        <Link href="https://www.instagram.com/titanstore" className={classes.iconLink} color="inherit">
          <InstagramIcon className={classes.instagramHover} fontSize="large" />
        </Link>
        <Link href="https://www.facebook.com/titanstore" className={classes.iconLink} color="inherit">
          <FacebookIcon className={classes.facebookHover} fontSize="large" />
        </Link>
        <Link href="https://www.twitter.com/titanstore" className={classes.iconLink} color="inherit">
          <TwitterIcon className={classes.twitterHover} fontSize="large" />
        </Link>
        <Link href="https://www.youtube.com/titanstore" className={classes.iconLink} color="inherit">
          <YouTubeIcon className={classes.youtubeHover} fontSize="large" />
        </Link>
        <Link href="https://www.linkedin.com/company/titanstore" className={classes.iconLink} color="inherit">
          <LinkedInIcon className={classes.linkedinHover} fontSize="large" />
        </Link>
      </div>

      <footer className="makeStyles-footer-19">
        <p className="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root">
          © 2023 Titan Store. All rights reserved to Titan Team 23F-005.
        </p>
      </footer>
    </div>
  );
};

export default WelcomePage;
