import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../config/axiosConfig';
import toast from 'react-hot-toast';
import { imagesAction } from '../features/imagesSlice';

const getTokenUser = () => {
    return localStorage.getItem('$token');
}

export const getAllImagesByAlbum = createAsyncThunk(
    'get_all_images_album',
    async (id, thunkApi) => {
        const token = getTokenUser();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        };
        try {
            const result = await axiosClient.get(`/api/mypicz/images/${id}`, config);
            thunkApi.dispatch(imagesAction.dispatchAllImagesByAlbum(result.data.images));
        } catch (error) {
            console.log(error, 'unable to get all images by album')
            toast.error('Something went wrong, try again later', {
                duration: 3000,
                position: "top-right",
            })
        }
    }
)

export const saveImageAlbumService = createAsyncThunk(
    'save_image_album',
    async (data, thunkApi) => {
        const token = getTokenUser();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        };
        try {
            const result = await axiosClient.post(`/api/mypicz/images`, data, config);
            if (result.status === 200) {
                toast.success(result.data.msg, {
                    duration: 3000,
                    position: "top-right",
                })
                thunkApi.dispatch(imagesAction.dispatchRequestSuccess(true));
                thunkApi.dispatch(imagesAction.dispatchImageSavedSuccess(result.data.image));
            }
        } catch (error) {
            console.log(error, 'Unable to save your image')
            toast.error('Something went wrong, try again later', {
                duration: 3000,
                position: "top-right",
            })
        }
    }
)

export const deleteImgService = createAsyncThunk(
    'delete_img',
    async (data, thunkApi) => {
        const token = getTokenUser();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        };
        try {
            const result = await axiosClient.delete(`/api/mypicz/images/${data.albumId}/${data.imageId}`, config);
            if(result.status === 200){
                toast.success(result.data.msg, {
                    duration: 3000,
                    position: "top-right",
                })
                thunkApi.dispatch(imagesAction.dispatchRequestSuccessImg(true));
                thunkApi.dispatch(imagesAction.dispatchImgDeletedSuccess(result.data.image));
            }
        } catch (error) {
            console.log(error, 'unable to delete the IMG')
            toast.error('Something went wrong, try again later', {
                duration: 3000,
                position: "top-right",
            })
        }
    } 
)