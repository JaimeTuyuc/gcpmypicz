import React, { useState, useEffect } from 'react';
import { Button, Modal, Typography } from '@mui/material';
import { ModalStylesContainer } from '../Albums/styles/ModalStyles';
import { useSelector, useDispatch } from 'react-redux';
import { MainImage } from './styles/ModalDetailsImg';
import { Box } from '@mui/system';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteModalImg from './DeleteImageModal';
import { addFavoriteImage, deleteImageNoAlbum, deleteImgService } from '../../../../services/imageService';
import { imagesAction } from '../../../../features/imagesSlice';
import { Icon } from 'react-icons-kit';
import { heartOutline } from 'react-icons-kit/oct/heartOutline';
import { heart } from 'react-icons-kit/oct/heart';

const ImageDetailsComponent = ({ open, onClose, withDelete }) => {
    const dispatch = useDispatch();
    const { imageDetails, imageDeleted } = useSelector((state) => state.images);
    const [openChild, setOpenChild] = useState(false);

    const openChildModal = () => {
        setOpenChild(true);
    }

    const closeChildModal = () => {
        setOpenChild(false);
    }

    const parseTime = (tempDate) => {
        if (JSON.stringify(imageDetails.img) !== '{}') {
            const date = new Date(tempDate.createdAt);
            const timeFormated = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
            return timeFormated
        }
    }

    const confirmDeleteImg = (data) => {
        if (data.withAlbum) {
            dispatch(deleteImgService({ albumId: data.img.belongsToAlbum, imageId: data.img.imageId}));
        }

        if (!data.withAlbum) {
            dispatch(deleteImageNoAlbum(data.img));
        }
    }

    useEffect(() => {
        if (imageDeleted) {
            onClose();
            dispatch(imagesAction.dispatchDetailsImg({img:{}, withAlbum: false}));
            closeChildModal();
        };
        return () => {
            dispatch(imagesAction.dispatchRequestSuccessImg(null));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageDeleted]);

    const favoriteHandler = (value) => {
        const imageCopy = { ...imageDetails.img }
        if (value === 0) {
            imageCopy.isFavorite = 1
            dispatch(imagesAction.dispatchDetailsImg({ img: imageCopy, withAlbum: imageDetails.withAlbum }))
            dispatch(addFavoriteImage({ img: imageCopy, withAlbum: imageDetails.withAlbum }))
        }

        if (value === 1) {
            imageCopy.isFavorite = 0
            dispatch(imagesAction.dispatchDetailsImg({ img: imageCopy, withAlbum: imageDetails.withAlbum }))
            dispatch(addFavoriteImage({ img: imageCopy, withAlbum: imageDetails.withAlbum }))
        }
    }

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
            >
                <ModalStylesContainer>
                    <Typography
                        variant='h5'
                        fontWeight='bold'
                        textAlign='center'
                        gutterBottom
                    >Details</Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                        <MainImage src={imageDetails.img.imgUrl} alt='MyPicz' />
                    </Box>

                    <Box sx={{ marginY: '15px'}}>
                        <Typography
                            variant='body1'
                            gutterBottom
                        >{imageDetails.img.description}</Typography>
                        {
                            imageDetails.img && (
                                <Typography
                                    variant='body2'
                                >
                                    <span>Pubish at: </span>
                                    {parseTime(imageDetails.img)}
                                </Typography>
                            )
                        }
                    </Box>

                    {
                        withDelete && (
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    startIcon={<DeleteForeverIcon />}
                                    onClick={openChildModal}
                                >
                                    Delete
                                </Button>

                                <div style={{ color: '#72249c' }} onClick={() => favoriteHandler(imageDetails.img.isFavorite)}>
                                    <Icon icon={imageDetails.img.isFavorite === 1 ? heart : heartOutline} size={30} />
                                </div>
                            </Box>
                        )
                    }
                </ModalStylesContainer>
            </Modal>

            <DeleteModalImg open={openChild} onClose={closeChildModal} imgObj={imageDetails} confirmDeleteImg={confirmDeleteImg} />
        </>
    )
}

export default ImageDetailsComponent