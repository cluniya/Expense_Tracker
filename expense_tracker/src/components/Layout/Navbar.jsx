// Navbar.js
import React, { useContext } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import AuthContext from '../../Store/Context';
import './Navbar.css';

const Navbar = () => {
    const authCtx = useContext(AuthContext);
    const history = useNavigate();

    const handleSignOut = () => {
        // Clear the idToken stored in local storage
        localStorage.removeItem('idToken');
        // Update the auth state to clear the token
        authCtx.setAuthInfo(null);
        // Redirect the user to the login page
        history('/signin');
    };

    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li className="nav-item-left"><Link to="/">Home</Link></li>
                {!authCtx.authState.isAuthenticated && <li className="nav-link"><Link to="/signin">Sign In</Link></li>}
                {authCtx.authState.isAuthenticated && <li className="nav-link"><button onClick={handleSignOut}>Sign Out</button></li>}
                {authCtx.authState.isAuthenticated && <li className="nav-link"><Link to="/">Profile</Link></li>}
            </ul>
        </nav>
    );
};

export default Navbar;
