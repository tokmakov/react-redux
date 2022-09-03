/*
// без использования мемоизированных селекторов
export const all = (state) => { // массив всех задач
    console.log('Call selector function all');
    return state.todo;
}
export const allLength = (state) => all(state).length; // количество всех задач
export const completed = (state) => all(state).filter((item) => item.completed); // завершенные задачи
export const completedLength = (state) => completed(state).length; // кол-во завершенных задач
export const uncompleted = (state) => all(state).filter((item) => !item.completed); // не завершенные задачи
export const uncompletedLength = (state) => uncompleted(state).length; // кол-во не завершенных задач
export const findById = (state, id) => all(state).find((item) => item.id === id);
export const ids = (state) => all(state).map((item) => item.id);
*/

// с использованием мемоизированных селекторов
import { createSelector } from 'reselect';

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
export const findById = (state, id) => all(state).find((item) => item.id === id);
export const ids = createSelector(
    all,
    (items) => items.map((item) => item.id)
);

/*
// с использованием мемоизированных селекторов
import { createSelector } from 'reselect';

function sleep(ms) {
    const nowDate = Date.now();
    let curDate;
    do {
        curDate = Date.now();
    } while (curDate - nowDate < ms);
}

export const all = (state) => state.todo; // массив всех задач
export const allLength = createSelector( // количество всех задач
    all,
    (items) => items.length
);
export const completed = createSelector( // массив завершенных задач
    all,
    (items) => {
        console.log('Тяжелые вычисления, функция completed');
        sleep(1000);
        return items.filter((item) => item.completed);
    }
);
export const completedLength = createSelector( // количество завершенных задач
    completed,
    (items) => {
        console.log('Тяжелые вычисления, функция completedLength');
        sleep(1000);
        return items.length;
    }
);
export const uncompleted = createSelector( // массив не завершенных задач
    all,
    (items) => {
        console.log('Тяжелые вычисления, функция uncompleted');
        sleep(1000);
        return items.filter((item) => !item.completed);
    }
);
export const uncompletedLength = createSelector( // количество не завершенных задач
    uncompleted,
    (items) => {
        console.log('Тяжелые вычисления, функция uncompletedLength');
        sleep(1000);
        return items.length;
    }
);
export const findById = (state, id) => all(state).find((item) => item.id === id);
export const ids = createSelector(
    all,
    (items) => items.map((item) => item.id)
);
*/
