import React, {useState} from 'react';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import { CardImageContainer, ImageCard, MainCardContainer } from '../../private/User/styles/UserStyles';
import { Grid, TextField, Typography } from '@mui/material';
import { ContenContainer, MainFriendsContainer } from './FriendsStyle';
import SingleImageRender from './SingleImageFriend';
import { useDispatch } from 'react-redux';
import { imagesAction } from '../../../../features/imagesSlice';
import ImageDetailsComponent from '../../private/Images/ImageDetails';

const RenderInfoFriends = () => {
    const dispatch = useDispatch();
    const { friendsProfileInfo } = useSelector((state) => state.images);
    const hasInfo = JSON.stringify(friendsProfileInfo.user) !== '{}' && friendsProfileInfo.publicImgs.length === 0;
    const [modalOpen, setModalOpen] = useState(false);

    const closeModalHandler = () => {
        setModalOpen(false);
        dispatch(imagesAction.dispatchDetailsImg({ img: {}, withAlbum: false }));
    }

    const handlerModal = (imgObj) => {
        setModalOpen(true);
        dispatch(imagesAction.dispatchDetailsImg({ img: imgObj, withAlbum: false }));
    }
    return (
        <>
            <MainFriendsContainer>
                <ContenContainer>
                    <MainCardContainer>
                        <CardImageContainer>
                            <ImageCard src={friendsProfileInfo?.user?.avatar} alt='Profile Picz' />
                        </CardImageContainer>

                        <Typography
                            variant='h6'
                            textAlign='center'
                            marginTop='10px'
                        >{friendsProfileInfo?.user?.name} {friendsProfileInfo?.user?.lastName}</Typography>

                    </MainCardContainer>
                    <Box
                        sx={{ marginTop: '10px' }}
                    >
                        <TextField
                            label={`${friendsProfileInfo?.user?.name} ${friendsProfileInfo?.user?.lastName} Bio`}
                            value={`${friendsProfileInfo?.user?.bio}`}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="standard"
                            multiline
                            rows={4}
                            fullWidth
                            
                        />
                    </Box>

                </ContenContainer>
                <Box sx={{ marginY: '10px', display: 'flex', justifyContent: 'center', flexDirection: 'row', width: '70%'}}>
                    {
                        hasInfo && <Typography variant='h6' textAlign='center'>{`Seems that ${friendsProfileInfo?.user?.name} does not have public images`}</Typography>
                    }
                    <Box sx={{ flexFlow: 1}}>
                        <Grid container spacing={2}>
                            {
                                friendsProfileInfo.publicImgs.map((img) => {
                                    return (
                                        <Grid item key={img.imageId} md={3} sm={4} xs={12}>
                                            <SingleImageRender image={img} handlerModal={handlerModal} />
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Box>
                </Box>
            </MainFriendsContainer>
            <ImageDetailsComponent open={modalOpen} onClose={closeModalHandler} withDelete={false} />
        </>
    )
}

export default RenderInfoFriends;