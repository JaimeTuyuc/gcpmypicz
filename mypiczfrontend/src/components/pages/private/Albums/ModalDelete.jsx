import React from 'react';
import { Box, Button, FormControl, Grid, Modal, Typography } from '@mui/material';
import { ModalStylesContainer } from './styles/ModalStyles';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { AlbumFormContainer } from './styles/AlbumStyles';

const ModalDeleteAlbum = ({ open, onClose, deleteObj, albumDeleteHandler }) => {
    const deleteHandler = (e) => {
        e.preventDefault();
        albumDeleteHandler(deleteObj);
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
                            gutterBottom
                        >Delete Album?</Typography>

                        <Typography
                            variant='body1'
                            textAlign='center'
                            fontWeight='bold'
                            gutterBottom
                        >
                            Do you really want to delete <span style={{ fontWeight: 'bold', fontStyle: 'oblique', fontSize: '17px' }}>{deleteObj.albumName}</span> album?, All images in this album will be lost, once deleted, it cannot be restored
                        </Typography>
                        <AlbumFormContainer
                            onSubmit={deleteHandler}
                        >
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
                                                onClick={onClose}
                                            >No, Cancel</Button>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Button
                                                fullWidth
                                                variant='contained'
                                                color='secondary'
                                                endIcon={<DeleteOutlineOutlinedIcon />}
                                                //disabled={!albumName}
                                                type='submit'
                                            >Yes, Delete</Button>
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

export default ModalDeleteAlbum;