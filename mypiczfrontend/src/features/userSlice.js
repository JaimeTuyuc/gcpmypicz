import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: {},
    token: '',
    userAuth: null,
    isLoggedIn: null,
    accountCreated: null
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
        }
    }
})

export const userActions = userSlice.actions;