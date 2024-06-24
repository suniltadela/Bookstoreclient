import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Paper, Snackbar, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

function LoginPage() {
    const [logindetails, setlogindetails] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [showerorstatus, setshowerorstatus] = useState(false);
    const [errormsg, seterrormsg] = useState('');
    const [userData, setUserData] = useState(null);
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
        setUserData({ name: logindetails.email });
        Cookies.set('access_token', accesstoken, { expires: 30 });
        setLoading(false);
        seterrormsg('Login successful!');
        setTimeout(() => {
            navigate('/home');
        }, 1500);
    };

    const onsubmitfailure = (error) => {
        setLoading(false);
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
        setLoading(true);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/login`,
                logindetails,
                { withCredentials: true }
            );
            const data = response.data;
            if (response.status === 200) {
                onSubmitSuccess(data.accessToken);
            }
        } catch (error) {
            onsubmitfailure(error);
        }
    };

    const onChangeUserInput = (e) => {
        setlogindetails({ ...logindetails, email: e.target.value });
    };

    const onChangePassInput = (e) => {
        setlogindetails({ ...logindetails, password: e.target.value });
    };

    const handleCloseSnackbar = () => {
        setshowerorstatus(false);
    };

    return (
        <div style={{ position: 'relative' }}>
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
                            disabled={loading}
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
                            disabled={loading}
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
                            disabled={loading}
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="primary"
                            style={{ marginTop: 10, backgroundColor: '#278A24', color: 'white' }}
                            onClick={handleSignup}
                            disabled={loading}
                        >
                            Register / Sign Up
                        </Button>
                        <Typography variant="body2" style={{ marginTop: 10 }}>
                            <Link component={RouterLink} to="/forgot-password" style={{ textDecoration: 'none', color: '#278A24' }}>
                                Forgot password?
                            </Link>
                        </Typography>
                    </form>
                </Paper>
            </Container>
            <Snackbar
                open={showerorstatus}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={errormsg}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                ContentProps={{
                    style: { backgroundColor: errormsg.includes('successful') ? 'green' : 'red' },
                }}
            />
        </div>
    );
}

export default LoginPage;
