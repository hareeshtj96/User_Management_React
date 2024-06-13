import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import { apiSlice } from './Slices/apiSlice';
import adminReducer from './Slices/adminSlice';
import { adminApiSlice } from './Slices/adminApiSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [adminApiSlice.reducerPath]: adminApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware, adminApiSlice.middleware),
    devTools: true,
});

export default store;