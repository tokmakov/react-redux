import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    loading: false,
    error: null,
};

const todoSlice = createSlice({
    name: 'todo',
    initialState: initialState,
    reducers: {
        create(state, action) {
            state.items.push(action.payload);
        },
        toggle(state, action) {
            const item = state.items.find((item) => item.id === action.payload);
            item.completed = !item.completed;
        },
        remove(state, action) {
            const items = state.items.filter((item) => item.id !== action.payload);
            state.items = items;
        },
        fetchStarted(state, action) { // отправка запроса
            state.loading = true;
            state.error = null;
        },
        fetchSuccess(state, action) { // получение ответа
            state.loading = false;
            state.error = null;
            state.items = action.payload;
        },
        fetchFailure(state, action) { // произошла ошибка
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { create, toggle, remove } = todoSlice.actions; // генераторы действий
const { fetchStarted, fetchSuccess, fetchFailure } = todoSlice.actions; // генераторы действий

export const fetchProcess = () => {
    return async (dispatch, getState) => {
        dispatch(fetchStarted()); // отправка запроса
        setTimeout(async () => { // для увеличения задержки, чтобы увидеть loader
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=8');
                if (!response.ok) {
                    throw new Error('Ошибка при получении списка задач');
                }
                const jsonData = await response.json();
                const items = jsonData.map((item) => {
                    return { id: item.id, title: item.title, completed: item.completed };
                });
                dispatch(fetchSuccess(items)); // получение ответа
            } catch (error) {
                dispatch(fetchFailure(error.message)); // произошла ошибка
            }
        }, 1000);
    };
};

export default todoSlice.reducer;
