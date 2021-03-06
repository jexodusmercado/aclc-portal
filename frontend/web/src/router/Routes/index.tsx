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
import QuizContentUpdateForm from 'pages/Faculty/Quiz/QuizDetail/QuizContentUpdateForm'

import StudentQuiz from 'pages/Student/Quiz'
import StudentQuizForm from 'pages/Faculty/Quiz/QuizForm'
import StudentQuizDetail from 'pages/Faculty/Quiz/QuizDetail'
import StudentQuizContentForm from 'pages/Faculty/Quiz/QuizDetail/QuizContentForm'
import StudentQuizContentUpdateForm from 'pages/Faculty/Quiz/QuizDetail/QuizContentUpdateForm'

import FacultyStudent from 'pages/Faculty/Student'
import FacultySettings from 'pages/Faculty/Settings'
import FacultyGeneral from 'pages/Faculty/Settings/Components/General'
import FacultyGrades from 'pages/Faculty/Student/Grades'
import ViewGrade from 'pages/Faculty/Student/Grades/ViewGrade'
import UpdateClassroomForm from 'pages/Admin/Classroom/UpdateClassroomForm'
import StudentHomePage from 'pages/Student/Home'
import StudentClassroomDetails from 'pages/Student/Classroom/ClassroomDetails'
import QuizClassroom from 'pages/Student/Classroom/QuizClassroom'
import StudentAnswer from 'pages/Student/Classroom/QuizClassroom/StudentAnswer'

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
                                    <Route path="update/:id" element={<UpdateClassroomForm />} />
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
                                    <Route path="update/:id" element={<StudentForm />} />
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
                                    <Route path=":id/questions/:content/update" element={<QuizContentUpdateForm/>} />
                                </Route>
                                

                                {/* settings */}
                                <Route path="settings">
                                    <Route element={<FacultySettings />}>
                                        <Route index element={<FacultyGeneral />} />
                                    </ Route>
                                </Route>

                                <Route path="student">
                                    <Route index element={<FacultyStudent />} />
                                    <Route path=":id/profile" element={<FacultyStudent />} />
                                    <Route path=":id/grades" element={<FacultyGrades />} />
                                    <Route path=":id/grades/:classroomId/view" element={<ViewGrade />} />
                                </Route>
                            </Route>
                        </Route>

                        {/* STUDENT */}

                        <Route path="student">
                            <Route element={<CheckRole type='STUDENT' />} >
                                <Route path="classroom">
                                    <Route index element={<StudentHomePage/>} />
                                    <Route path=":id" element={<StudentClassroomDetails />} />
                                    <Route path=":id/quiz" element={<QuizClassroom />} />
                                    <Route path=":id/quiz/:quizId/answer" element={<StudentAnswer />} />
                                    <Route path="create" element={<FacultyClassroomForm />} />
                                    <Route path="update/:id" element={<FacultyUpdateClassroomForm />} />
                                </Route>
                            </Route>
                            <Route path="settings">
                                <Route element={<FacultySettings />}>
                                    <Route index element={<FacultyGeneral />} />
                                </ Route>
                            </Route>

                            <Route path="quiz">
                                <Route index element={<StudentQuiz />} />
                                <Route path="create" element={<StudentQuizForm />} />
                                <Route path=":id" element={<StudentQuizDetail/>} />
                                <Route path=":id/questions" element={<StudentQuizContentForm/>} />
                                <Route path=":id/questions/:content/update" element={<StudentQuizContentUpdateForm/>} />
                            </Route>

                        </Route>

                    </Route>
                </Route>
        </Routes>
    )
}

export default CustomRoute;