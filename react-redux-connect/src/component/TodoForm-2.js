// еще один вариант реализации, без использования mapDispatchToProps
import { useState } from 'react';
import { connect } from 'react-redux';
import { todoCreate } from '../redux/todoActions.js';
import { v4 as uuid } from 'uuid';

function TodoForm(props) {
    const [text, setText] = useState('');

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
            props.dispatch(todoCreate(data));
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

const TodoFormConnected = connect()(TodoForm);

export { TodoFormConnected as TodoForm };
