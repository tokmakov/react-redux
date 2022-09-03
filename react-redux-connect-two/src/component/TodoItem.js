import { connect } from 'react-redux';
import { createSelector } from 'reselect';
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

/*
function sleep(ms) {
    const nowDate = Date.now();
    let curDate;
    do {
        curDate = Date.now();
    } while (curDate - nowDate < ms);
}

const createItemSelector = () => createSelector(
    (state) => state.todo,
    (state, id) => id,
    (items, id) => {
        console.log('Поиск элемента списка задач, id =', id);
        sleep(1000);
        return items.find((item) => item.id === id)
    }
);
*/

const createItemSelector = () => createSelector(
    (state) => state.todo,
    (state, id) => id,
    (items, id) => items.find((item) => item.id === id)
);

const createMapStateToProps = () => {
    const itemSelector = createItemSelector();
    // возвращаемая ф-ция будет использоваться как фактическая ф-ция mapStateToProps
    return (state, ownProps) => itemSelector(state, ownProps.id);
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        toggle: () => dispatch(actions.todo.toggle(ownProps.id)),
        remove: () => dispatch(actions.todo.remove(ownProps.id)),
    };
}

const TodoItemConnected = connect(createMapStateToProps, mapDispatchToProps)(TodoItem);

export { TodoItemConnected as TodoItem };
