import { configureStore } from '@reduxjs/toolkit';
import { todoApi } from './todoApi';
import { userSlice } from './userSlice';

export const store = configureStore({
    reducer: {
        [todoApi.reducerPath]: todoApi.reducer,
        [userSlice.name]: userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoApi.middleware),
});
