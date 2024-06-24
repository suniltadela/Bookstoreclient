import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Paper, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetPassword, closeSnackbar } from '../../Redux/Reducer/Resetpasswordslice/Resetpasswordslice';

function ResetPasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { identifier, otp } = location.state || {}; // default to empty object if state is undefined
    const { loading, snackbar } = useSelector((state) => state.resetPassword);

    useEffect(() => {
        if (snackbar.severity === 'success') {
            setTimeout(() => {
                navigate('/login');
            }, 2000); // Redirect to login after 2 seconds
        }
    }, [snackbar, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'password') {
            setPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            dispatch(closeSnackbar());
            return;
        }
        dispatch(resetPassword({ identifier, otp, newPassword: password }));
    };

    const handleCloseSnackbar = () => {
        dispatch(closeSnackbar());
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
                        disabled={loading}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
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
