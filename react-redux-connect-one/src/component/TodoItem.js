import { connect } from 'react-redux';
import { actions } from '../redux/actions.js';

function TodoItem(props) {
    const { title, completed, toggle, remove } = props;
    return (
        <div className="todo-item">
            <span>
                <input type="checkbox" checked={completed} onChange={toggle} />
                &nbsp;
                <span>{title}</span>
            </span>
            <span className="remove" onClick={remove}>
                &times;
            </span>
        </div>
    );
}

function mapStateToProps(state, ownProps) {
    // возвращаем объект типа { id: 3, title: 'Третья задача', completed: false }
    return state.todo.find(item => item.id === ownProps.id);
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        toggle: () => dispatch(actions.todo.toggle(ownProps.id)),
        remove: () => dispatch(actions.todo.remove(ownProps.id)),
    };
}

const TodoItemConnected = connect(mapStateToProps, mapDispatchToProps)(TodoItem);

export { TodoItemConnected as TodoItem };
