import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { PlusCircleIcon } from '@heroicons/react/solid'

import SubjectTable from './Components/Tables'
import CardContainer from 'components/CardContainer'
import SelectInputText from 'components/SearchInputText'
import { getAllSubjects } from 'redux/subject/action'
import { SubjectsDataState } from 'redux/subject/types'
import { useEffectOnce, useGetAllSubjects, useIsomorphicLayoutEffect, useUpdateEffect } from 'hooks'



const SubjectIndex = () => {
    const [search, setSearch]                           = useState<string>('')
    const [checked, setChecked]                         = useState<boolean>(false)
    const [indeterminate, setIndeterminate]             = useState<boolean>(false)
    const [selectedSubject, setSelectedSubject]         = useState<SubjectsDataState["data"]>([])
    const checkbox                                      = useRef<HTMLInputElement | null>(null)
    const dispatch                                      = useDispatch()
    const subjects                                      = useGetAllSubjects()
    

    const toggleAll = () => {
        setSelectedSubject(checked || indeterminate ? [] : subjects.data)
        setChecked(!checked && !indeterminate)
        setIndeterminate(false)
    }

    const handleClear = () => {
        setSelectedSubject([]);
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
                />
            }
            

        </div>
    )
}

export default SubjectIndex;