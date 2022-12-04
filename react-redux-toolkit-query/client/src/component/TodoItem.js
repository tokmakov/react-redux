import { todoApi } from '../redux/todoApi';

const useUpdateTodoMutation = todoApi.endpoints.updateTodo.useMutation;
const useRemoveTodoMutation = todoApi.endpoints.removeTodo.useMutation;

export function TodoItem(props) {
    const { id, title, completed } = props;
    const [updateTodo] = useUpdateTodoMutation();
    const [removeTodo] = useRemoveTodoMutation();

    const handleToggle = () => {
        updateTodo({
            id: id,
            completed: !completed,
        });
    };

    return (
        <div className="todo-item">
            <span>
                <input type="checkbox" checked={completed} onChange={handleToggle} />
                &nbsp;
                <span>{title}</span>
            </span>
            <span className="remove" onClick={() => removeTodo(id)}>
                &times;
            </span>
        </div>
    );
}
