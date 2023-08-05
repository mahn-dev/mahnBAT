import { configureStore } from '@reduxjs/toolkit';
import userReducer from '~/redux/slice/userSlice';
import productReducer from '~/redux/slice/productSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
    },
});
