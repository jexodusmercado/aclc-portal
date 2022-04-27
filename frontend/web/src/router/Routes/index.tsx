import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from 'pages/Auth/Login'
import PrivateRoute from 'router/PrivateRoute'
import AdminDashboard from 'pages/Admin/Dashboard'
import Layout from 'components/Layout'
import CheckRole from 'router/CheckRole'
import FacultyIndex from 'pages/Admin/Dashboard/Faculty'
import DepartmentIndex from 'pages/Admin/Dashboard/Department'
import DepartmentForm from 'pages/Admin/Dashboard/Department/DepartmentForm'
import FacultyForm from 'pages/Admin/Dashboard/Faculty/FacultyForm'
import FacultyProfile from 'pages/Admin/Dashboard/Faculty/FacultyProfile'
import StudentIndex from 'pages/Admin/Dashboard/Student'
import StudentForm from 'pages/Admin/Dashboard/Student/StudentForm'
import CourseIndex from 'pages/Admin/Dashboard/Course'
import CourseForm from 'pages/Admin/Dashboard/Course/CourseForm'

const CustomRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<SignIn />}/>

            <Route element={<PrivateRoute />}>

                <Route element={<Layout/>}>
                    {/* ADMIN */}
                    <Route element={<CheckRole type='ADMIN' />} >
                        <Route path="dashboard">
                            <Route index element={<AdminDashboard/>} />

                            {/* Department */}
                            <Route path='department'>
                                <Route index element={<DepartmentIndex />} />
                                <Route path="create" element={<DepartmentForm />} />
                            </Route>
                            
                            {/* Faculty */}
                            <Route path="faculty">
                                <Route index element={<FacultyIndex />} />
                                <Route path="create" element={<FacultyForm />} />
                                <Route path="edit/:id" element={<FacultyProfile />} />
                            </Route>

                            {/* Student */}
                            <Route path="student">
                                <Route index element={<StudentIndex/>} />
                                <Route path="create" element={<StudentForm />} />
                            </Route>

                            {/* Course */}
                            <Route path="course">
                                <Route index element={<CourseIndex />} />
                                <Route path="create" element={<CourseForm />} />
                            </Route>

                            <Route path="*" element={<>404</>} />

                        </Route>
                    </Route>

                    {/*
                    <Route element={<CheckRole type='student' />} >
                            <Route index element={<AdminDashboard/>} />

                            <Route path="*" element={<>404</>} />
                    </Route>
                    
                    <Route element={<CheckRole type='faculty' />} >
                            <Route index element={<AdminDashboard/>} />

                            <Route path="*" element={<>404</>} />
                    </Route> */}

                </Route>
            </Route>
        </Routes>
    )
}

export default CustomRoute;