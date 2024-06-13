import { apiSlice } from './apiSlice';

const USERS_URL = '/api/users';


export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),
        fetchUsers: builder.query({
            query: () => `${USERS_URL}/userlist`,
            transformResponse: (response) => response.users,
            providesTags: ['User'],
        }),
        createUser: builder.mutation({
            query: (newUser) => ({
                url: `${USERS_URL}/userlist`,
                method: 'POST',
                body: newUser,
            }),
            invalidatesTags: ['User'],
        }),
        updateUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `${USERS_URL}/userlist/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/userlist/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
    })
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useFetchUsersQuery,
    useUpdateUserMutation,
    useCreateUserMutation,
    useDeleteUserMutation,
} = adminApiSlice;
