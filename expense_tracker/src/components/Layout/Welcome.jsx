// WelcomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
    const history = useNavigate();

    const handleProfileUpdate = () => {
        history('/update-profile'); // Redirect to update profile page
    };

    return (
        <div className="welcome-container">
            <h1>Welcome to Your Dashboard</h1>
            <p>Your profile has not been completed.</p>
            <button onClick={handleProfileUpdate}>Click here to complete your profile</button>
        </div>
    );
};

export default Welcome;
