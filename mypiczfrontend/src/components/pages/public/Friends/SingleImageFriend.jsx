import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { MainAlbumContainerImg, SingleImg } from '../../private/Images/styles/SingleImageStyles';

const SingleImageRender = ({ image, handlerModal }) => {

    return (
        <>
            <Box sx={{ borderRadius: '8px', position: 'relative', boxShadow: '8px 10px 5px #787878' }}>
                <MainAlbumContainerImg>
                    <Box >
                        <SingleImg src={image.imgUrl} alt='MyPic' />
                    </Box>

                    <Box sx={{ marginY: '15px' }}>
                        <Button
                            variant='contained'
                            color='secondary'
                            onClick={() => handlerModal(image)}
                        >
                            Details
                        </Button>
                    </Box>
                </MainAlbumContainerImg>
            </Box>
        </>
    )
}

export default SingleImageRender;