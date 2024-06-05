import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn, resetPassword } from '../../Stores/AuthSlice';
import './SignInForm.css';

const SignInForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const passwordRef = useRef();
    const emailRef = useRef();
    const history = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const enteredEmail = emailRef.current.value;
        const enteredPass = passwordRef.current.value;

        try {
            await dispatch(signIn({ email: enteredEmail, password: enteredPass })).unwrap();
            history('/expense');
        } catch (error) {
            setErrorMessage('Authentication failed');
            console.error('Error:', error);
        }
    };

    const handleForgotPassword = () => {
        setShowForgotPassword(true);
    };

    const handleResetPassword = async () => {
        const enteredEmail = emailRef.current.value;
        setLoading(true);

        try {
            await dispatch(resetPassword(enteredEmail)).unwrap();
            setSuccessMessage('A password reset link has been sent to your email.');
        } catch (error) {
            setErrorMessage('An error occurred while processing your request');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signin-container">
            {!showForgotPassword ? <h2>Sign In</h2> : <h2>Reset Password</h2>}
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
                        <button type="button" onClick={handleResetPassword}>Reset Password</button><br /><br />
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
