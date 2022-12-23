import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import { Icon } from 'react-icons-kit';
import { arrowLeftC } from 'react-icons-kit/ionicons/arrowLeftC';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllImagesByAlbum } from '../../../../services/imageService';
import { Typography } from '@mui/material';

const AlbumImages = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { allImagesByAlbum } = useSelector((state) => state.images);
    useEffect(() => {
        dispatch(getAllImagesByAlbum(id));
    }, [id])
    return (
        <>
            <Box>
                <div
                    className='hoverElement'
                    onClick={() => navigate(-1)}
                >
                    <Icon icon={arrowLeftC} size={40} />
                </div>

                <Box>
                    {
                        allImagesByAlbum.length <= 0 &&
                            <Typography variant='h5'
                                textAlign='center'
                                fontWeight='bold'
                            >No images yet</Typography>
                    }
                </Box>
            </Box>
        </>
    )
}

export default AlbumImages;