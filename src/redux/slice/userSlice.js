import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    access_token: '',
    id: '',
    isAdmin: false,
    refreshToken: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const {
                username = '',
                name = '',
                email = '',
                access_token = '',
                address = '',
                phone = '',
                avatar = '',
                _id = '',
                isAdmin,
                refreshToken = '',
            } = action.payload;
            state.username = username ? username : state.username;
            state.name = name ? name : state.name;
            state.email = email ? email : state.email;
            state.address = address ? address : state.address;
            state.phone = phone ? phone : state.phone;
            state.avatar = avatar ? avatar : state.avatar;
            state.id = _id ? _id : state.id;
            state.access_token = access_token ? access_token : state.access_token;
            state.isAdmin = isAdmin ? isAdmin : state.isAdmin;
            state.refreshToken = refreshToken ? refreshToken : state.refreshToken;
        },
        resetUser: (state) => {
            state.username = '';
            state.name = '';
            state.email = '';
            state.phone = '';
            state.address = '';
            state.avatar = '';
            state.id = '';
            state.access_token = '';
            state.isAdmin = false;
            state.refreshToken = '';
        },
    },
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
