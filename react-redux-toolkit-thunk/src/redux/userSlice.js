import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    auth: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        login(state, action) {
            state.auth = true;
        },
        logout(state, action) {
            state.auth = false;
        },
    },
});

export const { login, logout } = userSlice.actions; // генераторы действий

export default userSlice.reducer;
