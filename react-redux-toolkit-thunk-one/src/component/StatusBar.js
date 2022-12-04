import { useSelector } from 'react-redux';
import { selectors } from '../redux/selectors.js';

export function StatusBar(props) {
    const total = useSelector(selectors.todo.allLength);
    const completed = useSelector(selectors.todo.completedLength);
    const uncompleted = useSelector(selectors.todo.uncompletedLength);

    return (
        <div className="status-bar">
            Всего задач {total}, не завершенных {uncompleted}, завершенных {completed}.
        </div>
    );
}
