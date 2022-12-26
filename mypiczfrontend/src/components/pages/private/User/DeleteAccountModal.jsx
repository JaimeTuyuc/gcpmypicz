import React, { useState } from 'react';
import { Button, FormControl, Grid, Modal, Typography, Checkbox } from '@mui/material';
import { ModalStylesContainer } from '../Albums/styles/ModalStyles';
import { Box } from '@mui/system';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';

const ModalDeleteAccount = ({open, onClose, confirmDelteAccount}) => {

    const [terms, setTerms] = useState(false);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
            >
                <ModalStylesContainer>
                    <Typography
                        variant='h5'
                        textAlign='center'
                        fontWeight='bold'
                        gutterBottom
                    >Delete account?</Typography>

                    <Typography
                        textAlign='center'
                        variant='h6'
                        fontStyle='italic'
                    >
                        Once you delete your account, you won't be able to restore all your albums and images, do you want to continue?
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox {...label} onChange={(e) => setTerms(e.target.checked)} />
                        <Typography>I have read and terms and conditions.</Typography>
                    </Box>
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
                                                onClick={onClose}
                                            >Cancel</Button>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Button
                                                fullWidth
                                                variant='contained'
                                                color='error'
                                                endIcon={<CheckIcon />}
                                                onClick={confirmDelteAccount}
                                                disabled={!terms}
                                            >Yes, Delete</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        </Box>
                </ModalStylesContainer>
            </Modal>
        </>
    )
}

export default ModalDeleteAccount;