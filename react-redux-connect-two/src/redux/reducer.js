import { combineReducers } from 'redux';
import { todoReducer } from './todoReducer.js';
import { userReducer } from './userReducer.js';

export const reducer = combineReducers({
    todo: todoReducer,
    user: userReducer,
});
