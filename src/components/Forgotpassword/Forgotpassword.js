import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, CircularProgress, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, closeSnackbar } from '../../Redux/Reducer/Forgetpasswordslice/Forgetpasswordslice'; // Correct import
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function ForgotPasswordPage() {
    const dispatch = useDispatch();
    const { loading, otpSent, snackbar } = useSelector((state) => state.forgotPassword);
    const [identifier, setIdentifier] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'identifier') {
            setIdentifier(value);
        } else if (name === 'countryCode') {
            setCountryCode(value);
        } else if (name === 'otp') {
            setOtp(value);
        }
    };

    const handleSendOtp = (e) => {
        e.preventDefault();
        dispatch(sendOtp({ identifier }));
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        if (otpSent) {
            navigate('/reset-password', { state: { identifier, otp } });
        }
    };

    const handleCloseSnackbar = () => {
        dispatch(closeSnackbar());
    };

    return (
        <Container component="main" maxWidth="xs" style={{ paddingTop: 150 }}>
            <Paper elevation={6} style={{ padding: 30, backgroundColor: '#b2dfdb' }}>
                <Typography component="h1" variant="h5" style={{ marginBottom: 20 }}>
                    Forgot Password
                </Typography>
                <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
                    <TextField
                        variant="filled"
                        margin="normal"
                        required
                        fullWidth
                        id="identifier"
                        label="Email "
                        name="identifier"
                        autoFocus
                        value={identifier}
                        onChange={handleChange}
                        disabled={otpSent}
                    />
                    {/* {!identifier.includes('@') && (
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            id="countryCode"
                            label="Country Code"
                            name="countryCode"
                            value={countryCode}
                            onChange={handleChange}
                            disabled={otpSent}
                        />
                    )} */}
                    {otpSent && (
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            id="otp"
                            label="Enter OTP"
                            name="otp"
                            value={otp}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: loading ? (
                                    <CircularProgress size={20} />
                                ) : (
                                    <CheckCircleIcon color="success" />
                                ),
                            }}
                        />
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: 20, backgroundColor: '#278A24', color: 'white' }}
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : otpSent ? 'Verify OTP' : 'Send OTP'}
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
                    style: { backgroundColor: snackbar.severity === 'success' ? 'green' : 'red' },
                }}
            />
        </Container>
    );
}

export default ForgotPasswordPage;
