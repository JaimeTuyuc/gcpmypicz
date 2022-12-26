import React, { useEffect, useState }  from 'react';
import { Button, Grid } from '@mui/material';
import { Box } from '@mui/system';
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import AlbumForm from '../Albums/NewAlbumForm';
import { useDispatch, useSelector } from 'react-redux';
import { addNewUserAlbum, getAllAlbumsUser } from '../../../../services/albumService';
import { getAllImagesNoAlbum, addNewImageNoAlbum } from '../../../../services/imageService.js';
import { albumActions } from '../../../../features/albumsSlice';
import Albums from '../Albums/Albums';
import ImagesNoAlbum from '../Images/ImagesNoAlbum';
import ImageModalUpload from '../Images/ImageModalUpload';
import { imagesAction } from '../../../../features/imagesSlice';

const HomePage = () => {
    const dispatch = useDispatch();
    const { imageSaved } = useSelector((state) => state.images);
    const [open, setOpen] = useState(false);
    const [ openModal, setOpenModal ] = useState(false);
    const closeModal = () => {
        setOpenModal(!openModal);
    }

    const openModalHandler = () => {
        setOpenModal(true)
        dispatch(imagesAction.dispatchRequestSuccess(null));
    }

    const saveImageNoAlbum = (data) => {
        console.log(data, 'data?????')
        dispatch(addNewImageNoAlbum({imgUrl: data.imgUrl, description: data.description}))
    }

    useEffect(() => {
        if (imageSaved) {
            setOpenModal(false);
        }
    }, [imageSaved])

    useEffect(() => {
        dispatch(getAllAlbumsUser());
        dispatch(getAllImagesNoAlbum());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOpenModal = () => {
        setOpen(!open);
        dispatch(albumActions.dispatchSavedAlbum(null));
    }

    const albumToAdd = (data) => {
        dispatch(addNewUserAlbum(data));
    }
    return (
        <>
            <Box>
                <Box sx={{ flexGrow: 1 }} >
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3} lg={2}>
                            <Button
                                fullWidth
                                variant='contained'
                                endIcon={<SnippetFolderIcon />}
                                color='secondary'
                                sx={{ marginRight: '15px' }}
                                onClick={handleOpenModal}
                            >New Album</Button>

                            <AlbumForm open={open} onClose={handleOpenModal} albumToAdd={albumToAdd} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={2}>
                            <Button
                                fullWidth
                                variant='outlined'
                                endIcon={<WallpaperIcon />}
                                color='secondary'
                                onClick={openModalHandler}
                            >Single Picture</Button>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ marginTop: '20px'}}>
                    <Albums />

                    <ImagesNoAlbum />
                </Box>
            </Box>
            <ImageModalUpload open={openModal} onClose={closeModal} saveImageAlbum={saveImageNoAlbum} />
        </>
    )
}

export default HomePage;