import { useUpdateTodoMutation, useRemoveTodoMutation } from '../redux/todoApi';
import { useSelector, useDispatch } from 'react-redux';
import { setView, setEdit, setUpdating } from '../redux/userSlice';
import { Loader } from './Loader';
import { useEffect } from 'react';

export function TodoItem(props) {
    const { id, title, completed } = props;

    // при удалении задачи мы должны будем установить в null значение id просматриваемой или
    // редактируемой задачи, если это просматривается или редактируется именно эта задача
    const viewTodo = useSelector((state) => state.user.view);
    const editTodo = useSelector((state) => state.user.edit);

    const dispatch = useDispatch();

    const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();
    const [removeTodo, { isLoading: isRemoving }] = useRemoveTodoMutation();

    const handleToggle = () => {
        updateTodo({
            id: id,
            completed: !completed,
        });
    };

    const handleRemove = () => {
        removeTodo(id);
        if (id === viewTodo) {
            dispatch(setView(null));
        }
        if (id === editTodo) {
            dispatch(setEdit(null));
        }
    };

    return (
        <div className="todo-item">
            <span>
                <input type="checkbox" checked={completed} onChange={handleToggle} />
                &nbsp;
                <span>{title}</span>
                &nbsp;
                <button onClick={() => dispatch(setView(id))}>View</button>
                &nbsp;
                <button onClick={() => dispatch(setEdit(id))}>Edit</button>
                {(isUpdating || updating) && <Loader />}
                {isRemoving && <Loader />}
            </span>
            <span className="remove" onClick={handleRemove}>
                &times;
            </span>
        </div>
    );
}
