import { useEffect, useState } from 'react';
import { useGetOneTodoQuery, useCreateTodoMutation, useUpdateTodoMutation } from '../redux/todoApi';
import { useSelector, useDispatch } from 'react-redux';
import { setEdit, setUpdating } from '../redux/userSlice';

export function TodoForm() {
    // идентификатор редактируемой задачи или null
    const id = useSelector((state) => state.user.edit);
    const dispatch = useDispatch();

    const [titleContent, setTitleContent] = useState({ title: '', content: '' });
    // данные задачи загружаем только при редактировании
    const {
        data: loadedData = null,
        isSuccess,
        isFetching,
    } = useGetOneTodoQuery(id, { skip: id ? false : true });

    const [createTodo, { isLoading: isCreating }] = useCreateTodoMutation();
    const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();

    useEffect(() => {
        if (id && loadedData) {
            setTitleContent({ title: loadedData.title, content: loadedData.content });
        } else {
            setTitleContent({ title: '', content: '' });
        }
    }, [id, loadedData]);

    useEffect(() => {
        if (isCreating === false) {
            setTitleContent({ title: '', content: '' });
        }
    }, [isCreating]);

    useEffect(() => {
        if (isUpdating === false) {
            dispatch(setEdit(null));
        }
    }, [isUpdating]);

    const handleSave = () => {
        if (titleContent.title.trim().length > 0 && titleContent.content.trim().length > 0) {
            const todo = {
                title: titleContent.title.trim(),
                content: titleContent.content.trim(),
                completed: id ? loadedData.completed : false,
            };
            if (id) {
                updateTodo({ id, ...todo });
            } else {
                createTodo(todo);
            }
        }
    };

    const resetForm = () => {
        if (id) {
            dispatch(setEdit(null));
        } else {
            setTitleContent({ title: '', content: '' });
        }
    };

    if (id && isFetching) return <p className="info">Получение задачи {id} с сервера...</p>;
    if (id && !isSuccess) return <p className="error">Не удалось получить задачу {id}</p>;
    if (isCreating) return <p className="info">Создание новой задачи на сервере...</p>;
    if (isUpdating) return <p className="info">Обновление задачи {id} на сервере...</p>;

    return (
        <div className="todo-form">
            <input
                type="text"
                value={titleContent.title}
                onChange={(e) => setTitleContent({ ...titleContent, title: e.target.value })}
                placeholder="Новая задача"
            />
            <input
                type="text"
                value={titleContent.content}
                onChange={(e) => setTitleContent({ ...titleContent, content: e.target.value })}
                placeholder="Описание задачи"
            />
            <button onClick={handleSave}>Сохранить</button>
            &nbsp;
            <button onClick={resetForm}>Отменить</button>
        </div>
    );
}
