import React from 'react';
import './Userprofile.css'; // Create a CSS file to style the user profile section

function UserProfile({ user }) {
    return (
        <div className="user-profile">
            <h2>Welcome, {user.name}!</h2>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
        </div>
    );
}

export default UserProfile;
