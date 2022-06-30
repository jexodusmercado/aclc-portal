import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { getAuthenticated, getAuthUser } from 'redux/auth/selector'

interface Props {
    type: string
}

const CheckRole : React.FC<Props> = ({type}) => {
    const auth      = useSelector(getAuthenticated)
    const user      = useSelector(getAuthUser)

    console.log('check roles');
    if(auth && user.type === type) {
        return <Outlet/>;
    }


    return <Navigate to="/"/>;
}

export default CheckRole;