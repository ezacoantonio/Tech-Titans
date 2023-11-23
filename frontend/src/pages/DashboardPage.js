import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const DashboardPage = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users/listusers');
            const userData = response.data.map(user => ({
                id: user._id, // Using server-generated ID
                name: `${user.firstName} ${user.lastName}`, // Concatenating first name and last name
                email: user.email,
                balance: user.accountBalance
                // Add other fields if needed
            }));
            setUsers(userData);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div style={{ maxWidth: '80%', margin: 'auto' }}>
            <h1>Dashboard</h1>
            <Button variant="contained" color="primary" onClick={fetchUsers}>
                Load Users
            </Button>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Balance</TableCell>
                            {/* Add other headers if needed */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.balance}</TableCell>
                                {/* Add other cells if needed */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default DashboardPage;
