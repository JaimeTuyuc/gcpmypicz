import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ContentContainer, MainContainer } from './styles/OutletStyles';
import NavBar from './NavBar/NavBar';

const ProtectedRutes = () => {
    const { userAuth } = useSelector((state) => state.user);
    const isLoading = false;
    return (
        isLoading ? (
            <p>Loading Page or custom spinner</p>
        ) : userAuth ? (
            <MainContainer>
                <NavBar />
                    <ContentContainer>
                        <Outlet />
                    </ContentContainer>
            </MainContainer>
        ) : <Navigate to={'/'} />
    )
}

export default ProtectedRutes;