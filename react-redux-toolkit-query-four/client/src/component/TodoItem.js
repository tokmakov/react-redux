import { useGetOneTodoQuery, useUpdateTodoMutation, useRemoveTodoMutation } from '../redux/todoApi';
import { Loader } from './Loader';

export function TodoItem(props) {
    const { data, isLoading, isSuccess } = useGetOneTodoQuery(props.id);

    const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();
    const [removeTodo, { isLoading: isRemoving }] = useRemoveTodoMutation();

    const handleToggle = () => {
        updateTodo({
            id: props.id,
            title: data.title + ' (updated)',
            completed: !data.completed,
        });
    };

    if (isLoading) return <p>Получение задачи {props.id} с сервера...</p>;
    if (!isSuccess) return <p className="error">Не удалось загрузить задачу {props.id}</p>;

    return (
        <>
            <div className="todo-item">
                <span>
                    <input type="checkbox" checked={data.completed} onChange={handleToggle} />
                    &nbsp;
                    <span>{data.title}</span>
                    {isUpdating && <Loader />}
                    {isRemoving && <Loader />}
                </span>
                <span className="remove" onClick={() => removeTodo(props.id)}>
                    &times;
                </span>
            </div>
        </>
    );
}
