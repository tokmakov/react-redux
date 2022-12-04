import './App.css';

import { PostList } from './component/PostList.js';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <h1>Все посты блога</h1>
                <PostList />
            </div>
        </Provider>
    );
}

export default App;
