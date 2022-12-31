import { Avatar, Box, Link, Typography } from '@mui/material';
import React from 'react';
import { CloseOverlay, OverlayContainer, SideBarContent } from './styles/NavBarStyles';
import { androidClose } from 'react-icons-kit/ionicons/androidClose';
import { Icon } from 'react-icons-kit';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../../../features/userSlice';
import { albumActions } from '../../../../features/albumsSlice';
import { imagesAction } from '../../../../features/imagesSlice';

const MenuOptions = ({ closeModal, openSideBar }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.user);

    const logoutUser = () => {
        dispatch(userActions.dispatchLogoutUser());
        dispatch(albumActions.dispatchLogoutAlbum());
        dispatch(imagesAction.dispatchLogoutImages());
        localStorage.removeItem('$token');
    }

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
                                fontWeight='bold'
                                sx={{ marginY: '10px' }}
                                onClick={() => { navigate('/app'); closeModal()}}
                            >Home</Link>
                            {/*<Link
                                underline='none'
                                color='magenta'
                                variant='h5'
                                component="button"
                                sx={{ marginY: '10px'}}
                            >New Album</Link>*/}
                            <Link
                                underline='none'
                                color='magenta'
                                variant='h5'
                                component="button"
                                fontWeight='bold'
                                sx={{ marginY: '10px' }}
                                onClick={() => { navigate('profile'); closeModal()}}
                            >Profile</Link>
                             <Link
                                underline='none'
                                color='magenta'
                                variant='h5'
                                component="button"
                                fontWeight='bold'
                                sx={{ marginY: '10px' }}
                                //onClick={() => { navigate('app/find-friends'); closeModal()}}
                            >
                                <a className='findFriends' href='http://gcp-my-picz.uc.r.appspot.com/app/find-friends' target='_blank' rel="noreferrer" >Find Friends</a>
                            </Link>
                        </Box>
                        <Box
                            sx={{ width: '100%'}}
                        >
                            <Box
                                display='flex'
                                alignItems='center'
                                flexDirection='column'
                                justifyContent='center'
                            >
                                <Avatar
                                    alt={'User Profile'}
                                    src={userInfo.avatar}
                                    sx={{ width: 56, height: 56 }}
                                />
                                <Typography
                                    variant='body2'
                                    marginY='8px'
                                    color='gray'
                                >{userInfo.name} {userInfo.lastName}</Typography>
                            </Box>
                            <Link
                                underline='none'
                                color='magenta'
                                variant='h5'
                                component="button"
                                fontWeight='bold'
                                sx={{ marginY: '10px' }}
                                onClick={logoutUser}
                            >Log out</Link>
                        </Box>
                    </Box>
                </SideBarContent>
            </OverlayContainer>
        </>
    )
}

export default MenuOptions;