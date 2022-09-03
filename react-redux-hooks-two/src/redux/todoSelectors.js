export const all = (state) => state.todo; // массив всех задач
export const allLength = (state) => all(state).length; // количество всех задач
export const completed = (state) =>  all(state).filter((item) => item.completed); //завершенные задачи
export const completedLength = (state) => completed(state).length; // кол-во завершенных задач
export const uncompleted = (state) => all(state).filter((item) => !item.completed); // не завершенные
export const uncompletedLength = (state) =>uncompleted(state).length; // кол-во не завершенных задач
export const findById = (state, id) => all(state).find((item) => item.id === id);

