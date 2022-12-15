import { useGetOneTodoQuery } from '../redux/todoApi';
import { useSelector, useDispatch } from 'react-redux';
import { setView } from '../redux/userSlice';

export function TodoView() {
    // идентификатор просматриваемой задачи или null
    const id = useSelector((state) => state.user.view);
    const dispatch = useDispatch();
    // задачу получаем, только если id не равен null
    const { data, isFetching, isSuccess } = useGetOneTodoQuery(id, { skip: id ? false : true });

    if (id === null) return null;
    if (isFetching) return <p className="info">Получение задачи {id} с сервера...</p>;
    if (!isSuccess) return <p className="error">Не удалось получить задачу {id}</p>;

    return (
        <div className="todo-view">
            <h3>{data.title}</h3>
            <p>Статус: {!data.completed && 'не'} завершена</p>
            <p>Описание: {data.content}</p>
            <button onClick={() => dispatch(setView(null))}>Отменить просмотр</button>
        </div>
    );
}
