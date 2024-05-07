import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar position="fixed" style={{ backgroundColor: '#278A24' }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    {/* Add your menu icon here */}
                </IconButton>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Bookstore
                </Typography>
                <Button color="inherit" component={Link} to="/home">Home</Button>
                <Button color="inherit" component={Link} to="/contact">Contact</Button>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/signup">Register</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
