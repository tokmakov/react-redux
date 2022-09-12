import { createReducer } from '@reduxjs/toolkit';
import { todoCreate, todoToggle, todoRemove } from './todoActions.js';

const initState = [
    { id: 1, title: 'Первая задача', completed: false },
    { id: 2, title: 'Вторая задача', completed: true },
    { id: 3, title: 'Третья задача', completed: false },
    { id: 4, title: 'Четвертая задача', completed: true },
    { id: 5, title: 'Пятая задача', completed: false },
];

export const todoReducer = createReducer(initState, (builder) => {
    builder
        .addCase(todoCreate, (state, action) => { // todoCreate.toString() === 'TODO_CREATE'
            state.push(action.payload); // мутация state
        })
        .addCase(todoToggle, (state, action) => { // todoToggle.toString() === 'TODO_TOGGLE'
            const item = state.find((item) => item.id === action.payload);
            item.completed = !item.completed; // мутация state
        })
        .addCase(todoRemove, (state, action) => { // todoRemove.toString() === 'TODO_REMOVE'
            return state.filter((item) => item.id !== action.payload); // возврат нового state
        });
});
