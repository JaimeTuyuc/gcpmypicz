import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicRoutes = () => {

    return (
        <>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default PublicRoutes;