// AuthContext.js
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token,setToken] = useState();
    const [authState, setAuthState] = useState({ token: null, isAuthenticated: false });

    const setAuthInfo = (token) => {
        setAuthState({ token, isAuthenticated: !!token });
        setToken(token);
    };

    return (
        <AuthContext.Provider value={{ authState, setAuthInfo ,token}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
