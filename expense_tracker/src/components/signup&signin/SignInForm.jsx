// SignInForm.js
import React, {  useContext, useRef, useState } from 'react';
// import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './SignInForm.css';
import AuthContext from '../../Store/Context';

const SignInForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const authCtx = useContext(AuthContext);
    const emailRef = useRef();
    const passwordRef = useRef();
    const history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredPass = passwordRef.current.value;

        // Proceed with form submission
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCcBuvzyLwpD9UmfaBIQHVd8UwDvBfucG0';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPass,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            authCtx.setAuthInfo(data.idToken);
            if (data.error) {
                setErrorMessage(data.error.message);
            } else {
                history('/welcome'); // Redirect to a dashboard or home page upon successful login
            }
        })
        .catch(error => {
            setErrorMessage('Authentication failed');
            console.error('Error:', error);
        });
    };

    return (
        <div className="signin-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label><br />
                <input type="email" id="email" ref={emailRef} required /><br /><br />

                <label htmlFor="password">Password:</label><br />
                <input type="password" id="password" ref={passwordRef} required /><br /><br />

                <input type="submit" value="Sign In" />
            </form>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="signup-link">
                <p>Don't have an account? <a href="/">Sign Up</a></p>
            </div>
        </div>
    );
};

export default SignInForm;
