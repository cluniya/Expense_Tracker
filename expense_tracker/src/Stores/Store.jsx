// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice.jsx';
import expensesReducer from './expensesSlice.jsx'
import themeReducer from './ThemeReducer.jsx';
const store = configureStore({
    reducer: {
        auth: authReducer,
        expenses: expensesReducer,
        theme: themeReducer,
    },
});

export default store;
