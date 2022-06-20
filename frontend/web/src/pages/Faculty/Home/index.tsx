import { PlusCircleIcon } from '@heroicons/react/solid'
import Avatar from 'components/Avatar'
import CardContainer from 'components/CardContainer'
import Card from 'components/CardContainer'
import DotsVerticalDropdown from 'components/DotsVerticalDropdown'
import Greeting from 'components/Greeting'
import ConfirmModal from 'components/Modals/ConfirmModal'
import SelectInputText from 'components/SearchInputText'
import { useEffectOnce, useGetAllClassroom, useUpdateEffect, useUserData } from 'hooks'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteClassroom, getByTeacherId } from 'redux/classroom/action'
import { ClassroomData } from 'redux/classroom/types'

const FacultyHomePage = () => {
    const [search, setSearch]       = useState<string>('')
    const [open, setOpen]           = useState<boolean>(false)
    const [deleteID, setDeleteID]   = useState<string>('')

    const dispatch                  = useDispatch()
    const navigate                  = useNavigate()
    const user                      = useUserData() 
    const classrooms                = useGetAllClassroom()  

    const fetchData = () => {
        dispatch(getByTeacherId({
            teacherId: user.id.toString(),
            keyword: search
        }))
    }

    const handleDeleteModal = (classroom : ClassroomData) => {
        setDeleteID(classroom.id.toString())
        setOpen(true)
    }

    // const onSuccess = () => {
    //     fetchData()
    //     toast.success('Deleted!')
    // }

    // const onDelete = () => {
    //     dispatch(
    //         deleteClassroom({
    //             classroomId: deleteID,
    //             onSuccess: onSuccess
    //         })
    //     )
    //     setOpen(false)
    // }

    const menus = (classroom: ClassroomData) => ([
        {
            name: 'Update',
            onClick: () => navigate(`update/${classroom.id}`)
        },
        // {
        //     name: 'Delete',
        //     onClick: () => handleDeleteModal(classroom)
        // },
    ])


    useUpdateEffect(() => {
        fetchData()
    },[search])
    
    useEffectOnce(() => {
        dispatch(
            getByTeacherId({
                teacherId: user.id.toString(),
                keyword: ""
            })
        )   
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
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">{classrooms.data.length}</dd>
                    </Card>
                </div>
                <div className='flex'>
                    <Card>
                        <dt className="text-sm font-medium text-gray-500 truncate">Students</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">{classrooms.data.reduce((acc, curr) => acc + curr.totalStudents, 0)}</dd>
                    </Card>
                </div>
            </div>

            {/* Main classroom */}
            
            <CardContainer>
                    <div className='flex space-x-3 justify-between items-center'>
                        <SelectInputText state={search} setState={setSearch} className='max-w-sm'/>
                        {/* <SelectMenu selected={department} setSelected={setDepartment} name="Departments" lists={list} take={handleSelected} className='max-w-sm'/> */}
                        {/* <div className='self-center'>
                            <button className='ml-3 text-blue-900 font-extralight' onClick={handleClear}>
                                Clear All
                            </button>
                        </div> */}
                        <div className='space-x-3'>
                            <Link to="/faculty/classroom/create" className='button-primary'>
                                <PlusCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true"/>
                                Add Classroom
                            </Link>
                    </div>
                    </div>
                </CardContainer>

                { classrooms.loading &&
                        Array.from(Array(3).keys()).map( (k, i) => 
                            <div key={i} className={`h-32 w-full animate-pulse relative bg-slate-${(400 - (i * 100)).toString()} rounded`}>
                            </div>
                           
                        )
                }

                {(!classrooms.loading && !classrooms.data.length) &&
                    <div className='text-center'>
                        <span> No classroom found. </span>
                    </div>
                }

                {!classrooms.loading && classrooms.data.map((classroom, index ) => 
                    <CardContainer key={index} className='space-y-2 divide-y divide-gray-200' >
                            <div className='flex justify-between'>
                                <div>
                                    <Link to={`/dashboard/classroom/${classroom.id}`}>
                                        <h1 className='text-xl text-gray-800 uppercase'>
                                            {classroom.title}
                                        </h1>
                                        <h3 className='text-gray-500 capitalize'> 
                                            {classroom.subject.name} - {classroom.subject.code} 
                                        </h3>
                                    </Link>
                                </div>
                                <div className="flex top">
                                    <DotsVerticalDropdown menus={menus(classroom)} />
                                </div>
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

export default FacultyHomePage