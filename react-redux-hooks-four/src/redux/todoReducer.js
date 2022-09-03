import { TODO_CREATE, TODO_TOGGLE, TODO_REMOVE } from './todoTypes.js';

const initState = [
    { id: 1, title: 'Первая задача', completed: false },
    { id: 2, title: 'Вторая задача', completed: true },
    { id: 3, title: 'Третья задача', completed: false },
    { id: 4, title: 'Четвертая задача', completed: true },
    { id: 5, title: 'Пятая задача', completed: false },
];

export function todoReducer(state = initState, action) {
    let newState;
    switch (action.type) {
        case TODO_CREATE:
            newState = [...state, action.payload];
            return newState;
        case TODO_TOGGLE:
            newState = state.map(todo => {
                return todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo;
            });
            return newState;
        case TODO_REMOVE:
            newState = state.filter(todo => todo.id !== action.payload);
            return newState;
        default:
            return state;
    }
}
