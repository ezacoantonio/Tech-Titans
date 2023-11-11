import React from 'react';
import useWelcomePageStyles from '../styles/useWelcomePageStyles';

const WelcomePage = () => {
    const classes = useWelcomePageStyles();
    return (
        <div className={classes.root}>
            <h1>Welcome to Our E-commerce Store!</h1>
            {/* Add more content here */}
        </div>
    );
};

export default WelcomePage;
