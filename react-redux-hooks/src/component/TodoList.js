import { useSelector } from 'react-redux';
import { TodoItem } from './TodoItem.js';

export function TodoList(props) {
    const items = useSelector((state) => state.todo);

    return (
        <div className="todo-list">
            {items.length > 0 ? (
                items.map(item => <TodoItem key={item.id} id={item.id} />)
            ) : (
                <p>Список задач пустой</p>
            )}
        </div>
    );
}
