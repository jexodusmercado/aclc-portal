import { PlusCircleIcon } from '@heroicons/react/solid';
import Avatar from 'components/Avatar';
import CardContainer from 'components/CardContainer';
import DotsVerticalDropdown from 'components/DotsVerticalDropdown';
import ConfirmModal from 'components/Modals/ConfirmModal';
import SelectInputText from 'components/SearchInputText';
import { useEffectOnce, useGetAllClassroom, useUpdateEffect } from 'hooks';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch,useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteClassroom, getAllClassrooms } from 'redux/classroom/action';
import { Classroom } from 'redux/classroom/interface';
import { getClassrooms } from 'redux/classroom/selector';
import { GET_CLASSROOMS } from 'redux/classroom/types';
import { isLoading } from 'redux/loading/selector';
// import UpdateModal from './Components/UpdateModal';

const ClassroomPage = () => {
    const [search, setSearch]       = useState<string>('')
    const [open, setOpen]           = useState<boolean>(false)
    const [deleteID, setDeleteID]   = useState<string>('')
    const classrooms                = useSelector(getClassrooms)
    const dispatch                  = useDispatch()
    const navigate                  = useNavigate()
    const loading                   = useSelector(isLoading([GET_CLASSROOMS]))
    

    const testFunc = () => {
        console.log('confirmed');
    }

    const fetchData = () => {
        dispatch(getAllClassrooms({keyword: search}))
    }

    const handleDeleteModal = (classroom : Classroom) => {
        setDeleteID(classroom.id.toString())
        setOpen(true)
    }

    const onSuccess = () => {
        fetchData()
        toast.success('Deleted!')
    }

    const onDelete = () => {
        dispatch(
            deleteClassroom({
                classroomId: deleteID,
                onSuccess: onSuccess
            })
        )
        setOpen(false)
    }

    const menus = (classroom: Classroom) => ([
        {
            name: 'Update',
            onClick: () => navigate(`update/${classroom.id}`)
        },
        {
            name: 'Delete',
            onClick: () => handleDeleteModal(classroom)
        },
    ])

    useEffectOnce(() => {
        fetchData()
    })

    useUpdateEffect(() => {
        fetchData()
    },[search])

    return (
        <>
            <div className='containerized space-y-5'>
                {/* TITLE AND BUTTONS */}
                <div className='flex align-middle'>
                    <h3 className='leading-6 text-2xl mr-auto'>
                        Classroom
                    </h3>

                    <div className='ml-auto space-x-3'>
                        <Link to="/dashboard/classroom/create" className='button-primary'>
                            <PlusCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true"/>
                            Add Classroom
                        </Link>
                    </div>
                </div>

                <CardContainer>
                    <div className='flex space-x-3'>
                        <SelectInputText state={search} setState={setSearch} className='max-w-sm'/>
                        {/* <SelectMenu selected={department} setSelected={setDepartment} name="Departments" lists={list} take={handleSelected} className='max-w-sm'/> */}
                        {/* <div className='self-center'>
                            <button className='ml-3 text-blue-900 font-extralight' onClick={handleClear}>
                                Clear All
                            </button>
                        </div> */}
                    </div>
                </CardContainer>

                { loading &&
                        Array.from(Array(3).keys()).map( (k, i) => 
                            <div key={i} className={`h-32 w-full animate-pulse relative bg-slate-${(400 - (i * 100)).toString()} rounded`}>
                            </div>
                           
                        )
                }

                {
                    (!loading && !classrooms.length) &&
                    <div className='text-center'>
                        <span> No classroom found. </span>
                    </div>
                }

                {(!loading && classrooms.length) && classrooms.map((classroom, index ) => 
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
            <ConfirmModal 
                open={open} 
                setOpen={setOpen} 
                title={'Delete Classroom'} 
                phrase={'Are you sure to delete this classroom? This action is irreversible.'} 
                confirmButtonName={'Delete'}
                handleOnClick={onDelete}
            />
        </>
    )
}

export default ClassroomPage;