import React, { useEffect, useState }  from 'react';
import { Button, Grid } from '@mui/material';
import { Box } from '@mui/system';
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import AlbumForm from '../Albums/NewAlbumForm';
import { useDispatch } from 'react-redux';
import { addNewUserAlbum, getAllAlbumsUser } from '../../../../services/albumService';
import { albumActions } from '../../../../features/albumsSlice';
import Albums from '../Albums/Albums';

const HomePage = () => {
    const distpatch = useDispatch();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        distpatch(getAllAlbumsUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOpenModal = () => {
        setOpen(!open);
        distpatch(albumActions.dispatchSavedAlbum(null));
    }

    const albumToAdd = (data) => {
        distpatch(addNewUserAlbum(data));
    }
    return (
        <>
            <Box>
                <Box sx={{ flexGrow: 1 }} >
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3} lg={2}>
                            <Button
                                fullWidth
                                variant='contained'
                                endIcon={<SnippetFolderIcon />}
                                color='secondary'
                                sx={{ marginRight: '15px' }}
                                onClick={handleOpenModal}
                            >New Album</Button>

                            <AlbumForm open={open} onClose={handleOpenModal} albumToAdd={albumToAdd} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={2}>
                            <Button
                                fullWidth
                                variant='outlined'
                                endIcon={<WallpaperIcon />}
                                color='secondary'
                            >Single Picture</Button>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ marginTop: '20px'}}>
                    <Albums />
                </Box>
            </Box>
        </>
    )
}

export default HomePage;