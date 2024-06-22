import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, CircularProgress, Snackbar, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function ForgotPasswordPage() {
    const [identifier, setIdentifier] = useState('');
    const [countryCode, setCountryCode] = useState('+91'); // Default country code
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'identifier') {
            setIdentifier(value);
        } else if (name === 'countryCode') {
            setCountryCode(value);
        } else if (name === 'otp') {
            // Validate and parse OTP as a number (assuming it's numeric)
            const parsedOTP = parseInt(value, 10);
            if (!isNaN(parsedOTP)) { // Check if it's a valid number
                setOtp(parsedOTP);
            }
        }
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/forgot-password`, {
                identifier: identifier.includes('@') ? identifier : `${countryCode}${identifier}` // Include country code if it's a phone number
            });
            setOtpSent(true);
            setLoading(false);
            setSnackbar({ open: true, message: 'OTP sent successfully', severity: 'success' });
        } catch (error) {
            setLoading(false);
            setSnackbar({ open: true, message: 'Failed to send OTP. Please try again.', severity: 'error' });
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/verify-otp`, {
                identifier: identifier.includes('@') ? identifier : `${countryCode}${identifier}`, // Include country code if it's a phone number
                otp
            });
            setLoading(false);
            setOtpVerified(true);
            setSnackbar({ open: true, message: 'OTP verified successfully', severity: 'success' });
            navigate('/reset-password', { state: { identifier, otp } });
        } catch (error) {
            setLoading(false);
            setSnackbar({ open: true, message: error.response ? error.response.data.message : 'Failed to verify OTP. Please try again.', severity: 'error' });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
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
                        label="Email"
                        name="identifier"
                        autoFocus
                        value={identifier}
                        onChange={handleChange}
                        disabled={otpSent}
                    />
                    {/* {!identifier.includes('@') && !otpSent && (
                        <FormControl fullWidth style={{ marginTop: 20 }}>
                            <InputLabel>Country Code</InputLabel>
                            <Select
                                label="Country Code"
                                id="countryCode"
                                name="countryCode"
                                value={countryCode}
                                onChange={handleChange}
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                            >
                                <MenuItem value="+91">India (+91)</MenuItem>
                                <MenuItem value="+1">United States (+1)</MenuItem>
                                <MenuItem value="+44">United Kingdom (+44)</MenuItem>
                            </Select>
                        </FormControl>
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
                                ) : otpVerified ? (
                                    <CheckCircleIcon color="success" />
                                ) : null,
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
                        {otpSent ? 'Verify OTP' : 'Send OTP'}
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

export default ForgotPasswordPage;
