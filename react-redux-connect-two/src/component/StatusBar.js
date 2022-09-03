import { connect } from 'react-redux';
import { createSelector } from 'reselect';

function StatusBar(props) {
    const { total, completed, uncompleted } = props;
    return (
        <div className="status-bar">
            Всего задач {total}, не завершенных {uncompleted}, завершенных {completed}.
        </div>
    );
}

const all = (state) => state.todo;
const total = (state) => all(state).length;

const completed = createSelector(
    all,
    (items) => items.filter((item) => item.completed).length
);
const uncompleted = createSelector(
    all,
    (items) =>  items.filter((item) => !item.completed).length
);

/*
function sleep(ms) {
    const nowDate = Date.now();
    let curDate;
    do {
        curDate = Date.now();
    } while (curDate - nowDate < ms);
}

const all = (state) => state.todo;
const total = (state) => all(state).length;

const completed = createSelector(
    all,
    (items) => {
        console.log('Тяжелые вычисления, функция completed');
        sleep(2000);
        return items.filter((item) => item.completed).length;
    }
);
const uncompleted = createSelector(
    all,
    (items) => {
        console.log('Тяжелые вычисления, функция uncompleted');
        sleep(2000);
        return items.filter((item) => !item.completed).length;
    }
);
*/

function mapStateToProps(state) {
    return {
        total: total(state),
        completed: completed(state),
        uncompleted: uncompleted(state),
    };
}

const StatusBarConnected = connect(mapStateToProps)(StatusBar);

export { StatusBarConnected as StatusBar };
