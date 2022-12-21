import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    view: null, // идентификатор просматриваемой пользователем задачи
    edit: null, // идентификатор редактируемой пользователем задачи
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setView(state, action) {
            state.view = action.payload;
        },
        setEdit(state, action) {
            state.edit = action.payload;
        },
    },
});

export const { setView, setEdit } = userSlice.actions; // генераторы действий
