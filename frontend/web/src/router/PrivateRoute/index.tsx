import React from 'react'
import { useUserAuthenticated } from 'hooks'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const auth      = useUserAuthenticated()

    if(!auth) {
        console.log('not login')
        return <Navigate to="/"/>
    }

    return <Outlet />;
}

export default PrivateRoute;