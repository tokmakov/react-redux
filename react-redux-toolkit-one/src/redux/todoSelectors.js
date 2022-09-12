// функцию createSelector теперь можно импортировать из @reduxjs/toolkit
import { createSelector } from '@reduxjs/toolkit';
import { createCachedSelector } from 're-reselect';

export const all = (state) => state.todo; // массив всех задач
export const allLength = createSelector( // количество всех задач
    all,
    (items) => items.length
);
export const completed = createSelector( // массив завершенных задач
    all,
    (items) => items.filter((item) => item.completed)
);
export const completedLength = createSelector( // количество завершенных задач
    completed,
    (items) => items.length
);
export const uncompleted = createSelector( // массив не завершенных задач
    all,
    (items) => items.filter((item) => !item.completed)
);
export const uncompletedLength = createSelector( // количество не завершенных задач
    uncompleted,
    (items) => items.length
);
export const ids = createSelector( // идентификаторы всех задач
    all,
    (items) => items.map((item) => item.id)
);
export const findById = createCachedSelector( // поиск задачи по идентификатору
    all,
    (state, id) => id,
    (items, id) => items.find((item) => item.id === id)
)(
    (state, id) => id
);
