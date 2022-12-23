import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allAlbums: [],
    allbumSaved: null,
    completed: null,
    completeEdit: null
}

export const albumSlice = createSlice({
    name: 'albumSlice',
    initialState: initialState,
    reducers: {
        dispatchSavedAlbum(state, action) {
            state.allbumSaved = action.payload
        },
        albumSavedSuccess(state, action) {
            state.allAlbums = [action.payload, ...state.allAlbums]
        },
        allUserAllbums(state, action) {
            state.allAlbums = action.payload
        },
        updateAlbumSuccess(state, action) {
            state.allAlbums = state.allAlbums.map((album) => album.albumId === action.payload.albumId ? action.payload : album);
        },
        dispatchCompletedRequest(state, action) {
            state.completed = action.payload
        },
        dispatchDeleteSuccess(state, action) {
            state.allAlbums = state.allAlbums.filter((album) => album.albumId !== action.payload.albumId);
        },
        dispatchCompleteEdit(state, action) {
            state.completeEdit = action.payload;
        }
    }
})

export const albumActions = albumSlice.actions;