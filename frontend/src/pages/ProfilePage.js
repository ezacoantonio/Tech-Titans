import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Paper, Typography, CircularProgress } from '@mui/material';

const ProfilePage = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const { uniqueId } = useParams(); // Assuming you're using React Router and 'uniqueId' is the URL parameter

    const fetchUserProfile = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/users/profile/${uniqueId}`);
            setUserProfile(response.data);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        } finally {
            setLoading(false);
        }
    }, [uniqueId]);

    useEffect(() => {
        fetchUserProfile();
    }, [fetchUserProfile]);

    if (loading) {
        return <CircularProgress />;
    }

    if (!userProfile) {
        return <Typography variant="h6">User profile not found</Typography>;
    }

    return (
        <Paper style={{ padding: '20px', maxWidth: '600px', margin: '20px auto' }}>
            <Typography variant="h4">{userProfile.name}</Typography>
            <Typography variant="subtitle1">Email: {userProfile.email}</Typography>
            <Typography variant="subtitle1">Balance: {userProfile.balance}</Typography>
            {/* Add more fields as needed */}
        </Paper>
    );
};

export default ProfilePage;
