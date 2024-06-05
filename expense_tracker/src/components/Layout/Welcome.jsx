// WelcomePage.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';
import AuthContext from '../../Stores/Context';

const Welcome = () => {
    const history = useNavigate();
    const authCtx = useContext(AuthContext);
    const [message, setMessage] = useState('');

    const handleProfileUpdate = () => {
        history('/update-profile'); // Redirect to update profile page
    };

    const handleVerifyEmail = () => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCcBuvzyLwpD9UmfaBIQHVd8UwDvBfucG0`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                requestType: 'VERIFY_EMAIL',
                idToken: authCtx.authState.token,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setMessage(`Error: ${data.error.message}`);
            } else {
                setMessage('Verification email sent! Please check your inbox.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setMessage('Failed to send verification email.');
        });
    };

    return (
        <div className="welcome-container">
            <h1>Welcome to Your Dashboard</h1>
            <p>Your profile has not been completed.</p>
            <button onClick={handleProfileUpdate}>Click here to complete your profile</button>
            <button onClick={handleVerifyEmail}>Verify Email</button>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Welcome;
