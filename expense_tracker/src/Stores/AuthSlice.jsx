import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserDetails = createAsyncThunk('auth/fetchUserDetails', async (token) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCcBuvzyLwpD9UmfaBIQHVd8UwDvBfucG0`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken: token }),
    });
    const data = await response.json();
    if (data.error) {
        throw new Error(data.error.message);
    }
    return data.users[0];
});

export const signIn = createAsyncThunk('auth/signIn', async ({ email, password }) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCcBuvzyLwpD9UmfaBIQHVd8UwDvBfucG0`;
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    if (data.error) {
        throw new Error(data.error.message);
    }
    return data.idToken;
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (email) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCcBuvzyLwpD9UmfaBIQHVd8UwDvBfucG0`;
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            requestType: 'PASSWORD_RESET',
            email,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    if (data.error) {
        throw new Error(data.error.message);
    }
    return data;
});

export const signUp = createAsyncThunk('auth/signUp', async ({ email, password }) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCcBuvzyLwpD9UmfaBIQHVd8UwDvBfucG0`;
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    if (data.error) {
        throw new Error(data.error.message);
    }
    return data.idToken;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token'),
        isAuthenticated: !!localStorage.getItem('token'),
        user: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        setAuthInfo(state, action) {
            const token = action.payload;
            if (token) {
                localStorage.setItem('token', token);
                state.token = token;
                state.isAuthenticated = true;
                state.user = null;
                state.status = 'loading';
            } else {
                localStorage.removeItem('token');
                state.token = null;
                state.isAuthenticated = false;
                state.user = null;
                state.status = 'idle';
            }
        },
        logout(state) {
            localStorage.removeItem('token');
            state.token = null;
            state.isAuthenticated = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.token = action.payload;
                state.isAuthenticated = true;
                localStorage.setItem('token', action.payload);
            })
            .addCase(signIn.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                // Handle reset password success
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.token = action.payload;
                state.isAuthenticated = true;
                localStorage.setItem('token', action.payload);
            })
            .addCase(signUp.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export const { setAuthInfo, logout } = authSlice.actions;
export default authSlice.reducer;
