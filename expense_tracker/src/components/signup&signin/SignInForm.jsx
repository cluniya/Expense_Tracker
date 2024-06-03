import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignInForm.css';
import AuthContext from '../../Store/Context';

const SignInForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const authCtx = useContext(AuthContext);
    const passwordRef = useRef();
    const emailRef = useRef();
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
                history('/welcome');
            }
        })
        .catch(error => {
            setErrorMessage('Authentication failed');
            console.error('Error:', error);
        });
    };

    const handleForgotPassword = () => {
        setShowForgotPassword(true);
    };

    const handleResetPassword = () => {
        const enteredEmail = emailRef.current.value;
        setLoading(true);

        // Call Firebase API for password reset
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCcBuvzyLwpD9UmfaBIQHVd8UwDvBfucG0';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                requestType: 'PASSWORD_RESET',
                email: enteredEmail,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setErrorMessage(data.error.message);
            } else {
                setSuccessMessage('A password reset link has been sent to your email.');
            }
        })
        .catch(error => {
            setErrorMessage('An error occurred while processing your request');
            console.error('Error:', error);
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <div className="signin-container">
            {!showForgotPassword ? <h2>Sign In</h2>:<h2>Reset Password</h2>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label><br />
                <input type="email" id="email" ref={emailRef} required /><br /><br />
                
                {!showForgotPassword && (
                    <>
                        <label htmlFor="password">Password:</label><br />
                        <input type="password" id="password" ref={passwordRef} required /><br /><br />
                    </>
                )}

                {!showForgotPassword ? (
                    <input type="submit" value="Sign In" />
                ) : (
                    <>
                        <button onClick={handleResetPassword}>Reset Password</button><br /><br />
                    </>
                )}
            </form>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {successMessage && <p className="success-message">{successMessage}</p>}

            <div className="signin-links">
                <p>Don't have an account? <a href="/">Sign Up</a></p>
                {!showForgotPassword && (
                    <p onClick={handleForgotPassword} className="forgot-password-link">Forgot Password?</p>
                )}
            </div>

            {loading && <div className="loader">Loading...</div>}
        </div>
    );
};

export default SignInForm;
