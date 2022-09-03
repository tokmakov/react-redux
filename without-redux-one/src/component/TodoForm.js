import { useState } from 'react';

export function TodoForm(props) {
    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    };
    const handleClick = () => {
        if (text.trim().length !== 0) {
            props.create(text);
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
