import { useGetOneTodoQuery, useUpdateTodoMutation, useRemoveTodoMutation } from '../redux/todoApi';
import { useSelector, useDispatch } from 'react-redux';
import { setView, setEdit } from '../redux/userSlice';

export function TodoItem({ id }) {
    const { data, isFetching, isSuccess } = useGetOneTodoQuery(id);

    // при удалении задачи мы должны будем установить в null значение id просматриваемой или
    // редактируемой задачи, если это просматривается или редактируется именно эта задача
    const viewTodo = useSelector((state) => state.user.view);
    const editTodo = useSelector((state) => state.user.edit);

    const dispatch = useDispatch();

    const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();
    const [removeTodo, { isLoading: isRemoving, isSuccess: isRemoved }] = useRemoveTodoMutation();

    const handleToggle = () => {
        updateTodo({
            id: id,
            completed: !data.completed,
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

    if (isRemoved) return null;

    if (isFetching) return (
        <div className="todo-item">
            <span className="info">Получение задачи {id} с сервера...</span>
        </div>
    );
    if (!isSuccess) return (
        <div className="todo-item">
            <span className="error">Не удалось загрузить задачу {id}</span>
        </div>
    );

    if (isUpdating) return (
        <div className="todo-item">
            <span className="info">Обновление задачи {id} на сервере...</span>
        </div>
    );
    if (isRemoving) return (
        <div className="todo-item">
            <span className="info">Удаление задачи {id} на сервере...</span>
        </div>
    );

    return (
        <div className="todo-item">
            <span>
                <input type="checkbox" checked={data.completed} onChange={handleToggle} />
                <span>{data.title}</span>
                <span>
                    <button onClick={() => dispatch(setView(id))}>View</button>
                    <button onClick={() => dispatch(setEdit(id))}>Edit</button>
                </span>
            </span>
            <span className="remove" onClick={handleRemove}>
                &times;
            </span>
        </div>
    );
}
