import React, { useState, useEffect } from 'react'
import { Box, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { CardImageContainer, ImageCard, MainCardContainer, ButtonEditImage } from './styles/UserStyles.js';
import { Icon } from 'react-icons-kit';
import { pencil } from 'react-icons-kit/typicons/pencil';
import ProfileInputChange from './ProfileChange.jsx';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { deleteAccountService, updateUserProfile } from '../../../../services/userService.js';
import { userActions } from '../../../../features/userSlice.js';
import ImageModalUpload from '../Images/ImageModalUpload.jsx';
import ModalDeleteAccount from './DeleteAccountModal.jsx';

const Profile = () => {
    const dispatch = useDispatch();
    const { userInfo, profileUpdated, imageProfileUpdated } = useSelector((state) => state.user);
    const [editUserInfo, setEditUserInfo] = useState({
        name: '',
        lastName: '',
        email: '',
        userName: '',
        avatar: '',
        bio: ''
    });
    const { name, lastName, email, userName, avatar, bio } = editUserInfo;
    const [editableOpt, setEditableOpt] = useState({
        nameE: true,
        lastNameE: true,
        emailE: true,
        userNameE: true,
        avatarE: true,
        bioE: true
    })
    const { nameE, lastNameE, emailE, userNameE, bioE } = editableOpt;
    useEffect(() => {
        if (profileUpdated) {
            setEditUserInfo({
                name: '',
                lastName: '',
                email: '',
                userName: '',
                avatar: '',
                bio: ''
            });
            setEditableOpt({
                nameE: true,
                lastNameE: true,
                emailE: true,
                userNameE: true,
                avatarE: true,
                bioE: true
            })
        }
    },[profileUpdated])
    useEffect(() => {
        if (userInfo) {
            setEditUserInfo({...editUserInfo, name: userInfo.name, lastName: userInfo.lastName, email: userInfo.email, userName: userInfo.userName, avatar: userInfo.avatar, bio: userInfo.bio})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo]);

    const [openModal, setOpenModal] = useState(false);
    const closeModal = () => {
        setOpenModal(!openModal);
    }

    const openModalHandler = () => {
        setOpenModal(!openModal)
    }

    const submitHandlerEdition = (value, field) => {
        dispatch(updateUserProfile({ field: field, value: value }));
    }

    const saveImageAlbum = (data) => {
        dispatch(updateUserProfile({field: 'avatar', value: data.imgUrl}))
    }
    const resetFlowEdit = () => {
        dispatch(userActions.dispatchProfileUpdatedSuccess(null));
        dispatch(userActions.dispatchImageUpdatedSuccess(null));
    }

    useEffect(() => {
        if (imageProfileUpdated) {
            setOpenModal(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[imageProfileUpdated])

    const [modalDelete, setModalDelete] = useState(false);

    const openDeleteModal = () => {
        setModalDelete(true);
    }

    const closeModalDelete = () => {
        setModalDelete(false);
    }

    const confirmDelteAccount = () => {
        dispatch(deleteAccountService());
    }

    return (
        <>
            <Box>
                <Typography
                    variant='h6'
                    fontWeight='bold'
                    gutterBottom
                >Your Profile</Typography>

                <Box>
                    <MainCardContainer>
                        <CardImageContainer>
                            <ImageCard src={avatar} alt='Profile Picz' />

                            <ButtonEditImage
                                onClick={ () => { openModalHandler(); resetFlowEdit()}}
                            >
                                <Icon icon={pencil} size={35} />
                            </ButtonEditImage>
                        </CardImageContainer>
                    </MainCardContainer>
                </Box>

                <Box>
                    <ProfileInputChange
                        value={bio}
                        disabledEdit={bioE}
                        onValueChange={(e) => setEditUserInfo({ ...editUserInfo, bio: e.target.value })}
                        onCancelEdit={() => setEditUserInfo({ ...editUserInfo, bio: userInfo.bio })}
                        onClickValue={() => { setEditableOpt({ ...editableOpt, bioE: !bioE }); resetFlowEdit()}}
                        isEditable={true}
                        defaultV='Biography'
                        submitHandlerEdition={submitHandlerEdition}
                        idValue='bio'
                        multiline={true}
                        rows={3}
                    />
                    <ProfileInputChange
                        value={name}
                        disabledEdit={nameE}
                        onValueChange={(e) => setEditUserInfo({ ...editUserInfo, name: e.target.value })}
                        onCancelEdit={() => setEditUserInfo({ ...editUserInfo, name: userInfo.name })}
                        onClickValue={() => { setEditableOpt({ ...editableOpt, nameE: !nameE }); resetFlowEdit()}}
                        isEditable={true}
                        defaultV='Name'
                        submitHandlerEdition={submitHandlerEdition}
                        idValue='name'
                    />
                    <ProfileInputChange 
                        value={lastName} 
                        disabledEdit={lastNameE} 
                        onValueChange={(e) => setEditUserInfo({ ...editUserInfo, lastName: e.target.value })} 
                        onCancelEdit={() => setEditUserInfo({ ...editUserInfo, lastName: userInfo.lastName })} 
                        onClickValue={() => { setEditableOpt({ ...editableOpt, lastNameE: !lastNameE }); resetFlowEdit()}} 
                        isEditable={true} 
                        defaultV='Last Name'
                        submitHandlerEdition={submitHandlerEdition}
                        idValue='lastName'
                    />
                    <ProfileInputChange 
                        value={userName} 
                        disabledEdit={userNameE} 
                        onValueChange={(e) => setEditUserInfo({ ...editUserInfo, userName: e.target.value })} 
                        onCancelEdit={() => setEditUserInfo({ ...editUserInfo, userNameE: userInfo.userName })} 
                        onClickValue={() => { setEditableOpt({ ...editableOpt, userNameE: !userNameE }); resetFlowEdit()}} 
                        isEditable={true} 
                        defaultV='User Name'
                        submitHandlerEdition={submitHandlerEdition}
                        idValue='userName'
                    />
                    <ProfileInputChange 
                        value={email} 
                        disabledEdit={emailE} 
                        onValueChange={(e) => setEditUserInfo({ ...editUserInfo, email: e.target.value })} 
                        onCancelEdit={() => setEditUserInfo({ ...editUserInfo, email: userInfo.email })} 
                        onClickValue={() => { setEditableOpt({ ...editableOpt, emailE: !emailE });  resetFlowEdit()}} 
                        isEditable={false} 
                        defaultV='Email'
                        submitHandlerEdition={submitHandlerEdition}
                        idValue='email'
                    />
                </Box>

                <Box
                    marginTop='50px'
                    marginBottom='15px'
                >
                    <Typography
                        variant='body2'
                        color='red'
                        fontWeight='bold'
                        gutterBottom
                        marginBottom='15px'
                    >Danger Zone</Typography>
                    <Button
                        variant='contained'
                        color='error'
                        endIcon={<DeleteRoundedIcon />}
                        onClick={openDeleteModal}
                    >Delete account</Button>
                </Box>

                <ImageModalUpload open={openModal} onClose={closeModal} saveImageAlbum={saveImageAlbum} withDesc={false} title='New Profile Image' />
                <ModalDeleteAccount open={modalDelete} onClose={closeModalDelete} confirmDelteAccount={confirmDelteAccount} />
            </Box>
        </>
    )
}

export default Profile;