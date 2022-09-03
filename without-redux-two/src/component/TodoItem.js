import { useContext } from 'react';
import { TodoContext } from './TodoContext.js';

export function TodoItem(props) {
    const { id, title, completed } = props;
    const { toggle, remove } = useContext(TodoContext);

    return (
        <div className="todo-item">
            <span>
                <input type="checkbox" checked={completed} onChange={() => toggle(id)} />
                &nbsp;
                {title}
            </span>
            <span className="remove" onClick={() => remove(id)}>
                &times;
            </span>
        </div>
    );
}
