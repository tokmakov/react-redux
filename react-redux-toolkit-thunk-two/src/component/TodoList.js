import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { loadProcess } from '../redux/todoSlice.js';
import { selectors } from '../redux/selectors.js';
import { TodoItem } from './TodoItem.js';

export function TodoList(props) {
    const ids = useSelector(selectors.todo.ids, shallowEqual);
    const loading = useSelector((state) => state.todo.loading);
    const loadError = useSelector((state) => state.todo.loadError);
    const status = useSelector((state) => state.todo.status);
    const error = useSelector((state) => state.todo.error);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadProcess());
    }, []);

    if (loading) return <p>Получение списка задач с сервера...</p>;
    if (loadError) return <p className="error">{loadError}</p>;

    return (
        <>
            {status && <p className="status">{status}</p>}
            {error && <p className="error">{error}</p>}
            <div className="todo-list">
                {ids.length > 0 ? (
                    ids.map((id) => <TodoItem key={id} id={id} />)
                ) : (
                    <p>Список задач пустой</p>
                )}
            </div>
        </>
    );
}
