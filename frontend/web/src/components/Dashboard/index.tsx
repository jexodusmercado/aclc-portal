import { useIsomorphicLayoutEffect } from 'hooks'
import HomePage from 'pages/Admin/Home'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getAuthUser } from 'redux/auth/selector'

const DashboardComponent = () => {
    const user = useSelector(getAuthUser)
    const [type, setType] = useState<string>('')

    useIsomorphicLayoutEffect(() => {
        console.log('user type is', user.type)
        setType(user.type)
    },[user.type])

    if(type === "ADMIN"){
        return <HomePage />
    }

    if(type === "STUDENT"){
        return <Navigate to={'/student/classroom'} />
    }

    if(type === "FACULTY"){
        return <Navigate to={'/faculty/classroom'} />
    }

    return (
        <> not found </>
    )
}

export default DashboardComponent