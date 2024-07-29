import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import UserProfile from '../../components/Userprofile/Userprofile';
import BookList from '../../components/BookList';

function HomePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const email = Cookies.get('user_email');
            if (email) {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/getdetails`, {
                        params: { email }
                    });
                    setUser(response.data);
                    setLoading(false);
                } catch (error) {
                    setError('Failed to fetch user data');
                    setLoading(false);
                }
            } else {
                navigate('/login'); // Redirect to login if no user data
            }
        };

        fetchUserData();
    }, [navigate]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="home-page">
            {user && <UserProfile user={user} />}
            <BookList />
        </div>
    );
}

export default HomePage;
