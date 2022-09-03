import { connect } from 'react-redux';

function StatusBar(props) {
    const { total, completed, uncompleted } = props;
    return (
        <div className="status-bar">
            Всего задач {total}, не завершенных {uncompleted}, завершенных {completed}.
        </div>
    );
}

function mapStateToProps(state) {
    return {
        total: state.todo.length,
        completed: state.todo.filter((item) => item.completed).length,
        uncompleted: state.todo.filter((item) => !item.completed).length,
    };
}

const StatusBarConnected = connect(mapStateToProps)(StatusBar);

export { StatusBarConnected as StatusBar };
