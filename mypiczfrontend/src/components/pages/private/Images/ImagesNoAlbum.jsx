import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import SingleImage from './SingleImage';
import { useDispatch } from 'react-redux';
import { imagesAction } from '../../../../features/imagesSlice';
import ImageDetails from './ImageDetails';

const ImagesNoAlbum = () => {
    const dispatch = useDispatch();
    const { allImagesNoAlbum } = useSelector((state) => state.images);
    const [modalOpen, setModalOpen] = useState(false);
    const closeModalHandler = () => {
        setModalOpen(false);
        dispatch(imagesAction.dispatchDetailsImg({img:{}, withAlbum: false}));
    }
    const handlerModal = (imgObj) => {
        setModalOpen(true);
        dispatch(imagesAction.dispatchDetailsImg({img:imgObj, withAlbum: false}));
    }
    return (
        <>
            <Box>
                <Box sx={{ flexGrow: 1, paddingY: '15px' }}>
                    <Grid container spacing={3}>
                        {
                            allImagesNoAlbum.map((image) => {
                                return (
                                    <Grid item key={image.imageId} xs={12} sm={6} md={2}>
                                        <SingleImage image={image} handlerModal={handlerModal} />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Box>

                <ImageDetails open={modalOpen} onClose={closeModalHandler} />
            </Box>
        </>
    )
}

export default ImagesNoAlbum;