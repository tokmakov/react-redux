import { useContext, useState } from 'react';
import { TodoContext } from './TodoContext.js';

export function TodoForm(props) {
    const [text, setText] = useState('');
    const context = useContext(TodoContext);

    const handleChange = (event) => {
        setText(event.target.value);
    };
    const handleClick = () => {
        if (text.trim().length !== 0) {
            context.create(text);
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
