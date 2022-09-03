import { createContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

export const TodoContext = createContext();

const initState = [
    { id: 1, title: 'Первая задача', completed: false },
    { id: 2, title: 'Вторая задача', completed: true },
    { id: 3, title: 'Третья задача', completed: false },
    { id: 4, title: 'Четвертая задача', completed: true },
    { id: 5, title: 'Пятая задача', completed: false },
];

export function TodoContextProvider(props) {
    const [todos, setTodos] = useState(initState);

    const create = (text) => {
        const newTodo = {
            id: uuid(),
            title: text,
            completed: false,
        };
        setTodos([...todos, newTodo]);
    };
    const toggle = (id) => {
        const newTodos = todos.map((todo) => {
            return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
        });
        setTodos(newTodos);
    };
    const remove = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const completed = () => todos.filter((todo) => todo.completed).length;
    const uncompleted = () => todos.filter((todo) => !todo.completed).length;

    const context = {
        todos: todos,
        create: create,
        toggle: toggle,
        remove: remove,
        completed: completed,
        uncompleted: uncompleted,
    };

    return (
        <TodoContext.Provider value={context}>
            {props.children}
        </TodoContext.Provider>
    );
}
