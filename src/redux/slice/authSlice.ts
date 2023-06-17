import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

// declaring the types for our state
const today = new Date();

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogin: false,
        orderIdBlockChain: '',
        publicKey_creater: '',
        roleLogin: '',
    },
    reducers: {
        SET_isLogin_TRUE: (state) => {
            state.isLogin = false;
        },
        SET_isLogin_FALSE: (state) => {
            state.isLogin = true;
        },
        SET_orderIdBlockChain: (state, action: PayloadAction<string>) => {
            state.orderIdBlockChain = action.payload;
        },
        SET_publicKey_CREATER: (state, action: PayloadAction<string>) => {
            state.publicKey_creater = action.payload;
        },
        SET_ROLE_LOGIN: (state, action: PayloadAction<string>) => {
            state.roleLogin = action.payload;
        },
    },
});
// exporting the actions
export const { SET_isLogin_TRUE, SET_isLogin_FALSE, SET_orderIdBlockChain, SET_publicKey_CREATER, SET_ROLE_LOGIN } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
