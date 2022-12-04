import { useState } from 'react';
import { todoApi } from '../redux/todoApi.js';

const useCreateTodoMutation = todoApi.endpoints.createTodo.useMutation;

export function TodoForm(props) {
    const [text, setText] = useState('');
    const [createTodo] = useCreateTodoMutation();

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleClick = () => {
        if (text.trim().length !== 0) {
            const data = {
                title: text.trim(),
                completed: false,
            };
            createTodo(data);
        }
        setText('');
    };

    return (
        <div className="todo-form">
            <input type="text" value={text} onChange={handleChange} placeholder="Новая задача" />
            <button onClick={handleClick}>Добавить</button>
        </div>
    );
}
