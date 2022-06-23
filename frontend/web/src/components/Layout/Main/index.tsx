import React from 'react'
import { Outlet } from 'react-router-dom'

const Main = () => {
    return(
        <main className="flex-1">
            <div className="py-3 px-6 w-full">
                <Outlet/>
            </div>
        </main>
    )
}

export default Main