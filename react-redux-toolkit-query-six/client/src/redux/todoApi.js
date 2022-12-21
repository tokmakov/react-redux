import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todoApi = createApi({
    reducerPath: 'todo',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
    tagTypes: ['todo'],
    endpoints: (builder) => ({
        getAllTodo: builder.query({
            query: () => '/todo',
            providesTags: (res = [], err, arg) => [
                { type: 'todo', id: 'list' },
                /* ...res.map((item) => ({ type: 'todo', id: item.id })), */
            ],
        }),
        getOneTodo: builder.query({
            query: (id) => `/todo/${id}`,
            providesTags: (res, err, arg) => [{ type: 'todo', id: arg }],
        }),
        createTodo: builder.mutation({
            query: (data) => ({
                url: '/todo',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [{ type: 'todo', id: 'list' }],
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
            invalidatesTags: (res, err, arg) => [
                { type: 'todo', id: arg.id },
            ],
        }),
        removeTodo: builder.mutation({
            query: (id) => ({
                url: `/todo/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetAllTodoQuery,
    useGetOneTodoQuery,
    useCreateTodoMutation,
    useUpdateTodoMutation,
    useRemoveTodoMutation,
} = todoApi;
