import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    view: null, // идентификатор просматриваемой пользователем задачи
    edit: null, // идентификатор редактируемой пользователем задачи
    page: 1,    // номер текущей страницы списка задач при пагинации
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
        setPage(state, action) {
            state.page = action.payload;
        },
    },
});

export const { setView, setEdit, setPage } = userSlice.actions; // генераторы действий
