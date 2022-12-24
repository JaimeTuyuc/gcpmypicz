import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../features/userSlice';
import { albumSlice } from '../features/albumsSlice';
import { imagesSlice } from '../features/imagesSlice';


export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        albums: albumSlice.reducer,
        images: imagesSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});