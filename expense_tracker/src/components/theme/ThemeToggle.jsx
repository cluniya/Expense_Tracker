import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme,premiumsupgrader } from "../../Stores/ThemeReducer";

const ThemeToggle = () => {

    const dispatch = useDispatch();
    // const premiumStatus = useSelector(state => state.theme.premiumStatus);
    const darkMode = useSelector(state => state.theme.darkMode)

    const toggleThemes = () => {
      dispatch(toggleTheme());
    };
  
    return (
      <button onClick={toggleThemes}>
        {darkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      </button>
    );
  };
  
  export default ThemeToggle;