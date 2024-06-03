import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/login/loginpage'; // Correct the import path
import SignupPage from './pages/signup/Signuppage';
import BookList from './components/BookList';
import Navbar from './components/Navbar/Navbar';
import Contact from './pages/contact/Contact';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <div>
            <Router>
                {/* Navbar outside of Routes */}
                <Navbar />
                <div style={{ position: 'relative' }}>
                    <video autoPlay loop muted style={{ position: 'fixed', width: '100%', height: '100%', objectFit: 'cover', zIndex: '-1' }}>
                        <source src="/Untitled design.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <Routes>
                        {/* Set LoginPage as the default route */}
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/home" element={<PrivateRoute element={<BookList />} />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
