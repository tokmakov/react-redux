import { useSelector, shallowEqual } from 'react-redux';
import { selectors } from '../redux/selectors.js';
import { TodoItem } from './TodoItem.js';

export function TodoList(props) {
    console.log('Component TodoList render');
    let selector = selectors.todo.all;
    if (props.completed === true) selector = selectors.todo.completed;
    if (props.completed === false) selector = selectors.todo.uncompleted;
    const items = useSelector(selector, shallowEqual);

    return (
        <div className="todo-list">
            {items.length > 0 ? (
                items.map((item) => <TodoItem key={item.id} id={item.id} />)
            ) : (
                <p>Список задач пустой</p>
            )}
        </div>
    );
}
