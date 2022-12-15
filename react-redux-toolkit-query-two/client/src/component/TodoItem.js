import { useGetOneTodoQuery, useUpdateTodoMutation, useRemoveTodoMutation } from '../redux/todoApi';

export function TodoItem(props) {
    const { data: loadedData, isLoading, isSuccess } = useGetOneTodoQuery(props.id);

    const [updateTodo, updateResult] = useUpdateTodoMutation();
    const { data: updatedData, isLoading: isUpdating, isSuccess: isUpdated } = updateResult;

    const [removeTodo, removeResult] = useRemoveTodoMutation();
    const { data: removedData, isLoading: isRemoving, isSuccess: isRemoved } = removeResult;

    // данные задачи могут быть как изначально загруженные с сервера, так и уже обновленные
    const currentData = updatedData ?? loadedData;

    const handleToggle = () => {
        updateTodo({
            id: props.id,
            title: currentData.title + ' (updated)',
            completed: !currentData.completed,
        });
    };

    if (isLoading) return <p>Получение задачи {props.id} с сервера...</p>;
    if (!isSuccess) return <p className="error">Не удалось загрузить задачу {props.id}</p>;

    if (isRemoving) return <p>Идет удаление задачи {props.id}...</p>;
    if (isRemoved) return <p>Задача {props.id} была удалена</p>;

    if (isUpdating) return <p>Идет обновление задачи {props.id}...</p>;

    return (
        <div className="todo-item">
            <span>
                <input type="checkbox" checked={currentData.completed} onChange={handleToggle} />
                &nbsp;
                <span>{currentData.title}</span>
            </span>
            <span className="remove" onClick={() => removeTodo(props.id)}>
                &times;
            </span>
        </div>
    );
}
