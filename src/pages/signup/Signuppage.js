// src/components/SignupPage.js

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
    gender: '',
    phone: '',
    countryCode: '+91'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`, user);
      setUser({
        name: '',
        email: '',
        password: '',
        age: '',
        gender: '',
        phone: '',
        countryCode: '+91'
      });
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert('An error occurred during signup. Please try again.');
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
            <TextField
              variant="filled"
              margin="normal"
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              type="tel"
              value={user.phone}
              onChange={handleChange}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
            />
            <FormControl fullWidth style={{ marginTop: 20 }}>
              <InputLabel>Country Code</InputLabel>
              <Select
                label="Country Code"
                id="countryCode"
                name="countryCode"
                value={user.countryCode}
                onChange={handleChange}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
              >
                <MenuItem value="+91">India (+91)</MenuItem>
                <MenuItem value="+1">United States (+1)</MenuItem>
                <MenuItem value="+44">United Kingdom (+44)</MenuItem>
              </Select>
            </FormControl>
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
