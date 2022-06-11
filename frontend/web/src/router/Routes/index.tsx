import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from 'pages/Auth/Login'
import PrivateRoute from 'router/PrivateRoute'
import Dashboard from 'components/Dashboard'
import Layout from 'components/Layout'
import CheckRole from 'router/CheckRole'
import FacultyIndex from 'pages/Admin/Faculty'
import DepartmentIndex from 'pages/Admin/Department'
import DepartmentForm from 'pages/Admin/Department/DepartmentForm'
import FacultyForm from 'pages/Admin/Faculty/FacultyForm'
import FacultyProfile from 'pages/Admin/Faculty/FacultyProfile'
import StudentIndex from 'pages/Admin/Student'
import StudentForm from 'pages/Admin/Student/StudentForm'
import CourseIndex from 'pages/Admin/Course'
import CourseForm from 'pages/Admin/Course/CourseForm'
import SettingsPage from 'pages/Admin/Settings'
import GeneralComponent from 'pages/Admin/Settings/Components/General'
import SchoolYearComponent from 'pages/Admin/Settings/Components/SchoolYear'
import ClassroomPage from 'pages/Admin/Classroom'
import ClassroomForm from 'pages/Admin/Classroom/ClassroomForm'
import UpdateClassroomForm from 'pages/Admin/Classroom/UpdateClassroomForm'
import ClassroomDetails from 'pages/Admin/Classroom/ClassroomDetails'

const CustomRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<SignIn />}/>

                <Route element={<PrivateRoute/>}>
                    <Route element={<Layout/>}>
                        {/* ADMIN */}
                            <Route path="dashboard">
                                <Route index element={<Dashboard/>} />
                                <Route element={<CheckRole type='ADMIN' />} >

                                    {/* Department */}
                                    <Route path='subject'>
                                        <Route index element={<DepartmentIndex />} />
                                        <Route path="create" element={<DepartmentForm />} />
                                    </Route>

                                    {/* Classroom */}
                                    <Route path="classroom">
                                        <Route index element={<ClassroomPage/>} />
                                        <Route path="create" element={<ClassroomForm />} />
                                        <Route path=":id" element={<ClassroomDetails />} />
                                        <Route path="update/:id" element={<UpdateClassroomForm />} />
                                    </Route>

                                    {/* Faculty */}
                                    <Route path="faculty">
                                        <Route index element={<FacultyIndex />} />
                                        <Route path="create" element={<FacultyForm />} />
                                        <Route path="update/:id" element={<FacultyProfile />} />
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

                                    {/* Settings */}
                                    <Route path="settings">
                                        <Route element={<SettingsPage />}>
                                            <Route index element={<GeneralComponent />} />
                                            <Route path="school-year" element={<SchoolYearComponent />} />
                                        </Route>
                                    </Route>
                                </Route>
   

                                {/* STUDENT DASHBOARD */}
                                <Route element={<CheckRole type='STUDENT' />} >
                                    {/* <Route element={<>STUDENT</>} /> */}
                                </Route>
                                
                                {/* FACULTY DASHBOARD */}
                                <Route element={<CheckRole type='FACULTY' />} >
                                    {/* <Route element={<>STUDENT</>} /> */}
                                </Route>

                                <Route path="*" element={<>404</>} />


                        </Route>

                        


                    </Route>
                </Route>
        </Routes>
    )
}

export default CustomRoute;