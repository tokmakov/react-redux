import './App.css';

import { TodoList } from './component/TodoList.js';
// import { TodoList } from './component/TodoList-2.js';
import { TodoForm } from './component/TodoForm.js';
// import { TodoForm } from './component/TodoForm-2.js';
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
                <TodoList />
                <Login />
            </div>
        </Provider>
    );
}

export default App;
