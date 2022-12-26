import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: {},
    token: '',
    userAuth: null,
    isLoggedIn: null,
    accountCreated: null,
    profileUpdated: null,
    imageProfileUpdated: null,
}

export const userSlice = createSlice({
    name: 'userSalice',
    initialState: initialState,
    reducers: {
        dispatchAccountCreated(state, action) {
            state.accountCreated = action.payload
        },
        dispatchLoggedUser(state, action) {
            state.isLoggedIn = true;
            state.userAuth = true;
            state.userInfo = action.payload.user;
            state.token = action.payload.token
        },
        dispatchLoggedSuccess(state, action) {
            state.isLoggedIn = action.payload
        },
        dispatchUpdateUserInfo(state, action) {
            state.userInfo = action.payload
        },
        dispatchImageUpdatedSuccess(state, action) {
            state.imageProfileUpdated = action.payload
        },
        dispatchProfileUpdatedSuccess(state, action) {
            state.profileUpdated = action.payload
            
        },
        dispatchLogoutUser(state, action) {
            state.userInfo = {};
            state.token = '';
            state.userAuth = null;
            state.isLoggedIn = null;
            state.accountCreated = null;
            state.profileUpdated = null;
            state.imageProfileUpdated = null;
        }
    }
})

export const userActions = userSlice.actions;