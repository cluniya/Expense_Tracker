// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: null,
        isAuthenticated: false,
        user: null,
    });

    const fetchUserDetails = (token) => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCcBuvzyLwpD9UmfaBIQHVd8UwDvBfucG0`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idToken: token,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.error('Error fetching user details:', data.error.message);
                } else {
                    setAuthState((prevState) => ({
                        ...prevState,
                        user: data.users[0],
                    }));
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const setAuthInfo = (token) => {
        setAuthState({ token, isAuthenticated: !!token, user: null });
        fetchUserDetails(token);
    };

    return (
        <AuthContext.Provider value={{ authState, setAuthInfo }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
