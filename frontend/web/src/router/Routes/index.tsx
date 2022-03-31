import React from 'react'
import { Route, Routes } from 'react-router-dom'
import StudentLogin from 'pages/Student/Auth/Login'
import PrivateRoute from 'router/PrivateRoute'
import AdminDashboard from 'pages/Admin/Dashboard'
import Authenticating from 'router/Authenticating'
import AdminLayout from 'pages/Admin/Layout'
import CheckRole from 'router/CheckRole'
import UsersDashboard from 'pages/Admin/Dashboard/Users'

const CustomRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<StudentLogin />}/>
            <Route path="authenticating" element={<Authenticating />}/>

            <Route element={<PrivateRoute />}>

                <Route path="dashboard">

                    {/* ADMIN */}
                    <Route element={<CheckRole type='admin' />} >
                        <Route path="admin" element={<AdminLayout />}>
                            <Route path="home" element={<AdminDashboard/>} />
                            <Route path="users" element={<UsersDashboard />} />

                            <Route path="*" element={<>404</>} />
                        </Route>
                    </Route>

                    {/* STUDENT */}
                    <Route element={<CheckRole type='student' />} >
                        <Route path="student" element={<AdminLayout />}>
                            <Route path="home" element={<AdminDashboard/>} />

                            <Route path="*" element={<>404</>} />
                        </Route>
                    </Route>
                    
                    {/* FACULTY */}
                    <Route element={<CheckRole type='faculty' />} >
                        <Route path="faculty" element={<AdminLayout />}>
                            <Route path="home" element={<AdminDashboard/>} />

                            <Route path="*" element={<>404</>} />
                        </Route>
                    </Route>

                </Route>
            </Route>
        </Routes>
    )
}

export default CustomRoute;