import { useIsomorphicLayoutEffect, useUserData } from 'hooks'
import HomePage from 'pages/Admin/Home'
import React, { useState } from 'react'

const DashboardComponent = () => {
    const user = useUserData()
    const [type, setType] = useState<string>('')

    useIsomorphicLayoutEffect(() => {
        console.log('user type is', user.type)
        setType(user.type)
    },[user.type])

    if(type === "ADMIN"){
        return <HomePage />
    }

    if(type === "STUDENT"){
        return <> student </>
    }

    if(type === "FACULTY"){
        return <> faculty </>
    }

    return (
        <> not found </>
    )
}

export default DashboardComponent