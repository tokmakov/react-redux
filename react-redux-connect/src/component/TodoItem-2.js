// еще один вариант реализации, без использования mapDispatchToProps
import { connect } from 'react-redux';
import { actions } from '../redux/actions.js';

function TodoItem(props) {
    const { id, title, completed, dispatch } = props;
    return (
        <div className="todo-item">
            <span>
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => dispatch(actions.todo.toggle(id))}
                />
                &nbsp;
                <span>{title}</span>
            </span>
            <span className="remove" onClick={() => dispatch(actions.todo.remove(id))}>
                &times;
            </span>
        </div>
    );
}

function mapStateToProps(state, ownProps) {
    // возвращаем объект типа { id: 3, title: 'Третья задача', completed: false }
    return state.todo.find(item => item.id === ownProps.id);
}

const TodoItemConnected = connect(mapStateToProps)(TodoItem);

export { TodoItemConnected as TodoItem };
