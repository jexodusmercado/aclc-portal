import Avatar from 'components/Avatar'
import CardContainer from 'components/CardContainer'
import Card from 'components/CardContainer'
import DotsVerticalDropdown from 'components/DotsVerticalDropdown'
import Greeting from 'components/Greeting'
import SelectInputText from 'components/SearchInputText'
import { useEffectOnce, useGetAllClassroom, useIsomorphicLayoutEffect, useUpdateEffect } from 'hooks'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getAuthUser } from 'redux/auth/selector'
import { getByStudentId, getByTeacherId } from 'redux/classroom/action'
import { Classroom } from 'redux/classroom/interface'
import { getClassrooms } from 'redux/classroom/selector'
import { GET_ALL_CLASSROOM_STUDENT_ID_REQUEST, } from 'redux/classroom/types'
import { isLoading } from 'redux/loading/selector'

const StudentHomePage = () => {
    // const [search, setSearch]       = useState<string>('')
    const [open, setOpen]           = useState<boolean>(false)
    const [deleteID, setDeleteID]   = useState<string>('')
    
    const dispatch                  = useDispatch()
    const navigate                  = useNavigate()
    const user                      = useSelector(getAuthUser) 
    const classrooms                = useSelector(getClassrooms)
    const loading                   = useSelector(isLoading([GET_ALL_CLASSROOM_STUDENT_ID_REQUEST]))

    const fetchData = () => {
        dispatch(getByStudentId({
            studentId: user.id.toString(),
            // keyword: search
        }))
    }

    // useIsomorphicLayoutEffect(() => {
    //     fetchData()
    // },[search])
    
    useEffectOnce(() => {
        fetchData();
    })

    return (
        <div className='space-y-4'>
            {/* Header */}
            <div className='flex space-x-2'>
                <div className='flex-1'>
                    <Greeting />

                </div>
                <div className='flex'>
                    <Card>
                        <dt className="text-sm font-medium text-gray-500 truncate">Classes</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">{classrooms.length}</dd>
                    </Card>
                </div>
            </div>

            {/* Main classroom */}
            

                { loading &&
                        Array.from(Array(3).keys()).map( (k, i) => 
                            <div key={i} className={`h-32 w-full animate-pulse relative bg-slate-${(400 - (i * 100)).toString()} rounded`}>
                            </div>
                           
                        )
                }

                {(!loading && !classrooms.length) &&
                    <div className='text-center mt-10'>
                        <svg
                            className="mx-auto h-12 w-12 text-gray-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                        </svg>
                        <h2 className="mt-2 text-lg font-medium text-gray-500">No classroom found. Please reach out to the admin.</h2>
                    </div>
                }

                {!loading && classrooms.map((classroom, index ) => 
                    <CardContainer key={index} className='space-y-2 divide-y divide-gray-200' >
                            <div className='flex justify-between'>
                                <div>
                                    <Link to={`/student/classroom/${classroom.id}`}>
                                        <h1 className='text-xl text-gray-800 uppercase'>
                                            {classroom.title}
                                        </h1>
                                        <h3 className='text-gray-500 capitalize'> 
                                            {classroom.subject.name} - {classroom.subject.code} 
                                        </h3>
                                    </Link>
                                </div>
                                {/* <div className="flex top">
                                    <DotsVerticalDropdown menus={menus(classroom)} />
                                </div> */}
                            </div>

                            <div className='flex w-full items-center justify-between pt-2'>
                                <div className="inline-flex space-x-2">
                                    <Avatar height={10} width={10} name={classroom.teacher.first_name + ' ' + classroom.teacher.last_name} rounded/>
                                    <div className="flex flex-col">
                                        <span className='text-gray-800 capitalize'>{classroom.teacher.first_name + ' ' + classroom.teacher.last_name}</span>
                                        <span className="text-sm text-gray-500">Teacher</span>
                                    </div>
                                </div>

                                <h3 className='text-gray-500'> 
                                    {classroom.student?.length ?? 0} Students
                                </h3>
                            </div>
                    </CardContainer>
                )}
        </div> 
    )
}

export default StudentHomePage