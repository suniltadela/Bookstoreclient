import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = () => {
    const navigate = useNavigate();
    const accessToken = Cookies.get('access_token');

    const handleLogout = () => {
        Cookies.remove('access_token');
        navigate('/login');
    };


    return (
        <AppBar position="fixed" style={{ backgroundColor: '#278A24' }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    {/* Add your menu icon here */}
                </IconButton>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Bookstore
                </Typography>
                {accessToken && (
                    <Button color="inherit" component={Link} to="/home">Home</Button>
                )}
                <Button color="inherit" component={Link} to="/contact">Contact</Button>
                {!accessToken ? (
                    <>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/signup">Register</Button>
                    </>
                ) : (
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
