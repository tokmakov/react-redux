import { useGetOneTodoQuery, useUpdateTodoMutation, useRemoveTodoMutation } from '../redux/todoApi';

export function TodoItem(props) {
    console.log('Render TodoItem, id =', props.id)
    const { data, isFetching, isSuccess } = useGetOneTodoQuery(props.id);

    const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();
    const [removeTodo, { isLoading: isRemoving }] = useRemoveTodoMutation();

    const handleToggle = () => {
        updateTodo({
            id: props.id,
            title: data.title + ' (updated)',
            completed: !data.completed,
        });
    };

    if (isFetching) return <p className="info">Получение задачи {props.id} с сервера...</p>;
    if (!isSuccess) return <p className="error">Не удалось загрузить задачу {props.id}</p>;
    if (isUpdating) return <p className="info">Обновление задачи {props.id} на сервере...</p>;
    if (isRemoving) return <p className="info">Удаление задачи {props.id} на сервере</p>;

    return (
        <div className="todo-item">
            <span>
                <input type="checkbox" checked={data.completed} onChange={handleToggle} />
                &nbsp;
                <span>{data.title}</span>
            </span>
            <span className="remove" onClick={() => removeTodo(props.id)}>
                &times;
            </span>
        </div>
    );
}
