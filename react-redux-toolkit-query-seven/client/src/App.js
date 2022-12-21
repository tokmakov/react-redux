import './App.css';

import { Provider } from 'react-redux';
import { store } from './redux/store';
import { TodoForm } from './component/TodoForm';
import { TodoList } from './component/TodoList';
import { Pager } from './component/Pager';
import { TodoView } from './component/TodoView';

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <h1>Список задач</h1>
                <TodoForm />
                <TodoList />
                <Pager />
                <TodoView />
            </div>
        </Provider>
    );
}

export default App;
