// еще один вариант реализации, вместо функции mapDispatchToProps используем объект
import { connect } from 'react-redux';
import { actions } from '../redux/actions.js';

function TodoItem(props) {
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

function mapStateToProps(state, ownProps) {
    // возвращаем объект типа { id: 3, title: 'Третья задача', completed: false }
    return state.todo.find((item) => item.id === ownProps.id);
}

const mapDispatchToProps = {
    toggle: (id) => actions.todo.toggle(id),
    remove: (id) => actions.todo.remove(id),
};

const TodoItemConnected = connect(mapStateToProps, mapDispatchToProps)(TodoItem);

export { TodoItemConnected as TodoItem };
