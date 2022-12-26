import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, Grid, Modal, TextField, Typography } from '@mui/material';
import { ModalStylesContainer } from '../Albums/styles/ModalStyles';
import { useDropzone } from 'react-dropzone';
import { ButtonClose, DragableZoneContainer, ImageContainerForm, ImageContent, ModalContentContainer } from './styles/ModalImageStyles';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { storage } from '../../../../firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import Icon from 'react-icons-kit';
import { closeCircled } from 'react-icons-kit/ionicons/closeCircled';
import { useDispatch, useSelector } from 'react-redux';
import { imagesAction } from '../../../../features/imagesSlice';

const ImageUploadModal = ({ open, onClose, saveImageAlbum, withDesc = true, title = 'New Image' }) => {
    const dispatch = useDispatch();
    const { imageSaved } = useSelector((state) => state.images);
    const { imageProfileUpdated } = useSelector((state) => state.user);
    const [imageUpload, setImageUpload] = useState('')
    const [tempImg, setTempImg] = useState(null);
    const [imgDesc, setImgDesc] = useState('');
    const { acceptedFiles, getInputProps, getRootProps, isFocused, isDragAccept, isDragReject } = useDropzone({
        accept: {
            'image/png': ['.png', '.jpg', '.jpeg'],
        },
        maxFiles: 1
    });
    const uploadToFirebase = async (imgObj) => {
        const imageRef = `images/${imgObj.name + uuidv4()}`;
        try {
            const dataRef = ref(storage, imageRef);
            await uploadBytes(dataRef, imgObj);
            const img = await getDownloadURL(ref(storage, imageRef));
            setImageUpload(img);
        } catch (error) {
            console.log(error, 'unable to upload the image')
        }
    }
    const resetFlowPic = () => {
        setImageUpload('');
        setTempImg(null);
        setImgDesc('')
    }
    const closeHanlder = () => {
        onClose();
        setImageUpload('');
        setTempImg(null);
        setImgDesc('')
    }
    useEffect(() => {
        if (tempImg) {
            uploadToFirebase(tempImg)
        }
    }, [tempImg])

    useEffect(() => {
        if (acceptedFiles.length > 0) {
            setTempImg(acceptedFiles[0]);
        }
    }, [acceptedFiles]);

    useEffect(() => {
        if (imageSaved) {
            closeHanlder()
        }
        return () => {
            dispatch(imagesAction.dispatchRequestSuccess(null));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageSaved])

    useEffect(() => {
        if (imageProfileUpdated) {
            setImageUpload('');
            setTempImg(null);
            setImgDesc('')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[imageProfileUpdated])

    const onSubmitImage = (e) => {
        e.preventDefault();
        saveImageAlbum({ imgUrl: imageUpload, description: imgDesc });
    }
    return (
        <>
            <Modal
                open={open}
                onClose={closeHanlder}
            >
                <ModalStylesContainer>
                    <ModalContentContainer
                        onSubmit={onSubmitImage}
                    >
                        <Typography
                            variant='h5'
                            gutterBottom
                            textAlign='center'
                            fontWeight='bold'
                        >{title}</Typography>

                        {
                            !imageUpload && (
                                <DragableZoneContainer {...getRootProps({isFocused, isDragAccept, isDragReject})}>
                                    <input {...getInputProps()} />
                                    <Typography>Dragn and drop an image, or click to select one</Typography>
                                </DragableZoneContainer>
                            )
                        }
                        {
                            imageUpload && (
                                <Box sx={{ marginY: '10px', paddingY: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <ImageContainerForm>
                                        <ImageContent src={imageUpload} alt='MyPic' />
                                        
                                        <ButtonClose
                                            onClick={resetFlowPic}
                                        >
                                            <Icon icon={closeCircled} size={25} />
                                        </ButtonClose>
                                    </ImageContainerForm>
                                    {
                                        withDesc && (
                                            <FormControl
                                                fullWidth
                                            >
                                                <TextField
                                                    label='Image description (Optional)'
                                                    id='imageDes'
                                                    rows={2}
                                                    multiline
                                                    style={{ marginTop: '15px' }}
                                                    value={imgDesc}
                                                    onChange={(e) => setImgDesc(e.target.value)}
                                                />
                                            </FormControl>
                                        )
                                    }
                                </Box>
                            )
                        }
                        <Box>
                            <FormControl
                                fullWidth
                                style={{ marginTop: '20px' }}
                            >
                                <Box sx={{ flexGrow: 1 }} >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <Button
                                                fullWidth
                                                variant='outlined'
                                                color='secondary'
                                                endIcon={<CancelIcon />}
                                                onClick={closeHanlder}
                                            >Cancel</Button>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Button
                                                fullWidth
                                                variant='contained'
                                                color='secondary'
                                                endIcon={<SaveIcon />}
                                                disabled={!imageUpload}
                                                type='submit'
                                            >Save</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        </Box>
                    </ModalContentContainer>
                </ModalStylesContainer>
            </Modal>
        </>
    )
}

export default ImageUploadModal;