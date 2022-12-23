import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SingleAlbum from './SingleAlbum';
import ModalEditAlbum from './ModalEditAlbum';
import { deleteAlbumService, editAlbumService } from '../../../../services/albumService';
import ModalDeleteAlbum from './ModalDelete';
import { albumActions } from '../../../../features/albumsSlice';

const Albums = () => {
    const dispatch = useDispatch();
    const { allAlbums, completed, completeEdit } = useSelector((state) => state.albums);
    const [moreOptions, setMoreOptions] = useState({
        showModal: false,
        albumEle: {}
    });
    const [isEditOption, setIsEditOption] = useState(false);
    const [isDeleteAlbum, setIsDeleteAlbum] = useState(false);
    const [deleteObj, setDeleteObj] = useState({});
    const { showModal, albumEle } = moreOptions;
    const editHandler = () => {
        setIsEditOption(!isEditOption);
        if (isEditOption) {
            setMoreOptions({ ...moreOptions, showModal: false })
        }
    }
    const deleteHandler = () => {
        setIsDeleteAlbum(!isDeleteAlbum);
        if (isDeleteAlbum) {
            setDeleteObj({})
            setMoreOptions({ ...moreOptions, showModal: false })
        }
    }
    const showMoreOptions = (data) => {
        dispatch(albumActions.dispatchCompletedRequest(null));
        dispatch(albumActions.dispatchCompleteEdit(null));
        setMoreOptions({
            showModal: !showModal,
            albumEle: data
        })
    }

    const albumEditedHandler = (dataEdited) => {
        dispatch(editAlbumService(dataEdited))
    }

    const albumDeleteHandler = (dataDelete) => {
        dispatch(deleteAlbumService(dataDelete));
    }

    useEffect(() => {
        if (completed) {
            deleteHandler();
        }
    }, [completed])

    useEffect(() => {
        if (completeEdit) {
            editHandler();
        }
    }, [completeEdit])

    return (
        <>
            <Box sx={{ flexGrow: 1, paddingY: '15px'}}>
                <Grid container spacing={3}>
                    {
                        allAlbums.map((album) => {
                            return (
                                <Grid item key={album.albumId} xs={12} sm={6} md={2}>
                                    <SingleAlbum album={album} moreOptions={showModal} albumEle={albumEle} showMoreOptions={showMoreOptions} editHandler={editHandler} deleteHandler={deleteHandler} setDeleteObj={setDeleteObj} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Box>

            <ModalEditAlbum open={isEditOption} albumDataEdit={albumEle} onClose={editHandler} albumEditedHandler={albumEditedHandler} />
            <ModalDeleteAlbum open={isDeleteAlbum} onClose={deleteHandler} deleteObj={deleteObj} albumDeleteHandler={albumDeleteHandler} />
        </>
    )
}

export default Albums;