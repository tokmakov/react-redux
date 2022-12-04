import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { fetchProcess } from '../redux/todoSlice.js';
import { selectors } from '../redux/selectors.js';
import { TodoItem } from './TodoItem.js';

export function TodoList(props) {
    const ids = useSelector(selectors.todo.ids, shallowEqual);
    const loading = useSelector((state) => state.todo.loading);
    const error = useSelector((state) => state.todo.error);

    const dispatch = useDispatch();

    useEffect(() => { // получить список задач с сервера
        dispatch(fetchProcess());
    }, []);

    if (loading) return <p>Обмен данными с сервером, ждите...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="todo-list">
            {ids.length > 0 ? (
                ids.map((id) => <TodoItem key={id} id={id} />)
            ) : (
                <p>Список задач пустой</p>
            )}
        </div>
    );
}
