import { Button, FormControl, Grid, Modal, Typography } from '@mui/material';
import React from 'react';
import { ModalStylesContainerDelete, OptionsContainerDelete } from '../Albums/styles/ModalStyles';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import { Box } from '@mui/system';

const DeleteModalImg = ({open, onClose, imgObj, confirmDeleteImg }) => {

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                hideBackdrop
            >
                <ModalStylesContainerDelete>
                    <OptionsContainerDelete>
                        <Typography
                            variant='h5'
                            fontWeight='bold'
                            textAlign='center'
                            gutterBottom
                        >Delete Image?</Typography>

                        <Typography
                            variant='body1'
                            fontWeight='bold'
                            textAlign='center'
                            gutterBottom
                        >Once deleted, it can not be restored</Typography>

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
                                            >Cancel</Button>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Button
                                                fullWidth
                                                variant='contained'
                                                color='secondary'
                                                endIcon={<CheckIcon />}
                                                onClick={() => confirmDeleteImg(imgObj)}
                                                type='button'
                                            >Yes</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                    </OptionsContainerDelete>
                </ModalStylesContainerDelete>
            </Modal>
        </>
    )
}

export default DeleteModalImg;