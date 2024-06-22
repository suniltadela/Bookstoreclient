import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, Snackbar } from '@mui/material';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function ResetPasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();
    const location = useLocation();
    const { identifier,otp } = location.state;

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'password') {
            setPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        // console.log(location.state,'loc')
        e.preventDefault();
        if (password !== confirmPassword) {
            setSnackbar({ open: true, message: 'Passwords do not match', severity: 'error' });
            return;
        }
        try {
            const response = await axios.post(`
                ${process.env.REACT_APP_BASE_URL}/update-password`, {
                identifier,
                otp,
                newPassword: password
            });
            setSnackbar({ open: true, message: response.data.message, severity: 'success' });
            navigate('/login');
        } catch (error) {
            setSnackbar({ open: true, message: 'Failed to reset password. Please try again.', severity: 'error' });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Container component="main" maxWidth="xs" style={{ paddingTop: 150 }}>
            <Paper elevation={6} style={{ padding: 30, backgroundColor: '#b2dfdb' }}>
                <Typography component="h1" variant="h5" style={{ marginBottom: 20 }}>
                    Reset Password
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="filled"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="New Password"
                        name="password"
                        type="password"
                        autoFocus
                        value={password}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="filled"
                        margin="normal"
                        required
                        fullWidth
                        id="confirmPassword"
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: 20, backgroundColor: '#278A24', color: 'white' }}
                    >
                        Reset Password
                    </Button>
                </form>
            </Paper>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbar.message}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                ContentProps={{
                    'aria-describedby': 'message-id',
                    style: { backgroundColor: snackbar.severity === 'success' ? 'green' : 'red' },
                }}
            />
        </Container>
    );
}

export default ResetPasswordPage;
