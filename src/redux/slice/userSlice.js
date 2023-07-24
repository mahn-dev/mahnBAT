import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    email: '',
    access_token: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { username, email, access_token } = action.payload;
            state.username = username || email;
            state.email = email;
            state.access_token = access_token;
        },
        resetUser: (state) => {
            state.username = '';
            state.email = '';
            state.access_token = '';
        },
    },
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
