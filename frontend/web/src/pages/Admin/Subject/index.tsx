import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ExclamationIcon, PlusCircleIcon, XIcon } from '@heroicons/react/solid'

import SubjectTable from './Components/Tables'
import CardContainer from 'components/CardContainer'
import SelectInputText from 'components/SearchInputText'
import { deleteSubject, getAllSubjects } from 'redux/subject/action'
import { SubjectsDataState } from 'redux/subject/types'
import { useEffectOnce, useGetAllSubjects, useIsomorphicLayoutEffect, useUpdateEffect } from 'hooks'
import Modal from 'components/Modal'
import { Dialog } from '@headlessui/react'
import toast from 'react-hot-toast'



const SubjectIndex = () => {
    const [search, setSearch]                           = useState<string>('')
    const [checked, setChecked]                         = useState<boolean>(false)
    const [indeterminate, setIndeterminate]             = useState<boolean>(false)
    const [selectedSubject, setSelectedSubject]         = useState<SubjectsDataState["data"]>([])
    const [isDeleteOpen, setDeleteOpen]                 = useState<boolean>(false)
    const checkbox                                      = useRef<HTMLInputElement | null>(null)
    const dispatch                                      = useDispatch()
    const subjects                                      = useGetAllSubjects()
    

    const toggleAll = () => {
        setSelectedSubject(checked || indeterminate ? [] : subjects.data)
        setChecked(!checked && !indeterminate)
        setIndeterminate(false)
    }

    const handleClear = () => {
        setSelectedSubject([])
        setSearch('')
    }

    const handleDeleteModal = () => {
        setDeleteOpen(true)
    }

    const onDeleteSuccess = () => {
        dispatch(getAllSubjects({keyword: ""}))
        setSelectedSubject([])
        setDeleteOpen(false)
        toast.success('Deleted!')
    }

    const onDeleteFailed = () => toast.error('Failed to delete subject')

    const onDelete = () => {
        console.log('deleting')

        selectedSubject.forEach((subject) => 
            dispatch(
                deleteSubject({
                    id: subject.ID.toString(),
                    onSuccess: onDeleteSuccess,
                    onFailed: onDeleteFailed
                })
            )
        )
    }
    
    useIsomorphicLayoutEffect(() => {
        const isIndeterminate = selectedSubject.length > 0 && selectedSubject.length < subjects.data.length
        setChecked(selectedSubject.length === subjects.data.length)
        setIndeterminate(isIndeterminate)
        if(checkbox.current){
            checkbox.current.indeterminate = isIndeterminate
        }
    }, [selectedSubject])

    useEffectOnce(() => {
        dispatch(getAllSubjects({keyword: ""}))
    })

    useUpdateEffect(() => {
        dispatch(getAllSubjects({keyword: search}))
    },[search])


    return (
        <>
        <div className='containerized'>
            {/* TITLE AND BUTTONS */}
            <div className='flex align-middle'>
                <h3 className='leading-6 text-2xl mr-auto'>
                    Students
                </h3>

                <div className='ml-auto space-x-3'>
                    <Link to="/dashboard/subject/create" className='button-primary'>
                        <PlusCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true"/>
                        Add Subject
                    </Link>
                </div>
            </div>

            {/* FILTER */}
            <CardContainer margin='mt-7'>
                <div className='flex space-x-3'>
                    <SelectInputText state={search} setState={setSearch} className='max-w-sm'/>
                    {/* <SelectMenu selected={selected} setSelected={setSelected} name="Courses" lists={coursesList} className='max-w-sm'/> */}
                    <div className='self-center'>
                        <button className='ml-3 text-blue-900 text-opacity-50' onClick={handleClear}>
                            Clear
                        </button>
                    </div>

                </div>
            </CardContainer>

            {/* TABLE */}
            {
                !subjects.data.length &&
                <div className="w-full mt-7">
                    <div className='flex justify-center align-middle'>
                        <span> No student(s) found</span>
                    </div>
                </div>

                
            }
            {
                subjects.data.length !== 0 &&
                <SubjectTable 
                    checkbox={checkbox}
                    state={selectedSubject} 
                    setState={setSelectedSubject} 
                    subjects={subjects.data}
                    checked={checked}
                    toggleAll={toggleAll}
                    onDelete={handleDeleteModal}
                />
            }
            

        </div>

        <Modal open={isDeleteOpen} setOpen={setDeleteOpen}>
            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => setDeleteOpen(false)}
                >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
            </div>

            <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Deactivate account
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Are you sure you want to deactivate your account? All of your data will be permanently removed
                            from our servers forever. This action cannot be undone.
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => onDelete()}
                >
                    Deactivate
                </button>
                <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setDeleteOpen(false)}
                >
                    Cancel
                </button>
            </div>
        </Modal>

        </>
    )
}

export default SubjectIndex;