import React from 'react';
import { Box } from '@mui/system';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link, Typography } from '@mui/material';
import { FolderContainer, MainAlbumContainer, MenuOptionsContainer, OptionsContainer, PrevImage } from './styles/SingleAlbumStyles';
import { androidFolder } from 'react-icons-kit/ionicons/androidFolder';
import { Icon } from 'react-icons-kit';
import { useNavigate } from 'react-router-dom';

const SingleAlbum = ({ album, showMoreOptions, moreOptions, albumEle, editHandler, deleteHandler, setDeleteObj}) => {
    const navigate = useNavigate();
    return (
        <>
            <Box sx={{ backgroundColor: album.albumColor, borderRadius: '5px', position: 'relative', boxShadow: '8px 10px 5px #787878' }}>
                <MainAlbumContainer>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography
                            variant='body1'
                            gutterBottom
                            color='white'
                            fontWeight='bold'
                        >{album.albumName}</Typography>

                        <div style={{ position: 'relative' }}>
                            <OptionsContainer onClick={() => showMoreOptions(album)}>
                                <MoreHorizIcon className='hoverElement' sx={{ color: 'white'}} fontSize='medium' />
                            </OptionsContainer>
                            {
                                moreOptions && albumEle.albumId === album.albumId && (
                                        <MenuOptionsContainer>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', paddingX: '5px'}}>
                                                <Link
                                                    underline='none'
                                                    color='black'
                                                    variant='body1'
                                                    component="button"
                                                    sx={{ marginY: '3px' }}
                                                    onClick={editHandler}
                                                >Edit Album</Link>
                                                <Link
                                                    underline='none'
                                                    color='black'
                                                    variant='body1'
                                                    component="button"
                                                    sx={{ marginY: '3px' }}
                                                    onClick={() => { deleteHandler(); setDeleteObj(album)}}
                                                >Delete Album</Link>
                                            </Box>
                                        </MenuOptionsContainer>
                                    )
                                }
                        </div>
                    </Box>

                    <FolderContainer
                        onClick={() => navigate(`album/${album.albumId}`)}
                    >
                        {
                            !album.prevImgAlbum ?
                                (<Icon icon={androidFolder} size={70} />) : 
                                (<PrevImage src={album.prevImgAlbum} alt='Folder Img' />)
                        }
                    </FolderContainer>
                </MainAlbumContainer>
            </Box>
        </>
    )
}

export default SingleAlbum;