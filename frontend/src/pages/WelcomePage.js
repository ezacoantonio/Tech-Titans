import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import useWelcomePageStyles from '../styles/useWelcomePageStyles';

const WelcomePage = () => {
  const classes = useWelcomePageStyles();

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>Welcome to Our E-commerce Store!</h1>
      <p className={classes.subtitle}>
        Discover the latest trends and find the perfect items for you.
      </p>
      <Link to="/homepage" className={classes.link}>
        <Button variant="contained" color="primary" className={classes.button}>
          Shop Now
        </Button>
      </Link>
    </div>
  );
};

export default WelcomePage;
