import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Icon } from 'react-icons-kit';
import { arrowLeftC } from 'react-icons-kit/ionicons/arrowLeftC';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllImagesByAlbum, saveImageAlbumService } from '../../../../services/imageService';
import { Button, Grid, Typography } from '@mui/material';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import ImageModalUpload from '../Images/ImageModalUpload';
import SingleImage from '../Images/SingleImage';
import ImageDetailsComponent from '../Images/ImageDetails';
import { imagesAction } from '../../../../features/imagesSlice';

const AlbumImages = () => {
    const { allImagesByAlbum } = useSelector((state) => state.images);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        dispatch(getAllImagesByAlbum(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    
    const [ openModal, setOpenModal ] = useState(false);
    const closeModal = () => {
        setOpenModal(!openModal);
    }

    const openModalHandler = () => {
        setOpenModal(!openModal)
    }

    const saveImageAlbum = (data) => {
        const payload = { ...data, belongsToAlbum: id };
        dispatch(saveImageAlbumService(payload))
    }

    // Detalles de imagen
    const [modalOpen, setModalOpen] = useState(false);

    const handlerModal = (imgObj) => {
        setModalOpen(true);
        dispatch(imagesAction.dispatchDetailsImg({img:imgObj, withAlbum: true}));
    }

    const closeModalHandler = () => {
        setModalOpen(false);
        dispatch(imagesAction.dispatchDetailsImg({img:{}, withAlbum: true}));
    }

    const resetFlowHandler = () => {
        navigate(-1);
        dispatch(imagesAction.dispatchAllImagesByAlbum([]));
    }

    return (
        <>
            <Box>
                <div
                    style={{ flexDirection: 'row', display: 'flex'}}
                >
                    <div
                        className='hoverElement'
                        onClick={resetFlowHandler}
                    >
                        <Icon icon={arrowLeftC} size={40} />
                    </div>

                    <Box sx={{ marginLeft: '50px', display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
                        <Button
                            variant='outlined'
                            color='secondary'
                            startIcon={<CameraAltOutlinedIcon />}
                            onClick={openModalHandler}
                        >Upload Image</Button>
                    </Box>
                </div>

                <Box>
                    {
                        allImagesByAlbum.length <= 0 &&
                            <Typography variant='h5'
                                textAlign='center'
                                fontWeight='bold'
                            >No images yet</Typography>
                    }

                    <Box sx={{ flexGrow: 1, paddingY: '15px'}}>
                        <Grid container spacing={3}>
                            {
                                allImagesByAlbum.map((image) => {
                                    return (
                                        <Grid item key={image.imageId} xs={12} sm={6} md={2}>
                                            <SingleImage image={image} handlerModal={handlerModal} />
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Box>
                </Box>

                <ImageModalUpload open={openModal} onClose={closeModal} saveImageAlbum={saveImageAlbum} withPublic={false} />
                <ImageDetailsComponent open={modalOpen} onClose={closeModalHandler} withDelete={true} />
            </Box>
        </>
    )
}

export default AlbumImages;
