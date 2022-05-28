import React, { useRef, useState } from 'react'
import { DownloadIcon, PlusCircleIcon } from '@heroicons/react/solid'
import { useEffectOnce, useGetAllUsers, useIsomorphicLayoutEffect, useUpdateEffect } from 'hooks'
import { Link } from 'react-router-dom'
import { List } from 'interfaces'
import { useDispatch } from 'react-redux'
import FacultyTable from './Components/Tables'
import CardContainer from 'components/CardContainer'
import SelectInputText from 'components/SearchInputText'
import SelectMenu from 'components/SelectMenu'
import { getAllUsersRequest, searchUsersRequest } from 'redux/users/action'
import { GetAllUsersState } from 'redux/users/types'

const list = [
    {id: 1, name:"Department of Business and Accounting"},
    {id: 2, name:"Department of Engineering and Architecture"},
    {id: 3, name:"Department of Computing"},
]

const FacultyIndex = () => {
    const [search, setSearch]                           = useState<string>('')
    const [checked, setChecked]                         = useState<boolean>(false)
    const [selected, setSelected]                       = useState<List | null>(null)
    const [indeterminate, setIndeterminate]             = useState<boolean>(false)
    const [selectedFaculty, setSelectedFaculty]         = useState<GetAllUsersState["data"]>([])
    const checkbox                                      = useRef<HTMLInputElement | null>(null)
    const dispatch                                      = useDispatch()
    const users                                         = useGetAllUsers()

    const toggleAll = () => {
        setSelectedFaculty(checked || indeterminate ? [] : users.data)
        setChecked(!checked && !indeterminate)
        setIndeterminate(false)
    }

    const handleClear = () => {
        setSelectedFaculty([]);
        setSelected({id:0, name:'Select..'})
    }
    
    useIsomorphicLayoutEffect(() => {
        const isIndeterminate = selectedFaculty.length > 0 && selectedFaculty.length < users.data.length
        setChecked(selectedFaculty.length === users.data.length)
        setIndeterminate(isIndeterminate)
        if(checkbox.current){
            checkbox.current.indeterminate = isIndeterminate
        }
    }, [selectedFaculty])

    useUpdateEffect(() => {
        dispatch(searchUsersRequest({keyword: search, type: "faculty"}))
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
                    <button className='button-primary'>
                        <DownloadIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true"/>
                        Download CSV
                    </button>
                </div>
            </div>

            {/* FILTER */}
            <CardContainer margin='mt-7'>
                <div className='flex space-x-3'>
                    <SelectInputText state={search} setState={setSearch} className='max-w-sm'/>
                    <SelectMenu selected={selected} setSelected={setSelected} name="Departments" lists={list} className='max-w-sm'/>
                    <div className='self-center'>
                        <button className='ml-3 text-blue-900 text-opacity-50' onClick={handleClear}>
                            Clear
                        </button>
                    </div>

                </div>
            </CardContainer>

            {/* TABLE */}
            {
                !users.data.length &&
                <div className="w-full mt-7">
                    <div className='flex justify-center align-middle'>
                        <span> No faculty member(s) found</span>
                    </div>
                </div>

                
            }
            {
                users.data.length !== 0 &&
                <FacultyTable 
                    checkbox={checkbox}
                    users={users.data} 
                    state={selectedFaculty} 
                    setState={setSelectedFaculty} 
                    checked={checked} 
                    toggleAll={toggleAll}
                    loading={users.loading}    
                />
            }
            

        </div>
    )
}

export default FacultyIndex