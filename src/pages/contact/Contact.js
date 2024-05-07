// ContactPage.js

import React from 'react';
import { Container, Typography, Button } from '@mui/material';

const ContactPage = () => {
    return (
        <Container maxWidth="md" style={{ marginTop: 50, backgroundColor: '#f0f0f0', padding: 20 }}>
            <Typography variant="h4" gutterBottom>
                Contact Us
            </Typography>
            <Typography variant="body1" gutterBottom>
                Feel free to contact us for any inquiries or assistance. We are here to help you!
            </Typography>
            <Typography variant="body1" gutterBottom>
                Email: tskumar328@gmail.com
            </Typography>
            <Typography variant="body1" gutterBottom>
                Phone: +91 7989638760
            </Typography>
            <Button variant="contained" color="primary" style={{ backgroundColor: '#4CAF50', marginRight: 10 }}>
                Email Us
            </Button>
            <Button variant="contained" color="primary" style={{ backgroundColor: '#388E3C' }}>
                Call Us
            </Button>
        </Container>
    );
};

export default ContactPage;
