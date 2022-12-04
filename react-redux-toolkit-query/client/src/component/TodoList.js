import { todoApi } from '../redux/todoApi.js';
import { TodoItem } from './TodoItem.js';

const useGetAllTodoQueryState = todoApi.endpoints.getAllTodo.useQueryState;
const useGetAllTodoQuerySubscription = todoApi.endpoints.getAllTodo.useQuerySubscription;

export function TodoList(props) {
    const { data, isLoading, isFetching, isSuccess } = useGetAllTodoQueryState(null);
    // NEW атоматически обновлять список каждые 2 секунды, выполяняя запрос на сервер
    useGetAllTodoQuerySubscription(null, {
        pollingInterval: 2000,
    });

    if (isLoading) return <p>Получение списка задач с сервера...</p>;
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
            {isFetching && <p>Обновление списка задач...</p>}
        </>
    );
}
