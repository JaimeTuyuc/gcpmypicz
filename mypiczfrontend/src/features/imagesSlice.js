import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allImagesNoAlbum: [],
    allImagesByAlbum: []
}

export const imagesSlice = createSlice({
    name: 'imagesSlice',
    initialState: initialState,
    reducers: {
        dispatchAllImagesByAlbum(state, action) {
            state.allImagesByAlbum = action.payload;
        }
    }
})

export const imagesAction = imagesSlice.actions;