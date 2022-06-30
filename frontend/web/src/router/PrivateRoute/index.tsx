import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { getAuthenticated } from 'redux/auth/selector'

const PrivateRoute = () => {
    const auth      = useSelector(getAuthenticated)

    if(auth === false) {
        console.log('not login')
        return <Navigate to="/"/>
    }

    return <Outlet />;
}

export default PrivateRoute;