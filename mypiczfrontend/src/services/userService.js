import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../config/axiosConfig';
import { userActions } from '../features/userSlice';
import toast from 'react-hot-toast';

export const registerNewUser = createAsyncThunk(
    'register_user',
    async (data, thunkApi) => {
        try {
            const result = await axiosClient.post('/api/mypicz/register', data)
            if (result.status === 200) {
                thunkApi.dispatch(userActions.dispatchAccountCreated(true));
                toast.success(result.data.msg, {
                    duration: 3000,
                    position: "top-right",
                })
            }
        } catch (error) {
            console.log(error, 'Something went wrong when creating the user')
            toast.error('Something went wrong, try again later', {
                duration: 3000,
                position: "top-right",
            })
        }
    }
)

export const loginUserService = createAsyncThunk(
    'login_user',
    async (data, thunkApi) => {
        try {
            const result = await axiosClient.post('/api/mypicz/login', data);
            
            if (result.status === 200 && result.data.codeStatus === 2) {
                toast.error(result.data.msg, {
                    duration: 3000,
                    position: "top-right",
                })
            }

            if (result.status === 200 && result.data.codeStatus === 1) {
                toast.success(result.data.msg, {
                    duration: 3000,
                    position: "top-right",
                })
                console.log(result.data.user, 'datos')
                thunkApi.dispatch(userActions.dispatchLoggedUser({ token: result.data.token, user: result.data.user }))
                thunkApi.dispatch(userActions.dispatchLoggedSuccess(true));
                localStorage.setItem('$token', result.data.token);
            }
            
            console.log(result, 'datos')
        } catch (error) {
            console.log(error, 'Something went wrong when loging user')
            toast.error('Something went wrong, try again later', {
                duration: 3000,
                position: "top-right",
            })
        }
    }
)

export const refreshSessionToken = createAsyncThunk(
    'refresh_session',
    async (token, thunkApi) => {
        try {
            const result = await axiosClient.post(`/api/mypicz/refresh/${token}`);
            console.log(result.data, 'data');
            if (result.status === 200 && result.data.codeStatus === 1) {
                toast.success(result.data.msg, {
                    duration: 3000,
                    position: "top-right",
                })
                thunkApi.dispatch(userActions.dispatchLoggedUser({ token: token, user: result.data.user }))
            }
        } catch (error) {
            console.log(error, 'unable to refresh the data')
            toast.error(error.response.data.msg, {
                duration: 3000,
                position: "top-right",
            })
            localStorage.removeItem('$token');
        }
    }
)