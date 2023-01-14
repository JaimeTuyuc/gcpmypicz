import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient, cloudClient } from '../config/axiosConfig';
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

export const getAllImagesNoAlbum = createAsyncThunk(
    'all_images_no_album',
    async (data, thunkApi) => {
        const token = getTokenUser();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        };
        try {
            const result = await axiosClient.get(`/api/mypicz/images/all`, config);
            if (result.status === 200) {
                thunkApi.dispatch(imagesAction.dispatchAllImagesNoAlbum(result.data.images));
            }
        } catch (error) {
            console.log(error, 'unable to get all images')
            toast.error('Something went wrong, try again later', {
                duration: 3000,
                position: "top-right",
            })
        }
    }
)

export const addNewImageNoAlbum = createAsyncThunk(
    'new_image_no_album',
    async (data, thunkApi) => {
        const token = getTokenUser();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        };
        try {
            const result = await axiosClient.post(`/api/mypicz/images/single`, data, config);
            if (result.status === 200) {
                toast.success(result.data.msg, {
                    duration: 3000,
                    position: "top-right",
                })
                thunkApi.dispatch(imagesAction.dispatchRequestSuccess(true));
                thunkApi.dispatch(imagesAction.dispatchSaveImageNoAlbum(result.data.image))
            }
        } catch (error) {
            console.log(error, 'unable to save your sinlge image')
            toast.error('Something went wrong, try again later', {
                duration: 3000,
                position: "top-right",
            })
        }
    }
)

export const deleteImageNoAlbum = createAsyncThunk(
    'delete_image_no_album',
    async (data, thunkApi) => {
        const token = getTokenUser();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        };
        try {
            const result = await axiosClient.delete(`/api/mypicz/images/no-album/${data.imageId}`, config);
            if (result.status === 200) {
                toast.success(result.data.msg, {
                    duration: 3000,
                    position: "top-right",
                })
                thunkApi.dispatch(imagesAction.dispatchRequestSuccessImg(true));
                thunkApi.dispatch(imagesAction.dispatchDeleteNoAlbumSuccess(result.data.image));
            }
        } catch (error) {
            console.log(error, 'Unable to delete your no album image')
            toast.error('Something went wrong, try again later', {
                duration: 3000,
                position: "top-right",
            })
        }
    }
)

export const getFriendsInfo = createAsyncThunk(
    'get_users_info',
    async (userName, thunkApi) => {
        try {
            //const result = await axiosClient.get(`/api/mypicz/find-friends/${userName}`);
            const resultData = await cloudClient.get(`/${userName}`)
            if (resultData.status === 200) {
                thunkApi.dispatch(imagesAction.dispatchFriendsInfoSuccess({ userInfo: resultData.data.user, publicImgs: resultData.data.publicImgs }))
            }
        } catch (error) {
            console.log(error, 'unable to get your friends info')
            toast.error('Something went wrong, try again later', {
                duration: 3000,
                position: "top-right",
            })
        }
    }
)

export const addFavoriteImage = createAsyncThunk(
    'add_favorite_image',
    async (data, thunkApi) => {
        const token = getTokenUser();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        };
        const bodyRequest = { isFav: data.img.isFavorite };
        try {
            if (data.withAlbum) {
                const resultAlbum = await axiosClient.post(`/api/mypicz/images/favorite/${data.img.imageId}`, bodyRequest, config);
                if (resultAlbum.status === 200) {
                    toast.success(resultAlbum.data.msg, {
                        duration: 3000,
                        position: "top-right",
                    })
                    thunkApi.dispatch(imagesAction.dispatchDetailsImg({ img: resultAlbum.data.image, withAlbum: data.withAlbum }));
                    thunkApi.dispatch(imagesAction.dispatchUpdateImageWithAlbum(resultAlbum.data.image));
                }

            }
            if (!data.withAlbum) {
                const resultAlbum = await axiosClient.post(`/api/mypicz/images/with-no-album/${data.img.imageId}`, bodyRequest, config);
                if (resultAlbum.status === 200) {
                    toast.success(resultAlbum.data.msg, {
                        duration: 3000,
                        position: "top-right",
                    })
                    thunkApi.dispatch(imagesAction.dispatchDetailsImg({ img: resultAlbum.data.image, withAlbum: data.withAlbum }))
                    thunkApi.dispatch(imagesAction.dispatchUpdateImageNoAlbum(resultAlbum.data.image));
                }
            }
            
        } catch (error) {
            console.log(error, 'Unable to add favorite image')
            toast.error('Something went wrong, try again later', {
                duration: 3000,
                position: "top-right",
            })
        }
    }
)

export const uploadImageToStorage = createAsyncThunk(
    'upload_image_storage',
    async (data, thunkApi) => {
        const token = getTokenUser();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        };

        try {
            const result = await axiosClient.post(`/api/mypicz/images/storage`, { file: data.getAll('file')[0] }, config);
            if (result.status === 200) {
                thunkApi.dispatch(imagesAction.dispatchSaveImageStorage(result.data.imgUrl));
            }
        } catch (error) {
            console.log(error, 'Unable to save to storage')
        }
    }
)