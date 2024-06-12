import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios'; // Import Axios

function Loginpage() {
    const [logindetails, setlogindetails] = useState({ email: '', password: '' });
    const [showerorstatus, setshowerorstatus] = useState(false);
    const [errormsg, seterrormsg] = useState('');
    const [userData, setUserData] = useState(null); // Added state for user data
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            navigate('/home');
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleSignup = () => {
        navigate('/signup');
    };

    const onSubmitSuccess = (accesstoken) => {
        // Navigate to home and set user data
        navigate('/home');
        setUserData({ name: logindetails.email }); // Assuming email as name for now
        Cookies.set('access_token', accesstoken, { expires: 30 });
    };

    const onsubmitfailure = (error) => {
    setshowerorstatus(true);
    if (error.response) {
        const responseData = error.response.data;
        if (responseData.error === 'Email already exists') {
            seterrormsg('* Email already exists');
        } else if (responseData.message === 'Invalid email or password') {
            seterrormsg('* Invalid email or password');
        } else if (responseData.message === 'Email not verified. Please check your email.') {
            seterrormsg('* Email not verified. Please check your email.');
        } else {
            seterrormsg('* Login failed. Please try again later.');
        }
    } else {
        seterrormsg('* Login failed. Please try again later.');
    }
};


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('Login details:', logindetails);
            const response = await axios.post(
                'https://bookstoreserver-five.vercel.app/login', 
                logindetails,
                { withCredentials: true } // Ensure credentials are sent with the request
            );
            const data = response.data;
            console.log(response.status, 'response success');
            if (response.status === 200) {
                onSubmitSuccess(data.accessToken);
            }
        } catch (error) {
            console.error('Login Error:', error);
            onsubmitfailure(error);
        }
    };

    const onChangeUserInput = (e) => {
        setlogindetails({ ...logindetails, email: e.target.value });
    };

    const onChangePassInput = (e) => {
        setlogindetails({ ...logindetails, password: e.target.value });
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
                            autoFocus
                            value={logindetails.email}
                            onChange={onChangeUserInput}
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
                            value={logindetails.password}
                            onChange={onChangePassInput}
                        />
                        {showerorstatus && <Typography color="error">{errormsg}</Typography>}
                        {userData && (
                            <Typography>Welcome, {userData.name}!</Typography>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{ marginTop: 20, backgroundColor: '#278A24', color: 'white' }}
                        >
                            Sign In
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="primary"
                            style={{ marginTop: 10, backgroundColor: '#278A24', color: 'white' }}
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
