import { TodoItem } from './TodoItem.js';

export function TodoList(props) {
    const { todos, toggle, remove } = props;
    return (
        <div className="todo-list">
            {todos.length > 0 ? (
                todos.map((todo) => (
                    <TodoItem key={todo.id} {...todo} toggle={toggle} remove={remove} />
                ))
            ) : (
                <p>Список задач пустой</p>
            )}
        </div>
    );
}
