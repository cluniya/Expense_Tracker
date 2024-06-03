// UpdateProfile.js
import React, { useContext, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdateProfile.css';
import AuthContext from '../../Store/Context';

const UpdateProfile = () => {
    const [message, setMessage] = useState('');
    const authCtx = useContext(AuthContext);
    const history = useNavigate();

    const nameRef = useRef();
    const profileUrlRef = useRef();

    // Use useEffect to set the initial values of the form fields
    useEffect(() => {
        if (authCtx.authState.user) {
            nameRef.current.value = authCtx.authState.user.displayName || '';
            profileUrlRef.current.value = authCtx.authState.user.photoUrl || '';
        }
    }, [authCtx.authState.user]);

    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCcBuvzyLwpD9UmfaBIQHVd8UwDvBfucG0';

    const handleSubmit = (e) => {
        e.preventDefault();

        const enteredName = nameRef.current.value;
        const enteredProfileUrl = profileUrlRef.current.value;

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                idToken: authCtx.authState.token,
                displayName: enteredName,
                photoUrl: enteredProfileUrl,
                returnSecureToken: false
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setMessage(data.error.message);
            } else {
                setMessage('Profile updated successfully!');
                // Optionally update the context with the new user details
                authCtx.setAuthInfo(authCtx.authState.token); // This will refetch user details
                history('/welcome'); // Redirect to the welcome page
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setMessage('Update Profile failed');
        });
    };

    return (
        <div className="update-profile-container">
            <h2>Update Profile</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="full_name">Full Name:</label><br />
                <input
                    type="text"
                    id="full_name"
                    ref={nameRef}
                    required
                /><br /><br />

                <label htmlFor="profile_photo_url">Profile Photo URL:</label><br />
                <input
                    type="text"
                    id="profile_photo_url"
                    ref={profileUrlRef}
                    required
                /><br /><br />

                <input type="submit" value="Update Profile" />
            </form>

            {message && <p className="success-message">{message}</p>}
        </div>
    );
};

export default UpdateProfile;
