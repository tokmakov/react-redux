import { useSelector } from 'react-redux';

export function StatusBar(props) {
    const items = useSelector((state) => state.todo);

    const total = items.length;
    const completed = items.filter((item) => item.completed).length;
    const uncompleted = items.filter((item) => !item.completed).length;

    return (
        <div className="status-bar">
            Всего задач {total}, не завершенных {uncompleted}, завершенных {completed}.
        </div>
    );
}
