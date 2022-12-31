import { Box, Button, FormControl, Grid, Modal, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { AlbumFormContainer } from './styles/AlbumStyles';
import { ModalStylesContainer } from './styles/ModalStyles';
import PaletteIcon from '@mui/icons-material/Palette';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { HexColorPicker } from 'react-colorful';
import { useSelector } from 'react-redux';
import ImageModalUpload from '../Images/ImageModalUpload';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const AlbumForm = ({ open, onClose, albumToAdd }) => {
    const { allbumSaved } = useSelector((state) => state.albums);
    const [openColor, setOpenColor] = useState(false);
    const [color, setColor] = useState('#bc39b5');
    const [albumData, setAlbumData] = useState({
        albumName: '',
    });
    const [albumE, setAlbumE] = useState(false);
    const [openModalImg, setOpenModalImg] = useState(false);
    const [imageAlbum, setAlbumImage] = useState('')
    const { albumName } = albumData;
    
    const cancelAlbum = () => {
        setAlbumData({ albumName: '' });
        setAlbumE(false);
        setOpenColor(false);
        setColor('bc39b5')
        onClose();
    };

    useEffect(() => {
        if (allbumSaved) {
            cancelAlbum();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allbumSaved])

    const openModalImgAlbum = () => {
        setOpenModalImg(true);
    }

    const closeModalImgAlbum = () => {
        setOpenModalImg(false);
    }

    const handleImgAlbum = (data) => {
        setAlbumImage(data.imgUrl);
        closeModalImgAlbum()
    }
    const addNewAlbum = (e) => {
        e.preventDefault();
        albumToAdd({albumName, albumColor: color, prevImgAlbum: imageAlbum })
    }

    
    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ModalStylesContainer>
                    <Box display='flex' flexDirection='column' alignItems='center' marginY='20px'>
                        <Typography
                            variant='h5'
                            textAlign='center'
                            fontWeight='bold'
                        >New Album</Typography>
                        <AlbumFormContainer
                            onSubmit={addNewAlbum}
                        >
                            <FormControl
                                fullWidth
                                style={{ marginTop: '20px' }}
                            >
                                <TextField
                                    required
                                    id='albumName'
                                    label='Album Name'
                                    type='text'
                                    color='success'
                                    value={albumName}
                                    onChange={ (e) => setAlbumData({...albumData, albumName: e.target.value })}
                                    onBlur={() => setAlbumE(true)}
                                    error={albumE && albumName === ''}
                                    helperText={albumE && albumName === '' && 'Required field *'}
                                />
                            </FormControl>

                            <FormControl
                                style={{ marginTop: '20px', display: 'flex', flexDirection: 'row', gap: '15px' }}
                            >
                                <Button
                                    fullWidth
                                    variant='contained'
                                    endIcon={<PaletteIcon />}
                                    color='secondary'
                                    onClick={() => setOpenColor(!openColor)}
                                >{openColor ? 'Hidde' : 'Album Color'}</Button>
                                
                                <Button
                                    fullWidth
                                    variant='contained'
                                    endIcon={<CameraAltIcon />}
                                    color='secondary'
                                    onClick={openModalImgAlbum}
                                >Image Album</Button>
                            </FormControl>
                            {
                                openColor && (
                                    <FormControl
                                        fullWidth
                                        style={{ marginTop: '15px' }}
                                        className='resposive example'
                                    >
                                        <HexColorPicker color={color} onChange={setColor} />
                                    </FormControl>
                                )
                            }
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
                                                onClick={cancelAlbum}
                                            >Cancel</Button>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Button
                                                fullWidth
                                                variant='contained'
                                                color='secondary'
                                                endIcon={<SaveIcon />}
                                                disabled={!albumName}
                                                type='submit'
                                            >Save</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        </AlbumFormContainer>
                    </Box>
                </ModalStylesContainer>
            </Modal>

            <ImageModalUpload open={openModalImg} onClose={closeModalImgAlbum} saveImageAlbum={handleImgAlbum} withDesc={false} title='Album Image' />
        </>
    )
}

export default AlbumForm;