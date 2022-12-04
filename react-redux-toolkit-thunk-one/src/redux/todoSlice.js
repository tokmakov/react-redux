import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    loading: false,
    loadError: null,
    status: null,
    error: null,
};

const todoSlice = createSlice({
    name: 'todo',
    initialState: initialState,
    reducers: {
        createClient(state, action) {
            state.items.push(action.payload); // мутация state
        },
        toggleClient(state, action) {
            const item = state.items.find((item) => item.id === action.payload);
            item.completed = !item.completed; // мутация state
        },
        removeClient(state, action) {
            const items = state.items.filter((item) => item.id !== action.payload);
            state.items = items; // мутация state
        },

        loadStarted(state, action) {
            state.loading = true;
            state.loadError = null;
        },
        loadSuccess(state, action) {
            state.loading = false;
            state.loadError = null;
            state.items = action.payload;
        },
        loadFailure(state, action) {
            state.loading = false;
            state.loadError = action.payload;
        },

        exchangeStarted(state, action) {
            state.error = null;
            state.status = 'Обмен данными с сервером, ждите...';
        },
        exchangeSuccess(state, action) {
            state.error = null;
            state.status = null;
        },
        exchangeFailure(state, action) {
            state.error = action.payload;
            state.status = null;
        },
    },
});

const {
    createClient,
    toggleClient,
    removeClient,
    loadStarted,
    loadSuccess,
    loadFailure,
    exchangeStarted,
    exchangeSuccess,
    exchangeFailure
} = todoSlice.actions; // генераторы действий

export const loadProcess = () => {
    return async (dispatch, getState) => {
        dispatch(loadStarted());
        setTimeout(async () => { // для увеличения задержки, чтобы увидеть loader
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=8');
                if (!response.ok) {
                    throw new Error('Ошибка при получении списка задач');
                }
                const items = await response.json();
                dispatch(loadSuccess(items));
            } catch (error) {
                dispatch(loadFailure(error.message));
            }
        }, 1000);
    };
};

const createProcess = (data) => {
    return async (dispatch, getState) => {
        dispatch(exchangeStarted());
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Ошибка при добавлении новой задачи');
            }
            const newTodo = await response.json();
            dispatch(createClient(newTodo));
            dispatch(exchangeSuccess());
        } catch (error) {
            dispatch(exchangeFailure(error.message));
        }
    };
};

const toggleProcess = (id) => {
    return async (dispatch, getState) => {
        dispatch(exchangeStarted());
        const todo = getState().todo.items.find((todo) => todo.id === id);
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    completed: !todo.completed,
                }),
            });
            if (!response.ok) {
                throw new Error('Ошибка при изменении статуса задачи');
            }
            dispatch(toggleClient(id));
            dispatch(exchangeSuccess());
        } catch (error) {
            dispatch(exchangeFailure(error.message));
        }
    };
};

const removeProcess = (id) => {
    return async (dispatch, getState) => {
        dispatch(exchangeStarted());
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Ошибка при удалении задачи');
            }
            dispatch(removeClient(id));
            dispatch(exchangeSuccess());
        } catch (error) {
            dispatch(exchangeFailure(error.message));
        }
    };
};

export { createProcess as create, toggleProcess as toggle, removeProcess as remove };

export default todoSlice.reducer;
