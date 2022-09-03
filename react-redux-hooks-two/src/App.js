import './App.css';

import { TodoList } from './component/TodoList.js';
import { TodoForm } from './component/TodoForm.js';
import { StatusBar } from './component/StatusBar.js';
import { Login } from './component/Login.js';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <h1>Список задач</h1>
                <TodoForm />
                <StatusBar />
                <TodoList completed={true} />
                <TodoList completed={false} />
                <Login />
            </div>
        </Provider>
    );
}

export default App;
