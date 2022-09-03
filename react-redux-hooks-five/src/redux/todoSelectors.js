import { createSelector } from 'reselect';
import { createCachedSelector } from 're-reselect';
// import { createCachedSelector } from './createCachedSelector.js'

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
export const ids = createSelector(
    all,
    (items) => items.map((item) => item.id)
);
// окончательный вариант функции, позволяющий кэшировать множество значений
export const findById = createCachedSelector(
    all,
    (state, id) => id,
    (items, id) => items.find((item) => item.id === id)
)(
    (state, id) => id
);

/*
// проверяем, что есть сообщения в консоли при нажатии кнопки «Войти/Выйти»
export const findById = (state, id) => {
    console.log('Поиск элемента списка задач, id =', id);
    sleep(500);
    return all(state).find((item) => item.id === id);
};

function sleep(ms) {
    const nowDate = Date.now();
    let curDate;
    do {
        curDate = Date.now();
    } while (curDate - nowDate < ms);
}
*/

/*
// проверяем, что нет сообщений в консоли при нажатии кнопки «Войти/Выйти»
export const findById = createCachedSelector(
    all,
    (state, id) => id,
    (items, id) => {
        console.log('Поиск элемента списка задач, id =', id);
        sleep(500);
        return items.find((item) => item.id === id);
    }
)(
    (state, id) => id
);

function sleep(ms) {
    const nowDate = Date.now();
    let curDate;
    do {
        curDate = Date.now();
    } while (curDate - nowDate < ms);
}
*/
