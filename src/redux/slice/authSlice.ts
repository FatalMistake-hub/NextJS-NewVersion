import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

// declaring the types for our state
const today = new Date();

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogin: false,
    },
    reducers: {
        SET_isLogin_TRUE: (state) => {
            state.isLogin = false;
        },
        SET_isLogin_FALSE: (state) => {
            state.isLogin = true;
        },
        
    },
});
// exporting the actions
export const { SET_isLogin_TRUE, SET_isLogin_FALSE } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
