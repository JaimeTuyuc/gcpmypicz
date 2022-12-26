import React, { useState} from 'react';
import { Box, Button, FormControl, Grid, Modal, TextField, Typography } from '@mui/material';
import { HexColorPicker } from 'react-colorful';
import { AlbumFormContainer } from './styles/AlbumStyles';
import { ModalStylesContainer } from './styles/ModalStyles';
import PaletteIcon from '@mui/icons-material/Palette';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect } from 'react';

const ModalEditAlbum = ({open, albumDataEdit, onClose, albumEditedHandler}) => {
    const [openColor, setOpenColor] = useState(false);
    const [color, setColor] = useState('#000');
    const [albumData, setAlbumData] = useState({
        albumName: '',
    });
    const [albumE, setAlbumE] = useState(false);
    const { albumName } = albumData;
    const cancelAlbum = () => {
        setAlbumData({ albumName: '' });
        setAlbumE(false);
        setOpenColor(false);
        setColor('#000')
        onClose();
    };
    useEffect(() => {
        setColor(albumDataEdit.albumColor)
        setAlbumData({ ...albumData, albumName: albumDataEdit.albumName })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [albumDataEdit]);

    const albumToEdit = { ...albumDataEdit };
    albumToEdit.albumName = albumName;
    albumToEdit.albumColor = color;

    const submitHandler = (e) => {
        e.preventDefault();
        albumEditedHandler(albumToEdit);
    }
    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
            >
                <ModalStylesContainer>
                    <Box display='flex' flexDirection='column' alignItems='center' marginY='20px'>
                        <Typography
                            variant='h5'
                            textAlign='center'
                            fontWeight='bold'
                        >Edit Album</Typography>
                        <AlbumFormContainer
                            onSubmit={submitHandler}
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
                                style={{ marginTop: '20px' }}
                            >
                                <Button
                                    fullWidth
                                    variant='contained'
                                    endIcon={<PaletteIcon />}
                                    color='secondary'
                                    onClick={() => setOpenColor(!openColor)}
                                >{ openColor ? 'Hidde' : 'Album Color' }</Button>
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
        </>
    )
}

export default ModalEditAlbum;