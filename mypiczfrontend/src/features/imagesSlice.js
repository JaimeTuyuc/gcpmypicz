import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allImagesNoAlbum: [],
    allImagesByAlbum: [],
    imageToUpload: {},
    imageSaved: null,
    imageDeleted: null,
    imageDetails: { img: {}, withAlbum: false },
    friendsProfileInfo: { user: {}, publicImgs: []}
}

export const imagesSlice = createSlice({
    name: 'imagesSlice',
    initialState: initialState,
    reducers: {
        dispatchAllImagesByAlbum(state, action) {
            state.allImagesByAlbum = action.payload;
        },
        dispatchImageToupload(state, action) {
            state.imageToUpload = action.payload
        },
        dispatchRequestSuccess(state, action) {
            state.imageSaved = action.payload;
        },
        dispatchImageSavedSuccess(state, action) {
            state.allImagesByAlbum = [action.payload, ...state.allImagesByAlbum];
        },
        dispatchDetailsImg(state, action) {
            state.imageDetails = action.payload;
        },
        dispatchRequestSuccessImg(state, action) {
            state.imageDeleted = action.payload
        },
        dispatchImgDeletedSuccess(state, action) {
            state.allImagesByAlbum = state.allImagesByAlbum.filter((img) => img.imageId !== action.payload.imageId);
        },
        dispatchAllImagesNoAlbum(state, action) {
            state.allImagesNoAlbum = action.payload
        },
        dispatchSaveImageNoAlbum(state, action) {
            state.allImagesNoAlbum = [...state.allImagesNoAlbum, action.payload]
        },
        dispatchDeleteNoAlbumSuccess(state, action) {
            state.allImagesNoAlbum = state.allImagesNoAlbum.filter((img) => img.imageId !== action.payload.imageId);
        },
        dispatchFriendsInfoSuccess(state, action) {
            state.friendsProfileInfo.user = action.payload.userInfo;
            state.friendsProfileInfo.publicImgs = action.payload.publicImgs;
        },
        dispatchUpdateImageNoAlbum(state, action) {
            state.allImagesNoAlbum = state.allImagesNoAlbum.map((image) => image.imageId === action.payload.imageId ? action.payload : image);
        },
        dispatchUpdateImageWithAlbum(state, action) {
            state.allImagesByAlbum = state.allImagesByAlbum.map((image) => image.imageId === action.payload.imageId ? action.payload : image);
        },
        dispatchLogoutImages(state, action) {
            state.allImagesNoAlbum = [];
            state.allImagesByAlbum = [];
            state.imageToUpload = {};
            state.imageSaved = null;
            state.imageDeleted = null;
            state.imageDetails = { img: {}, withAlbum:false};
        }
    }
})

export const imagesAction = imagesSlice.actions;