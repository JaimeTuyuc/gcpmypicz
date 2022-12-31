import React, { useState } from 'react';
import { Box, Button, FormControl, TextField, Typography, OutlinedInput, InputAdornment, IconButton, InputLabel } from '@mui/material';
import NavBar from '../../private/NavBar/NavBar';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchParams } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendsInfo } from '../../../../services/imageService';
import RenderInfoFriends from './RenderInfoFriends';
import { imagesAction } from '../../../../features/imagesSlice';

const FindFriends = () => {
    const dispatch = useDispatch();
    const [findUser, setFindUser] = useState('');
    const [params, setParams] = useSearchParams();
    const { friendsProfileInfo } = useSelector((state) => state.images);

    const findPublicUserInfo = (e) => {
        e.preventDefault();
        setParams({ userName: findUser });
        dispatch(getFriendsInfo(findUser));
    }

    const clearDataFilter = () => {
        setFindUser('');
        setParams({});
        dispatch(imagesAction.dispatchFriendsInfoSuccess({ userInfo: {}, publicImgs: [] }))
    }

    const hasInfo = JSON.stringify(friendsProfileInfo.user) === '{}' && friendsProfileInfo.publicImgs.length === 0;
    const noUserFound = JSON.stringify(friendsProfileInfo.user) !== '{}'
    return (
        <>
            <NavBar isFindFriends={false} />
            <Box
                sx={{ paddingX: '50px', paddingTop: '50px', paddingBottom: '20px'}}
            >
                <Typography
                    variant='h5'
                    fontWeight='bold'
                >Find Friends</Typography>

                <Box
                    sx={{ marginY: '15px'}}
                >
                    <FormControl
                        sx={{display: 'flex', flexDirection: 'row'}}
                    >
                        <InputLabel htmlFor="outlined-adornment-password">User Name</InputLabel>
                        <OutlinedInput
                            id='findFriends'
                            color='success'
                            type='text'
                            onChange={(e) => setFindUser(e.target.value)}
                            value={findUser}
                            endAdornment={
                                <InputAdornment
                                    position='end'
                                >
                                    {
                                        findUser && (
                                            <IconButton
                                                edge='end'
                                                onClick={clearDataFilter}
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                        )
                                    }
                                </InputAdornment>
                            }
                            label='User Name'
                        />
                        <Button
                            variant='contained'
                            endIcon={<SearchIcon />}
                            color='secondary'
                            disabled={!findUser}
                            sx={{ marginLeft: '20px' }}
                            onClick={findPublicUserInfo}
                        >Search</Button>
                    </FormControl>
                </Box>

                {
                    noUserFound ? <RenderInfoFriends /> : hasInfo ? <Typography variant='h5' marginTop='40px' textAlign='center'>No users Found, please check the user name</Typography> : ''
                }
            </Box>
        </>
    )
}

export default FindFriends;