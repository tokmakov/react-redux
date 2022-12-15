import { useGetAllTodoQuery } from '../redux/todoApi';
import { TodoItem } from './TodoItem';

export function TodoList(props) {
    const { data, isLoading, isSuccess } = useGetAllTodoQuery(null);

    if (isLoading) return <p className="info">Получение списка задач с сервера...</p>;
    if (!isSuccess) return <p className="error">Не удалось загрузить список</p>;

    return (
        <>
            <div className="todo-list">
                {data.length > 0 ? (
                    data.map((item) => <TodoItem key={item.id} {...item} />)
                ) : (
                    <p>Список задач пустой</p>
                )}
            </div>
        </>
    );
}
