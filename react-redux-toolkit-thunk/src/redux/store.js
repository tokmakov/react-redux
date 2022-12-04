import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice.js';
import userReducer from './userSlice.js';

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        user: userReducer,
    },
});
