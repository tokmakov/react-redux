import { useContext } from 'react';
import { TodoContext } from './TodoContext.js';

export function StatusBar(props) {
    const { todos, completed, uncompleted } = useContext(TodoContext);

    return (
        <div className="status-bar">
            Всего задач {todos.length}, не завершенных {uncompleted()}, завершенных {completed()}.
        </div>
    );
}
