export function TodoItem(props) {
    const { id, title, completed, toggle, remove } = props;
    return (
        <div className="todo-item">
            <span>
                <input type="checkbox" checked={completed} onChange={() => toggle(id)} />
                &nbsp;
                <span>{title}</span>
            </span>
            <span className="remove" onClick={() => remove(id)}>
                &times;
            </span>
        </div>
    );
}
