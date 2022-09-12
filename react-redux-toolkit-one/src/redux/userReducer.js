import { createReducer } from '@reduxjs/toolkit';
import { userLogin, userLogout } from './userActions.js';

const initState = {
    auth: false,
};

export const userReducer = createReducer(initState, (builder) => {
    builder
        .addCase(userLogin, (state, action) => { // userLogin.toString() === 'USER_LOGIN'
            state.auth = true;
        })
        .addCase(userLogout, (state, action) => { // userLogout.toString() === 'USER_LOGOUT'
            state.auth = false;
        });
});
