import React from 'react';
import './Premiums.css';
import { useDispatch, useSelector } from 'react-redux';
import { premiumsupgrader } from '../../Stores/ThemeReducer';
const Premiums = () => {
    const darkModeStatus = useSelector(state => state.theme.darkMode)
    const dispatch = useDispatch();

    const handlePremium = ()=>{
        dispatch(premiumsupgrader());
        console.log(darkModeStatus);
    }
    return (
        <div className="premium-page">
            <h2>Congratulations! You've reached the premium threshold.</h2>
            <p>Upgrade now to unlock exclusive features and benefits.</p>
            <button className="activate-button" onClick={handlePremium}>Activate Premium</button>
        </div>
    );
};

export default Premiums;
