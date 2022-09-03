import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../redux/actions.js';
import { v4 as uuid } from 'uuid';

export function TodoForm(props) {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleClick = () => {
        if (text.trim().length !== 0) {
            const data = {
                id: uuid(),
                title: text,
                completed: false,
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
