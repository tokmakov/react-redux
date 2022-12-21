import { useSelector } from 'react-redux';
import { useGetAllTodoQuery } from '../redux/todoApi';
import { TodoItem } from './TodoItem';

export function TodoList(props) {
    const page = useSelector((state) => state.user.page);
    const { data, isFetching, isSuccess } = useGetAllTodoQuery({ page: page });

    if (isFetching) return (
        <div className="todo-list">
            <span className="info">Получение списка задач с сервера...</span>
        </div>
    );
    if (!isSuccess) return (
        <div className="todo-list">
            <span className="error">Не удалось загрузить список</span>
        </div>
    );

    return (
        <div className="todo-list">
            {data.length > 0 ? (
                data.map((item) => <TodoItem key={item.id} {...item} />)
            ) : (
                <p>Список задач пустой</p>
            )}
        </div>
    );
}
