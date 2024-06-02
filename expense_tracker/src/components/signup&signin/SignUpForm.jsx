import React, { useRef, useState } from 'react';
import '../signup&signin/SignUpForm.css';

const SignUpForm = () => {
    const [isFormValid, setIsFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPassRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredPass = passwordRef.current.value;
        const enteredConfirmPass = confirmPassRef.current.value;

        // Basic form validation
        if (enteredPass !== enteredConfirmPass) {
            setErrorMessage('Passwords do not match');
            return;
        }

        // Additional validation logic here if needed

        // If form passes validation
        setIsFormValid(true);

        // Clear error message
        setErrorMessage('');

        // Proceed with form submission
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCcBuvzyLwpD9UmfaBIQHVd8UwDvBfucG0';
        
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
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
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

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="login-link">
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>
        </div>
    );
};

export default SignUpForm;
