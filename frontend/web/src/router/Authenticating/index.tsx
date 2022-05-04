import React from 'react'
import { useUserAuthenticated, useUserData } from 'hooks'
import { useLocation, Navigate } from 'react-router-dom'

const Authenticating = () => {
    const location  = useLocation()
    const auth      = useUserAuthenticated()
    const user      = useUserData()

    if(auth) {
        if(user.type === 'ADMIN'){
            return <Navigate to="/dashboard" state={{ from: location }} />
        }

        if(user.type === 'STUDENT'){
            return <Navigate to="/dashboard" state={{ from: location }} />
        }

        if(user.type === 'FACULTY'){
            return <Navigate to="/dashboard" state={{ from: location }} />
        }
    }


    return <Navigate to="/" />;
}

export default Authenticating;