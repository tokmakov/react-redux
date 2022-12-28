import { useGetOneTodoQuery, useUpdateTodoMutation, useRemoveTodoMutation } from '../redux/todoApi';
import { useState } from 'react';

const initState = {
    data: null,
    isLoading: false,
    isSuccess: false,
    error: null,
};

export function TodoItem(props) {
    const { data: loadedData, isLoading, isSuccess } = useGetOneTodoQuery(props.id);

    const [updateTodo] = useUpdateTodoMutation();
    const [updateState, setUpdateState] = useState(initState);

    const [removeTodo] = useRemoveTodoMutation();
    const [removeState, setRemoveState] = useState(initState);

    // данные задачи могут быть как изначально загруженные с сервера, так и уже обновленные
    const currentData = updateState.data ?? loadedData;

    const handleUpdate = () => {
        setUpdateState({
            ...initState,
            isLoading: true,
        });
        updateTodo({
            id: props.id,
            title: currentData.title + ' (updated)',
            completed: !currentData.completed,
        })
            .unwrap()
            .then((data) => {
                setUpdateState({
                    ...updateState,
                    isLoading: false,
                    isSuccess: true,
                    data: data,
                });
            })
            .catch((error) => {
                setUpdateState({
                    ...updateState,
                    isLoading: false,
                    isSuccess: false,
                    error: error,
                });
            });
    };

    const handleRemove = () => {
        setRemoveState({
            ...initState,
            isLoading: true,
        });
        removeTodo(props.id)
            .unwrap()
            .then((data) => {
                setRemoveState({
                    ...removeState,
                    isLoading: false,
                    isSuccess: true,
                    data: data,
                });
            })
            .catch((error) => {
                setRemoveState({
                    ...removeState,
                    isLoading: false,
                    isSuccess: false,
                    error: error,
                });
            });
    };

    if (isLoading) return <p>Получение задачи {props.id} с сервера...</p>;
    if (!isSuccess) return <p className="error">Не удалось загрузить задачу {props.id}</p>;

    if (removeState.isLoading) return <p>Идет удаление задачи {props.id}...</p>;
    if (removeState.isSuccess) return <p>Задача {props.id} была удалена</p>;

    if (updateState.isLoading) return <p>Идет обновление задачи {props.id}...</p>;

    return (
        <div className="todo-item">
            <span>
                <input type="checkbox" checked={currentData.completed} onChange={handleUpdate} />
                &nbsp;
                <span>{currentData.title}</span>
            </span>
            <span className="remove" onClick={handleRemove}>
                &times;
            </span>
        </div>
    );
}
