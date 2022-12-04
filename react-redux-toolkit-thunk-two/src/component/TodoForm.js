import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../redux/actions.js';
import { create } from '../redux/todoSlice.js';

export function TodoForm(props) {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleClick = () => {
        if (text.trim().length !== 0) {
            const data = {
                title: text.trim(),
                completed: false,
                // jsonplaceholder требует id пользователя
                userId: 1,
            };
            dispatch(actions.todo.create(data));
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
