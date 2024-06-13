import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    adminInfo: null,
    users: [],
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdminCredentials: (state, { payload }) => {
            state.adminInfo = payload;
        },
        logout: (state) => {
            state.adminInfo = null;
            state.users = [];
        },
        getUsersSuccess: (state, { payload }) => {
            state.users = payload;
        }
    }
})

export const { setAdminCredentials, logout, getUsersSuccess } = adminSlice.actions;

export default adminSlice.reducer;