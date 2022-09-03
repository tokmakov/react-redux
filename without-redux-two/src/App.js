import './App.css';
import { TodoContextProvider } from './component/TodoContext.js';
import { TodoList } from './component/TodoList.js';
import { TodoForm } from './component/TodoForm.js';
import { StatusBar } from './component/StatusBar.js';

function App() {
    return (
        <TodoContextProvider>
            <div className="App">
                <h1>Список задач</h1>
                <TodoForm />
                <StatusBar />
                <TodoList />
            </div>
        </TodoContextProvider>
    );
}

export default App;
