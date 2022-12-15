import { useGetOneTodoQuery, useUpdateTodoMutation, useRemoveTodoMutation } from '../redux/todoApi';

export function TodoItem(props) {
    const { data, isLoading, isSuccess, isFetching } = useGetOneTodoQuery(props.id, {
        pollingInterval: 5000,
    });

    const [updateTodo] = useUpdateTodoMutation();
    const [removeTodo] = useRemoveTodoMutation();

    const handleToggle = () => {
        updateTodo({
            id: data.id,
            title: data.title + ' (updated)',
            completed: !data.completed,
        });
    };

    if (isLoading) return <p>Получение задачи {props.id} с сервера...</p>;
    if (!isSuccess) return <p className="error">Не удалось загрузить задачу {props.id}</p>;
    if (isFetching) return <p>Обновление задачи {props.id}...</p>;

    return (
        <>
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
        </>
    );
}
