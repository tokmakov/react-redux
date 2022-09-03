import { connect } from 'react-redux';
import { TodoItem } from './TodoItem.js';
// import { TodoItem } from './TodoItem-2.js';

function TodoList(props) {
    const { items } = props;
    return (
        <div className="todo-list">
            {items.length > 0 ? (
                items.map(item => <TodoItem key={item.id} id={item.id} />)
            ) : (
                <p>Список задач пустой</p>
            )}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        items: state.todo,
    };
}

const TodoListConnected = connect(mapStateToProps)(TodoList);

export { TodoListConnected as TodoList };
