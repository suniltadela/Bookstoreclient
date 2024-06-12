import React, { useState } from 'react';
import { Container, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        age: '',
        gender: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://bookstoreserver-five.vercel.app/signup', user);
            console.log(response.data);
            setUser({ name: '', email: '', password: '', gender: '', age: '' });
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError('An error occurred during signup. Please try again.');
            }
        }
    };

    const handleBack = () => {
        navigate('/login');
    };

    return (
        <div style={{ position: 'relative' }}>
            <video autoPlay loop muted style={{ position: 'fixed', width: '100%', height: '100%', objectFit: 'cover', zIndex: '-1', top: 0 }}>
                <source src="/Untitled design.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <Container component="main" maxWidth="xs" style={{ paddingTop: '50px' }}>
                <Paper elevation={6} style={{ padding: '30px', backgroundColor: '#b2dfdb', position: 'relative', zIndex: '1' }}>
                    <Typography component="h1" variant="h5" style={{ marginBottom: '20px', textAlign: 'center' }}>
                        Signup/Register
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={user.name}
                            onChange={handleChange}
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                        />
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={user.email}
                            onChange={handleChange}
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
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
                            autoComplete="current-password"
                            value={user.password}
                            onChange={handleChange}
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                        />
                        <TextField
                            variant="filled"
                            margin="normal"
                            fullWidth
                            id="age"
                            label="Age"
                            name="age"
                            type="number"
                            value={user.age}
                            onChange={handleChange}
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                        />
                        <FormControl fullWidth style={{ marginTop: 20 }}>
                            <InputLabel>Gender</InputLabel>
                            <Select
                                label="Gender"
                                id="gender"
                                name="gender"
                                value={user.gender}
                                onChange={handleChange}
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                        {error && <Typography color="error" variant="body2" style={{ marginBottom: '10px', textAlign: 'center' }}>{error}</Typography>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{ marginTop: 30, backgroundColor: 'green', color: 'white' }}
                        >
                            Sign Up
                        </Button>
                    </form>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: 20, backgroundColor: 'green', color: 'white' }}
                        onClick={handleBack}
                    >
                        Back to Login
                    </Button>
                </Paper>
            </Container>
        </div>
    );
}

export default SignupPage;
