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
            console.log(result, 'data');
            console.log(result.data, '-*-*-*-*-*-*')
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