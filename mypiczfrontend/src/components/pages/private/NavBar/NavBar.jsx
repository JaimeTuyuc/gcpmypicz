import { Box, Link, Typography } from '@mui/material';
import React, { useState }  from 'react';
import { Icon } from 'react-icons-kit';
import {thMenu} from 'react-icons-kit/typicons/thMenu'
import { BurgerContainer, MainNavContainer } from './styles/NavBarStyles';
import MenuOptions from './MenuOptions';
import { useNavigate } from 'react-router-dom';

const NavBar = ({isFindFriends}) => {
    const navigate = useNavigate()
    const [openSideBar, setOpenSideBar] = useState(false);

    const closeContentModal = () => {
        setOpenSideBar(!openSideBar)
    }
    return (
        <>
            <MainNavContainer >
                <Box>
                    <Typography
                        variant='h5'
                        fontWeight='bold'
                    >
                        <Link
                            underline='none'
                            color='white'
                            variant='h5'
                            component="button"
                            fontWeight='bold'
                            onClick={() => navigate('/app')}
                        >MyPicz</Link>
                        
                    </Typography>
                </Box>
                {
                    isFindFriends && (
                        <BurgerContainer
                            onClick={closeContentModal}
                        >
                            <Icon size={40} icon={thMenu} />
                        </BurgerContainer>
                    )
                }
            </MainNavContainer>

            {
                openSideBar && <MenuOptions openSideBar={openSideBar} closeModal={closeContentModal} />
            }
        </>
    )
}

export default NavBar;