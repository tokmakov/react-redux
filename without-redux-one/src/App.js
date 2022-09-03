import './App.css';
import { useState } from 'react';
import { TodoList } from './component/TodoList.js';
import { TodoForm } from './component/TodoForm.js';
import { StatusBar } from './component/StatusBar.js';
import { v4 as uuid } from 'uuid';

const initState = [
    { id: 1, title: 'Первая задача', completed: false },
    { id: 2, title: 'Вторая задача', completed: true },
    { id: 3, title: 'Третья задача', completed: false },
    { id: 4, title: 'Четвертая задача', completed: true },
    { id: 5, title: 'Пятая задача', completed: false },
];

function App() {
    const [todos, setTodos] = useState(initState);

    const create = text => {
        const newTodo = {
            id: uuid(),
            title: text,
            completed: false,
        };
        setTodos([...todos, newTodo]);
    };
    const toggle = id => {
        const newTodos = todos.map(todo => {
            return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
        });
        setTodos(newTodos);
    };
    const remove = id => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const completed = () => todos.filter(todo => todo.completed).length;
    const uncompleted = () => todos.filter(todo => !todo.completed).length;

    return (
        <div className="App">
            <h1>Список задач</h1>
            <TodoForm create={create} />
            <StatusBar
                total={todos.length}
                completed={completed()}
                uncompleted={uncompleted()}
            />
            <TodoList todos={todos} toggle={toggle} remove={remove} />
        </div>
    );
}

export default App;
