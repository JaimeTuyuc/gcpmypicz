import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { MainAlbumContainerImg, SingleImg } from './styles/SingleImageStyles';
import ImageDetails from './ImageDetails';
import { useDispatch } from 'react-redux';
import { imagesAction } from '../../../../features/imagesSlice';

const SingleImage = ({ image, handlerModal }) => {

    return (
        <>
            <Box sx={{ borderRadius: '8px', position: 'relative', boxShadow: '8px 10px 5px #787878' }}>
                <MainAlbumContainerImg>
                    <Box >
                        <SingleImg src={image.imgUrl} alt='MyPic' />
                    </Box>

                    <Box sx={{ marginY: '15px'}}>
                        <Button
                            variant='contained'
                            color='secondary'
                            onClick={() => handlerModal(image)}
                        >
                            Details
                        </Button>
                    </Box>
                </MainAlbumContainerImg>
            </Box>
        </>
    )
}

export default SingleImage;

/*

    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);

    const handlerModal = (imgObj) => {
        setModalOpen(true);
        dispatch(imagesAction.dispatchDetailsImg(imgObj));
    }

    const closeModalHandler = () => {
        setModalOpen(false);
        dispatch(imagesAction.dispatchDetailsImg({}));
    }
*/