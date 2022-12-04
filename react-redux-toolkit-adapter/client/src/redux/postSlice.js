import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { postSchema, postListSchema } from './schema.js';
import { normalize } from 'normalizr';

// https://codesandbox.io/s/rtk-entities-basic-example-with-normalizr-j30td

const API_URL = 'http://localhost:5000/api/blog';

const loadProcess = createAsyncThunk('post/loadProcess', async function (_, { rejectWithValue }) {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Ошибка при получении списка постов');
        }
        const serverData = await response.json();
        const normalized = normalize(serverData, postListSchema);
        return normalized.entities;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const createProcess = createAsyncThunk(
    'post/createProcess',
    async function (data, { rejectWithValue }) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Ошибка при добавлении нового поста');
            }
            const serverData = await response.json();
            const normalized = normalize(serverData, postSchema);
            return normalized.entities;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const updateProcess = createAsyncThunk(
    'post/updateProcess',
    async function (data, { rejectWithValue }) {
        try {
            const response = await fetch(`${API_URL}/${data.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Ошибка при обновлении поста блога');
            }
            const serverData = await response.json();
            const normalized = normalize(serverData, postSchema);
            return normalized.entities;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const removeProcess = createAsyncThunk(
    'post/removeProcess',
    async function (id, { rejectWithValue, dispatch }) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Ошибка при удалении поста блога');
            }
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const entityAdapter = createEntityAdapter();

const initialState = entityAdapter.getInitialState({
    loading: false,
    loadError: null,
    status: null,
    error: null,
});

const entitySlice = createSlice({
    name: 'post',
    initialState: initialState,
    reducers: {
        /*
        createClient: entityAdapter.addOne,
        updateClient: entityAdapter.updateOne,
        removeClient: entityAdapter.removeOne,
        */
    },
    extraReducers: (builder) => {
        builder
            // загрузка списка постов с сервера
            .addCase(loadProcess.pending, (state, action) => {
                state.loading = true;
                state.loadError = null;
            })
            .addCase(loadProcess.fulfilled, (state, action) => {
                entityAdapter.upsertMany(state, action.payload.posts);
                state.loading = false;
                state.loadError = null;
            })
            .addCase(loadProcess.rejected, (state, action) => {
                state.loading = false;
                state.loadError = action.payload;
            })
            // создание нового поста на сервере
            .addCase(createProcess.pending, (state, action) => {
                state.error = null;
                state.status = 'Создание поста блога, ждите...';
            })
            .addCase(createProcess.fulfilled, (state, action) => {
                // data = {id: 12, title: 'Пост блога', author: 34, tags: [56,78]}
                const data = Object.values(action.payload.posts)[0];
                entityAdapter.upsertOne(state, data);
                state.error = null;
                state.status = null;
            })
            .addCase(createProcess.rejected, (state, action) => {
                state.error = action.payload;
                state.status = null;
            })
            // обновление поста блога на сервере
            .addCase(updateProcess.pending, (state, action) => {
                state.error = null;
                state.status = 'Обновление поста блога, ждите...';
            })
            .addCase(updateProcess.fulfilled, (state, action) => {
                // data = {id: 12, title: 'Пост блога', author: 34, tags: [56,78]}
                const data = Object.values(action.payload.posts)[0];
                entityAdapter.upsertOne(state, data);
                state.error = null;
                state.status = null;
            })
            .addCase(updateProcess.rejected, (state, action) => {
                state.error = action.payload;
                state.status = null;
            })
            // удаление поста блога на сервере
            .addCase(removeProcess.pending, (state, action) => {
                state.error = null;
                state.status = 'Удаление поста блога, ждите...';
            })
            .addCase(removeProcess.fulfilled, (state, action) => {
                entityAdapter.removeOne(state, action.payload);
                state.error = null;
                state.status = null;
            })
            .addCase(removeProcess.rejected, (state, action) => {
                state.error = action.payload;
                state.status = null;
            });
    },
});

export { loadProcess, createProcess, updateProcess, removeProcess };

export const selectors = entityAdapter.getSelectors((state) => state.post);

export default entitySlice.reducer;
