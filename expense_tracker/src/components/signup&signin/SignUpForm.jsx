import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../Stores/AuthSlice';
import '../signup&signin/SignUpForm.css';

const SignUpForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.auth);
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPassRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredPass = passwordRef.current.value;
        const enteredConfirmPass = confirmPassRef.current.value;

        // Basic form validation
        if (enteredPass !== enteredConfirmPass) {
            setErrorMessage('Passwords do not match');
            return;
        }

        try {
            await dispatch(signUp({ email: enteredEmail, password: enteredPass })).unwrap();
            navigate('/signin');
        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label><br />
                <input type="email" id="email" ref={emailRef} required /><br /><br />

                <label htmlFor="password">Password:</label><br />
                <input type="password" id="password" ref={passwordRef} required /><br /><br />

                <label htmlFor="confirm_password">Confirm Password:</label><br />
                <input type="password" id="confirm_password" ref={confirmPassRef} required /><br /><br />

                <input type="submit" value="Sign Up" />
            </form>

            {status === 'loading' && <p>Loading...</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {error && <p className="error-message">{error}</p>}

            <div className="login-link">
                <p>Already have an account? <a href="/signin">Login</a></p>
            </div>
        </div>
    );
};

export default SignUpForm;
