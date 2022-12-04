import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const loadProcess = createAsyncThunk(
    'todo/loadProcess',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=6');
            if (!response.ok) {
                throw new Error('Ошибка при получении списка задач');
            }
            const items = await response.json();
            return items;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const createProcess = createAsyncThunk(
    'todo/createProcess',
    async function (data, { rejectWithValue, dispatch }) {
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
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const toggleProcess = createAsyncThunk(
    'todo/toggleProcess',
    async function (id, { rejectWithValue, dispatch, getState }) {
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
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const removeProcess = createAsyncThunk(
    'todo/removeProcess',
    async function (id, { rejectWithValue, dispatch }) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Ошибка при удалении задачи');
            }
            dispatch(removeClient(id));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

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
            state.items.push(action.payload);
        },
        toggleClient(state, action) {
            const item = state.items.find((item) => item.id === action.payload);
            item.completed = !item.completed;
        },
        removeClient(state, action) {
            const items = state.items.filter((item) => item.id !== action.payload);
            state.items = items;
        },
    },
    extraReducers: (builder) => {
        builder
            // загрузка списка задач с сервера
            .addCase(loadProcess.pending, (state, action) => {
                state.loading = true;
                state.loadError = null;
            })
            .addCase(loadProcess.fulfilled, (state, action) => {
                state.loading = false;
                state.loadError = null;
                state.items = action.payload;
            })
            .addCase(loadProcess.rejected, (state, action) => {
                state.loading = false;
                state.loadError = action.payload;
            })
            // создание новой задачи
            .addCase(createProcess.pending, (state, action) => {
                state.error = null;
                state.status = 'Создание новой задачи, ждите...';
            })
            .addCase(createProcess.fulfilled, (state, action) => {
                state.error = null;
                state.status = null;
            })
            .addCase(createProcess.rejected, (state, action) => {
                state.error = action.payload;
                state.status = null;
            })
            // изменение статуса задачи
            .addCase(toggleProcess.pending, (state, action) => {
                state.error = null;
                state.status = 'Изменение статуса задачи, ждите...';
            })
            .addCase(toggleProcess.fulfilled, (state, action) => {
                state.error = null;
                state.status = null;
            })
            .addCase(toggleProcess.rejected, (state, action) => {
                state.error = action.payload;
                state.status = null;
            })
            // удаление задачи
            .addCase(removeProcess.pending, (state, action) => {
                state.error = null;
                state.status = 'Удаление задачи, ждите...';
            })
            .addCase(removeProcess.fulfilled, (state, action) => {
                state.error = null;
                state.status = null;
            })
            .addCase(removeProcess.rejected, (state, action) => {
                state.error = action.payload;
                state.status = null;
            });
    },
});

const { createClient, toggleClient, removeClient } = todoSlice.actions; // генераторы действий

export {
    loadProcess,
    createProcess as create,
    toggleProcess as toggle,
    removeProcess as remove,
};

export default todoSlice.reducer;
