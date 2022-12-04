import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todoApi = createApi({
    reducerPath: 'todo',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
    endpoints: (builder) => ({
        getAllTodo: builder.query({
            query: () => '/todo',
        }),
        getOneTodo: builder.query({
            query: (id) => `/todo/${id}`,
        }),
        createTodo: builder.mutation({
            query: (data) => ({
                url: '/todo',
                method: 'POST',
                body: data,
            }),
        }),
        updateTodo: builder.mutation({
            query: (data) => {
                const { id, ...rest } = data;
                return {
                    url: `/todo/${id}`,
                    method: 'PATCH',
                    body: rest,
                };
            },
        }),
        removeTodo: builder.mutation({
            query: (id) => ({
                url: `/todo/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});
