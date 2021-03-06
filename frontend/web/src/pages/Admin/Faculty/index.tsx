import React, { useEffect, useRef, useState } from 'react'
import { DownloadIcon, PlusCircleIcon } from '@heroicons/react/solid'
import { useEffectOnce, useIsomorphicLayoutEffect, useUpdateEffect } from 'hooks'
import { Link } from 'react-router-dom'
import { SEARCH_USER } from 'redux/users/types'
import { List } from 'interfaces'
import { useDispatch, useSelector } from 'react-redux'
import FacultyTable from './Components/Tables'
import CardContainer from 'components/CardContainer'
import SelectInputText from 'components/SearchInputText'
import SelectMenu from 'components/SelectMenu'
import { deleteUserRequest, getAllUsersRequest, searchUsersRequest } from 'redux/users/action'
import ConfirmModal from 'components/Modals/ConfirmModal'
import toast from 'react-hot-toast'
import { User } from 'redux/users/interface'
import { getUsers } from 'redux/users/selector'
import { isLoading } from 'redux/loading/selector'

const list = [
    {id: 1, name:"Department of Business and Accounting"},
    {id: 2, name:"Department of Engineering and Architecture"},
    {id: 3, name:"Department of Computing"},
]

const FacultyIndex = () => {
    const dispatch                                      = useDispatch()
    const users                                         = useSelector(getUsers)
    const loading                                       = useSelector(isLoading([SEARCH_USER]))
    const checkbox                                      = useRef<HTMLInputElement | null>(null)
    const [search, setSearch]                           = useState<string>('')
    const [checked, setChecked]                         = useState<boolean>(false)
    const [selected, setSelected]                       = useState<number | string | undefined>(undefined)
    const [indeterminate, setIndeterminate]             = useState<boolean>(false)
    const [selectedFaculty, setSelectedFaculty]         = useState<User[]>([])
    const [isDelete, setDelete]                         = useState<boolean>(false)

    const fetchingData = () => {
        dispatch(searchUsersRequest({keyword: search, type: "faculty"}))
    }
        
    const toggleAll = () => {
        setSelectedFaculty(checked || indeterminate ? [] : users)
        setChecked(!checked && !indeterminate)
        setIndeterminate(false)
    }

    const handleClear = () => {
        setSelectedFaculty([]);
        setSelected(undefined)
    }

    const handleDeleteModal = () => {
        setDelete(true)
    }

    const onDeleteSuccess = () => {
        setSelectedFaculty([])
        fetchingData()
        toast.success('Deleted!')
        setDelete(false)
    }
    
    const handleDelete = () => {

        const select = selectedFaculty.map(faculty => faculty.id.toString())
        
        dispatch(
            deleteUserRequest({
                ids: select,
                onSuccess: onDeleteSuccess
            })
        )
    }
    
    useIsomorphicLayoutEffect(() => {
        const isIndeterminate = selectedFaculty.length > 0 && selectedFaculty.length < users.length
        setChecked(selectedFaculty.length === users.length)
        setIndeterminate(isIndeterminate)
        if(checkbox.current){
            checkbox.current.indeterminate = isIndeterminate
        }
    }, [selectedFaculty])

    useUpdateEffect(() => {
        fetchingData()
    },[search])

    useEffectOnce(() => {
        dispatch(getAllUsersRequest({type: "faculty"}))
    })

    return (
        <div className='containerized'>
            {/* TITLE AND BUTTONS */}
            <div className='flex align-middle'>
                <h3 className='leading-6 text-2xl mr-auto'>
                    Faculty
                </h3>

                <div className='ml-auto space-x-3'>
                    <Link to="/dashboard/faculty/create" className='button-primary'>
                        <PlusCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true"/>
                        Add Faculty
                    </Link>
                </div>
            </div>

            {/* FILTER */}
            <CardContainer margin='mt-7'>
                <div className='flex space-x-3'>
                    <SelectInputText state={search} setState={setSearch} className='max-w-sm'/>
                    <SelectMenu selected={selected} setSelected={setSelected} selectName="Departments" lists={list} className='max-w-sm'/>
                    <div className='self-center'>
                        <button className='ml-3 text-blue-900 text-opacity-50' onClick={handleClear}>
                            Clear
                        </button>
                    </div>

                </div>
            </CardContainer>

            {/* TABLE */}
                <FacultyTable 
                    checkbox={checkbox}
                    users={users} 
                    state={selectedFaculty} 
                    setState={setSelectedFaculty} 
                    checked={checked} 
                    toggleAll={toggleAll}
                    onDelete={handleDeleteModal}
                    loading={loading}    
                />
            
            <ConfirmModal 
                setOpen={setDelete} 
                open={isDelete} 
                title={'Delete'}
                phrase={'Are you sure to delete this?'}
                confirmButtonName={'Delete'}
                handleOnClick={handleDelete}
            />
        </div>
    )
}

export default FacultyIndex