import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from 'pages/Auth/Login'
import PrivateRoute from 'router/PrivateRoute'
import Dashboard from 'components/Dashboard'
import Layout from 'components/Layout'
import CheckRole from 'router/CheckRole'
import FacultyIndex from 'pages/Admin/Faculty'
import Subject from 'pages/Admin/Subject'
import SubjectForm from 'pages/Admin/Subject/SubjectForm'
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
import ClassroomDetails from 'pages/Admin/Classroom/ClassroomDetails'
import UpdateSubjectForm from 'pages/Admin/Subject/UpdateSubjectForm'
import FacultyHomePage from 'pages/Faculty/Home'
import FacultyClassroomForm from 'pages/Faculty/Classroom/ClassroomForm'
import FacultyUpdateClassroomForm from 'pages/Faculty/Classroom/UpdateClassroomForm'
import FacultyClassroomDetails from 'pages/Faculty/Classroom/ClassroomDetails'
import Quiz from 'pages/Faculty/Quiz'
import QuizForm from 'pages/Faculty/Quiz/QuizForm'
import QuizDetail from 'pages/Faculty/Quiz/QuizDetail'
import QuizContentForm from 'pages/Faculty/Quiz/QuizDetail/QuizContentForm'

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
                                    <Route index element={<Subject />} />
                                    <Route path="create" element={<SubjectForm />} />
                                    <Route path="update/:id" element={<UpdateSubjectForm />} />
                                </Route>

                                {/* Classroom */}
                                <Route path="classroom">
                                    <Route index element={<ClassroomPage/>} />
                                    <Route path="create" element={<ClassroomForm />} />
                                    <Route path=":id" element={<ClassroomDetails />} />
                                    <Route path="update/:id" element={<ClassroomForm />} />
                                </Route>

                                {/* Faculty */}
                                <Route path="faculty">
                                    <Route index element={<FacultyIndex />} />
                                    <Route path="create" element={<FacultyForm />} />
                                    <Route path="update/:id" element={<FacultyForm />} />
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

                            <Route path="*" element={<>404</>} />
                        </Route>

                         {/* FACULTY */}
                        <Route path="faculty">
                            <Route element={<CheckRole type='FACULTY' />} >
                                {/* classroom */}
                                <Route path="classroom">
                                    <Route index element={<FacultyHomePage/>} />
                                    <Route path=":id" element={<FacultyClassroomDetails />} />
                                    <Route path="create" element={<FacultyClassroomForm />} />
                                    <Route path="update/:id" element={<FacultyUpdateClassroomForm />} />
                                </Route>

                                {/* quiz */}
                                <Route path="quiz">
                                    <Route index element={<Quiz />} />
                                    <Route path="create" element={<QuizForm />} />
                                    <Route path=":id" element={<QuizDetail/>} />
                                    <Route path=":id/questions" element={<QuizContentForm/>} />
                                </Route>
                            </Route>
                        </Route>



                    </Route>
                </Route>
        </Routes>
    )
}

export default CustomRoute;