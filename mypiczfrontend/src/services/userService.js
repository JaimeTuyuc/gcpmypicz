import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../config/axiosConfig';
import { userActions } from '../features/userSlice';
import toast from 'react-hot-toast';
import { albumActions } from '../features/albumsSlice';
import { imagesAction } from '../features/imagesSlice';

const getTokenUser = () => {
    return localStorage.getItem('$token');
}

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
            if (result.status === 200 && result.data.codeStatus === 3) {
                toast.error(result.data.msg, {
                    duration: 3000,
                    position: "top-right",
                })
                localStorage.removeItem('$token')
                return
            }

            if (result.status === 200 && result.data.codeStatus === 2) {
                toast.error(result.data.msg, {
                    duration: 3000,
                    position: "top-right",
                })
                return
            }

            if (result.status === 200 && result.data.codeStatus === 1) {
                toast.success(result.data.msg, {
                    duration: 3000,
                    position: "top-right",
                })
                thunkApi.dispatch(userActions.dispatchLoggedUser({ token: result.data.token, user: result.data.user }))
                thunkApi.dispatch(userActions.dispatchLoggedSuccess(true));
                localStorage.setItem('$token', result.data.token);
                return
            }
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
            if (result.status === 200 && result.data.codeStatus === 1) {
                toast.success(result.data.msg, {
                    duration: 3000,
                    position: "top-right",
                })
                thunkApi.dispatch(userActions.dispatchLoggedUser({ token: token, user: result.data.user }))
                localStorage.setItem('$token', result.data.token)
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

export const updateUserProfile = createAsyncThunk(
    'update_user_profile',
    async (data, thunkApi) => {
        const token = getTokenUser();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        };
        try {
            const result = await axiosClient.put(`/api/mypicz/update`, data, config);
            if (result.status === 200) {
                toast.success(result.data.msg, {
                    duration: 3000,
                    position: "top-right",
                })
                thunkApi.dispatch(userActions.dispatchUpdateUserInfo(result.data.user));
                thunkApi.dispatch(userActions.dispatchProfileUpdatedSuccess(true));
            }
            if (result.status === 200 && data.field === 'avatar') {
                thunkApi.dispatch(userActions.dispatchImageUpdatedSuccess(true));
            }
        } catch (error) {
            console.log(error, 'Unable to update your profile info')
            toast.error(error.response.data.msg, {
                duration: 3000,
                position: "top-right",
            })
        }
    }
)

export const deleteAccountService = createAsyncThunk(
    'delete_user_account',
    async (_, thunkApi) => {
        const token = getTokenUser();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        };
        try {
            const resultDelete = await axiosClient.delete('/api/mypicz/profile/delete', config);
            if (resultDelete.status === 200 && resultDelete.data.deleteStatus === 1) {
                localStorage.removeItem('$token')
                thunkApi.dispatch(userActions.dispatchLogoutUser());
                thunkApi.dispatch(albumActions.dispatchLogoutAlbum());
                thunkApi.dispatch(imagesAction.dispatchLogoutImages());
            }
        } catch (error) {
            console.log(error, 'Unable to delete your account');
            toast.error(error.response.data.msg, {
                duration: 3000,
                position: "top-right",
            })
        }
    }
)