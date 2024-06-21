import { apiSlice } from './apiSlice';

const ADMIN_URL = '/api/admin';


export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/auth`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${ADMIN_URL}/logout`,
                method: 'POST',
            }),
        }),
        fetchUsers: builder.query({
            query: () => ({
                url: `${ADMIN_URL}/userlist`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('adminToken')}`
                }
            }),
            transformResponse: (response) => response.users,
            providesTags: ['User'],
        }),
        createUser: builder.mutation({
            query: (newUser) => ({
                url: `${ADMIN_URL}/userlist`,
                method: 'POST',
                body: newUser,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
                }
            }),
            invalidatesTags: ['User'],
        }),
        updateUserAdmin: builder.mutation({
            query: ({ id, data }) => ({
                url: `${ADMIN_URL}/userlist/${id}`,
                method: 'PATCH',
                body: data,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
                }
            }),
            invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${ADMIN_URL}/userlist/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
                }
            }),
            invalidatesTags: ['User'],
        }),
    })
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useFetchUsersQuery,
    useUpdateUserAdminMutation,
    useCreateUserMutation,
    useDeleteUserMutation,
} = adminApiSlice;
