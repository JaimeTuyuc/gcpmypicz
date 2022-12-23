import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../config/axiosConfig';
import toast from 'react-hot-toast';
import { albumActions } from '../features/albumsSlice';

const getTokenUser = () => {
    return localStorage.getItem('$token');
}

export const addNewUserAlbum = createAsyncThunk(
    'add_new_album',
    async (data, thunkApi) => {
        const token = getTokenUser();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        };
        try {
            const result = await axiosClient.post(`/api/mypicz/albums`, data, config);
            console.log(result, 'datos guardados');
            if (result.status === 200) {
                toast.success(result.data.msg, {
                    duration: 3000,
                    position: "top-right",
                })
                thunkApi.dispatch(albumActions.dispatchSavedAlbum(true));
                thunkApi.dispatch(albumActions.albumSavedSuccess(result.data.album));
            }
        } catch (error) {
            console.log(error, 'unable to save your album')
            toast.error('Something went wrong, try again later', {
                duration: 3000,
                position: "top-right",
            })
        }
    }
)

export const getAllAlbumsUser = createAsyncThunk(
    'get_all_albums',
    async (_, thunkApi) => {
        const token = getTokenUser();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        };
        try {
            const result = await axiosClient.get(`/api/mypicz/albums`, config);
            thunkApi.dispatch(albumActions.allUserAllbums(result.data.albums));
        } catch (error) {
            console.log(error, 'unable to get your albums')
            toast.error('Something went wrong, try again later', {
                duration: 3000,
                position: "top-right",
            })
            thunkApi.dispatch(albumActions.allUserAllbums([]))
        }
    }
)

export const editAlbumService = createAsyncThunk(
    'edit_album',
    async (data, thunkApi) => {
        const token = getTokenUser();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        };
        try {
            const result = await axiosClient.put(`/api/mypicz/albums/${data.albumId}`, data, config);
            if (result.status === 200) {
                toast.success(result.data.msg, {
                    duration: 3000,
                    position: "top-right",
                });
                thunkApi.dispatch(albumActions.dispatchCompleteEdit(true));
                thunkApi.dispatch(albumActions.updateAlbumSuccess(result.data.album));
            }
        } catch (error) {
            console.log(error, 'Unable to update the info')
            toast.error('Something went wrong, try again later', {
                duration: 3000,
                position: "top-right",
            })
        }
    }
)

export const deleteAlbumService = createAsyncThunk(
    'delete_album',
    async (data, thunkApi) => {
        const token = getTokenUser();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        };
        try {
            const result = await axiosClient.delete(`/api/mypicz/albums/${data.albumId}`, config);
            if (result.status === 200 && result.data.statusCode === 1) {
                toast.success(result.data.msg, {
                    duration: 3000,
                    position: "top-right",
                });
                thunkApi.dispatch(albumActions.dispatchCompletedRequest(true));
                thunkApi.dispatch(albumActions.dispatchDeleteSuccess(data));
            }
        } catch (error) {
            console.log(error, 'unable to delete the album')
            toast.error('Something went wrong, try again later', {
                duration: 3000,
                position: "top-right",
            })
        }
    }
)
