import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        darkMode: false,
        premiumStatus:false
    },
    reducers: {
        toggleTheme(state) {
            state.darkMode = !state.darkMode;
        },
        premiumsupgrader(state){
            state.premiumStatus = !state.premiumStatus;
        }

    },
});

export const { toggleTheme , premiumsupgrader} = themeSlice.actions;
export default themeSlice.reducer;
