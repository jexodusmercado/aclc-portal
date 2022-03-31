import React from 'react'
import { useUserAuthenticated } from 'hooks'
import { useLocation, Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const location  = useLocation()
    const auth      = useUserAuthenticated()

    if(!auth) {
        return <Navigate to="/" state={{ from: location }} />
    }

    return <Outlet />;
}

export default PrivateRoute;