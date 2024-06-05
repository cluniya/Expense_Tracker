import { configureStore, createSlice } from "@reduxjs/toolkit";


const initialState = { 
    counter: { counter: 0 }, 
};


const counterSlice = createSlice({
    name: "counter",
    initialState: initialState.counter,
    reducers: {
        increment(state) {
            state.counter += 2;
        },
        decrement(state) {
            state.counter -= 2;
        }
    }
});

const initialAuthState = {isAuthenticated:false}

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        }
    }
});

const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        auth: authSlice.reducer
    }
});


export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;
export default store;
