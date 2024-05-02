
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';  

function Loginpage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Email:', email, 'Password:', password);
        // Implement authentication logic here
    };

    const handleSignup = () => {
        navigate('/signup');  
    };

    return (
        <div style={{ position: 'relative' }}>
            <video autoPlay loop muted style={{ position: 'fixed', width: '100%', height: '100%', objectFit: 'cover', zIndex: '-1' }}>
                <source src="/Untitled design.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <Container component="main" maxWidth="xs" style={{ paddingTop: 150 }}>
                <Paper elevation={6} style={{ padding: 30, backgroundColor: '#b2dfdb' }}>
                    <Typography component="h1" variant="h5" style={{ marginBottom: 20 }}>
                        Bookstore Login
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            style={{ marginTop: 20, backgroundColor: 'white ', color: 'green' }}
                            autoFocus
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            style={{ marginTop: 20, backgroundColor: 'white ', color: 'green' }}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{ marginTop: 20, backgroundColor: '#278A24  ', color: 'white' }}
                        >
                            Sign In
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="primary"
                            style={{ marginTop: 10 , backgroundColor: '#278A24  ', color: 'white'}}
                            onClick={handleSignup}
                        >
                            Register / Sign Up
                        </Button>
                    </form>
                </Paper>
            </Container>
        </div>
    );
}

export default Loginpage;
