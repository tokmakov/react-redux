import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux/actions.js';

export function TodoItem(props) {
    // извлекаем их хранилища один элемент списка задач по id
    const todo = useSelector((state) => state.todo.find((item) => item.id === props.id));
    const { id, title, completed } = todo;

    // создаем две функции для отправки экшенов в хранилище
    const dispatch = useDispatch();
    const toggle = () => dispatch(actions.todo.toggle(id));
    const remove = () => dispatch(actions.todo.remove(id));

    return (
        <div className="todo-item">
            <span>
                <input type="checkbox" checked={completed} onChange={toggle} />
                &nbsp;
                <span>{title}</span>
            </span>
            <span className="remove" onClick={remove}>
                &times;
            </span>
        </div>
    );
}
