// UpdateProfile.js
import React, { useContext, useState,useRef } from 'react';
import './UpdateProfile.css';
import AuthContext from '../../Store/Context';

const UpdateProfile = () => {
    // const [fullName, setFullName] = useState('');
    // const [profilePhotoUrl, setProfilePhotoUrl] = useState('');
    const [message, setMessage] = useState('');
    const authCtx = useContext(AuthContext);

    const nameRef = useRef();
    const profileUrlRef = useRef();

    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCcBuvzyLwpD9UmfaBIQHVd8UwDvBfucG0';

    const handleSubmit = (e) => {
        e.preventDefault();

        const enteredName = nameRef.current.value;
        const enteredProfileUrl = nameRef.current.value;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                idToken : authCtx.token,
                displayName : enteredName,
                photoUrl: enteredProfileUrl,
                deleteAttribute : null,
                returnSecureToken: false
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setMessaget(data.error.message);
                console.log(data.error.message);
            } else {
                console.log(data);
                history('/welcome'); // Redirect to a dashboard or home page upon successful login
            }
        })
        .catch(error => {
            // setErrorMessage('Update Profile failed');
            console.error('Error:', error);
        });
        // Here you would typically make an API call to update the profile
        // For this example, we are just setting a success message
        setMessage('Profile updated successfully!');
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
                    type="url"
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
