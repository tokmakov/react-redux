import { configureStore } from '@reduxjs/toolkit';
import postReducer from './postSlice.js';
import userReducer from './userSlice.js';
import tagReducer from './tagSlice.js';

export const store = configureStore({
    reducer: {
        post: postReducer,
        user: userReducer,
        tag: tagReducer,
    },
});
