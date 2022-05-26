import React from 'react'
import { useUserAuthenticated, useUserData } from 'hooks'
import { Navigate, Outlet } from 'react-router-dom'

interface Props {
    type: string
}

const CheckRole : React.FC<Props> = ({type}) => {
    const auth      = useUserAuthenticated()
    const user      = useUserData()

    if(auth) {
        if(user?.type !== type){
            return <Navigate to="/"/>
        }
        
        return <Outlet/>;
    }


    return <Navigate to="/"/>;
}

export default CheckRole;