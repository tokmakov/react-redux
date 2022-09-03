export function StatusBar(props) {
    const { total, completed, uncompleted } = props;
    return (
        <div className="status-bar">
            Всего задач {total}, не завершенных {uncompleted}, завершенных {completed}.
        </div>
    );
}
