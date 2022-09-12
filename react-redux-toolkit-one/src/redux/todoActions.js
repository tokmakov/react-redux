import { createAction } from '@reduxjs/toolkit';

export const todoCreate = createAction('TODO_CREATE');
export const todoToggle = createAction('TODO_TOGGLE');
export const todoRemove = createAction('TODO_REMOVE');
