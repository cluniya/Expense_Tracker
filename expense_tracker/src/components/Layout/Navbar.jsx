import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Stores/AuthSlice.jsx';

const Navbar = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = () => {
        dispatch(logout());
        navigate('/signin');
    };

    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li className="nav-item-left"><Link to="/">Home</Link></li>
                {!isAuthenticated && <li className="nav-link"><Link to="/signin">Sign In</Link></li>}
                {isAuthenticated && <li className="nav-link"><button onClick={handleSignOut}>Sign Out</button></li>}
                {isAuthenticated && <li className="nav-link"><Link to="/profile">Profile</Link></li>}
            </ul>
        </nav>
    );
};

export default Navbar;
