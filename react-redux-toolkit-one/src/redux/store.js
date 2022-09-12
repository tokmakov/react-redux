import { configureStore } from '@reduxjs/toolkit';
import { todoReducer } from './todoReducer.js';
import { userReducer } from './userReducer.js';

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        user: userReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});
