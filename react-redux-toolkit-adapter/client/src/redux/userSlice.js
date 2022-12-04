import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { loadProcess, createProcess, updateProcess } from './postSlice.js';

const entityAdapter = createEntityAdapter();

const entitySlice = createSlice({
    name: 'user',
    initialState: entityAdapter.getInitialState(),
    reducers: {},
    extraReducers: {
        [loadProcess.fulfilled]: (state, action) => {
            entityAdapter.upsertMany(state, action.payload.users);
        },
        [createProcess.fulfilled]: (state, action) => {
            const data = Object.values(action.payload.users)[0];
            entityAdapter.upsertOne(state, data);
        },
        [updateProcess.fulfilled]: (state, action) => {
            const data = Object.values(action.payload.users)[0];
            entityAdapter.upsertOne(state, data);
        },
    },
});

export const selectors = entityAdapter.getSelectors((state) => state.user);

export default entitySlice.reducer;
