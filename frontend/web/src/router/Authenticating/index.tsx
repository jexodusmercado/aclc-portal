import React from 'react'
import { useUserAuthenticated, useUserData } from 'hooks'
import { useLocation, Navigate } from 'react-router-dom'

const Authenticating = () => {
    const location  = useLocation()
    const auth      = useUserAuthenticated()
    const user      = useUserData()

    if(auth) {
        if(user.type === 'admin'){
            return <Navigate to="/dashboard/admin/home" state={{ from: location }} />
        }

        if(user.type === 'student'){
            return <Navigate to="/dashboard/student/home" state={{ from: location }} />
        }

        if(user.type === 'faculty'){
            return <Navigate to="/dashboard/faculty/home" state={{ from: location }} />
        }
    }


    return <Navigate to="/" />;
}

export default Authenticating;