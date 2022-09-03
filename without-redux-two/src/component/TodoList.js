import { useContext } from 'react';
import { TodoContext } from './TodoContext.js';
import { TodoItem } from './TodoItem.js';

export function TodoList(props) {
    const context = useContext(TodoContext);
    return (
        <div className="todo-list">
            {context.todos.length > 0 ? (
                context.todos.map((todo) => <TodoItem key={todo.id} {...todo} />)
            ) : (
                <p>Список задач пустой</p>
            )}
        </div>
    );
}
