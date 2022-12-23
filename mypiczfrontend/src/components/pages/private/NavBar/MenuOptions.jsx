import { Box, Link } from '@mui/material';
import React from 'react';
import { CloseOverlay, OverlayContainer, SideBarContent } from './styles/NavBarStyles';
import { androidClose } from 'react-icons-kit/ionicons/androidClose';
import { Icon } from 'react-icons-kit';
import { useNavigate } from 'react-router-dom';

const MenuOptions = ({closeModal, openSideBar}) => {
    const navigate = useNavigate();

    return (
        <>
            <OverlayContainer>
                <CloseOverlay onClick={closeModal} />
                <SideBarContent out={openSideBar} id='sideBar'>
                    <Box color='magenta'>
                        <Icon icon={androidClose} size={38} onClick={closeModal} />
                    </Box>

                    <Box sx={{ marginTop: '20px', flexDirection: 'column', alignItems: 'start', display: 'flex', justifyContent: 'space-between', height: '85%'}}>
                        <Box sx={{flexDirection: 'column', display: 'flex', alignItems: 'start'}}>
                            <Link
                                underline='none'
                                color='magenta'
                                variant='h5'
                                component="button"
                                sx={{ marginY: '10px' }}
                                onClick={() => { navigate('/app'); closeModal()}}
                            >Home</Link>
                            <Link
                                underline='none'
                                color='magenta'
                                variant='h5'
                                component="button"
                                sx={{ marginY: '10px'}}
                            >New Album</Link>
                            <Link
                                underline='none'
                                color='magenta'
                                variant='h5'
                                component="button"
                                sx={{ marginY: '10px' }}
                                onClick={() => { navigate('profile'); closeModal()}}
                            >Profile</Link>
                        </Box>
                        <Box>
                            <Link
                                underline='none'
                                color='magenta'
                                variant='h5'
                                component="button"
                                sx={{ marginY: '10px'}}
                            >Log out</Link>
                        </Box>
                    </Box>
                </SideBarContent>
            </OverlayContainer>
        </>
    )
}

export default MenuOptions;