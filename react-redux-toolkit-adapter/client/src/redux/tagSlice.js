import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { loadProcess, createProcess, updateProcess } from './postSlice.js';

const entityAdapter = createEntityAdapter();

const entitySlice = createSlice({
    name: 'tag',
    initialState: entityAdapter.getInitialState(),
    reducers: {},
    extraReducers: {
        [loadProcess.fulfilled]: (state, action) => {
            entityAdapter.upsertMany(state, action.payload.tags);
        },
        [createProcess.fulfilled]: (state, action) => {
            entityAdapter.upsertMany(state, action.payload.tags);
        },
        [updateProcess.fulfilled]: (state, action) => {
            entityAdapter.upsertMany(state, action.payload.tags);
        },
    },
});

export const selectors = entityAdapter.getSelectors((state) => state.tag);

export default entitySlice.reducer;
