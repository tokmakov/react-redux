import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    { id: 1, title: 'Первая задача', completed: false },
    { id: 2, title: 'Вторая задача', completed: true },
    { id: 3, title: 'Третья задача', completed: false },
    { id: 4, title: 'Четвертая задача', completed: true },
    { id: 5, title: 'Пятая задача', completed: false },
];

const todoSlice = createSlice({
    name: 'todo',
    initialState: initialState,
    reducers: {
        /*
        create(state, action) {
            state.push(action.payload); // мутация state
        },
        */
        create: {
            reducer: (state, action) => {
                state.push(action.payload);
            },
            prepare: (text) => {
                return {
                    payload: {
                        id: uuid(),
                        title: text,
                        completed: false,
                    }
                };
            },
        },
        toggle(state, action) {
            const item = state.find((item) => item.id === action.payload);
            item.completed = !item.completed; // мутация state
        },
        remove(state, action) {
            return state.filter((item) => item.id !== action.payload); // возврат нового state
        },
    },
});
console.log(todoSlice)
export const { create, toggle, remove } = todoSlice.actions; // генераторы действий

export default todoSlice.reducer;
