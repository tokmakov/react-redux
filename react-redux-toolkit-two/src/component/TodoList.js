import { useSelector, shallowEqual } from 'react-redux';
import { selectors } from '../redux/selectors.js';
import { TodoItem } from './TodoItem.js';

export function TodoList(props) {
    const ids = useSelector(selectors.todo.ids, shallowEqual);

    return (
        <div className="todo-list">
            {ids.length > 0 ? (
                ids.map((id) => <TodoItem key={id} id={id} />)
            ) : (
                <p>Список задач пустой</p>
            )}
        </div>
    );
}
