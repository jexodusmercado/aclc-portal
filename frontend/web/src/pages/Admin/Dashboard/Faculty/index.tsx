import React, { useRef, useState } from 'react'
import { DownloadIcon, PlusCircleIcon } from '@heroicons/react/solid'
import { useIsomorphicLayoutEffect } from 'hooks'
import { IFaculty } from 'interfaces'
import CardContainer from 'components/CardContainer'
import SelectInputText from 'components/SearchInputText'
import DepartmentTable from './Components/Tables'
import { Link } from 'react-router-dom'
import SelectMenu from 'components/SelectMenu'
import { List } from 'interfaces'

const list = [
    {id: 1, name:"Department of Business and Accounting"},
    {id: 2, name:"Department of Engineering and Architecture"},
    {id: 3, name:"Department of Computing"},
]

const FacultyPeople = [
    {id: 1,  firstName: "John", lastName: "Doe", Subject:["Accounting", "Business Administrator"], Classes: 5},
    {id: 2,  firstName: "Jane", lastName: "Doe", Subject:["Java", "C++"], Classes: 2},
]

const FacultyIndex = () => {
    const [search, setSearch]                           = useState<string>('')
    const [checked, setChecked]                         = useState<boolean>(false)
    const [selected, setSelected]                       = useState<List>({id:0, name:'Select..'})
    const [indeterminate, setIndeterminate]             = useState<boolean>(false)
    const [selectedFaculty, setSelectedFaculty]         = useState<IFaculty[]>([])
    const checkbox                                      = useRef<HTMLInputElement | null>(null)


    const handleSearch = (text: string) => {
        console.log(text)
    }


    useIsomorphicLayoutEffect(() => {
        const isIndeterminate = selectedFaculty.length > 0 && selectedFaculty.length < FacultyPeople.length
        setChecked(selectedFaculty.length === FacultyPeople.length)
        setIndeterminate(isIndeterminate)
        if(checkbox.current){
            checkbox.current.indeterminate = isIndeterminate
        }
      }, [selectedFaculty])
    
    const toggleAll = () => {
        setSelectedFaculty(checked || indeterminate ? [] : FacultyPeople)
        setChecked(!checked && !indeterminate)
        setIndeterminate(false)
    }

    const handleClear = () => {
        setSelectedFaculty([]);
        setSelected({id:0, name:'Select..'})
    }
    

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
            <CardContainer className='mt-7'>
                <div className='flex space-x-3'>
                    <SelectInputText state={search} setState={setSearch} onChange={handleSearch} className='max-w-sm'/>
                    <SelectMenu selected={selected} setSelected={setSelected} name="Departments" lists={list} className='max-w-sm'/>
                    <div className='self-center'>
                        <button className='ml-3 text-blue-900 font-extralight' onClick={handleClear}>
                            Clear All
                        </button>
                    </div>

                </div>
            </CardContainer>

            {/* TABLE */}
            <DepartmentTable checkbox={checkbox} departments={FacultyPeople} state={selectedFaculty} setState={setSelectedFaculty} checked={checked} toggleAll={toggleAll}/>

        </div>
    )
}

export default FacultyIndex