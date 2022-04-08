import React, { useRef, useState } from 'react'
import { DownloadIcon, PlusCircleIcon } from '@heroicons/react/solid'
import { useIsomorphicLayoutEffect } from 'hooks'
import { IDepartment } from 'interfaces'
import CardContainer from 'components/CardContainer'
import SelectInputText from 'components/SearchInputText'
import DepartmentTable from './Components/Tables'
import { Link } from 'react-router-dom'
// import SelectMenu from 'components/SelectMenu'
// import { List } from 'interfaces'

// const list = [
//     {id: 1, name:"Department of Business and Accounting"},
//     {id: 2, name:"Department of Engineering and Architecture"},
//     {id: 3, name:"Department of Computing"},
// ]

const departments = [
    {id: 1, name:"Department of Business and Accounting", description: "Accounting and Business courses", courses: ["Accounting", "Business Administrator"]},
    {id: 2, name:"Department of Engineering and Architecture", description: "Engineers and Architect courses", courses: ["Mechanical Engineer","Mechanical Engineer","Mechanical Engineer","Mechanical Engineer","Mechanical Engineer", "Architecture"]},
    {id: 3, name:"Department of Computing", description: "Technology courses" ,courses: ["Information Technology"]}
]

const DepartmentIndex = () => {
    const [search, setSearch]                           = useState<string>('')
    // const [department, setDepartment]                = useState<List>({id:0, name:'Select..'})
    const [checked, setChecked]                         = useState<boolean>(false)
    const [indeterminate, setIndeterminate]             = useState<boolean>(false)
    const [selectedDepartment, setSelectedDepartment]   = useState<IDepartment[]>([])
    const checkbox                                      = useRef<HTMLInputElement | null>(null)

    // const handleSelected = (selected: List) => {
    //     console.log(selected)
    // }

    const handleSearch = (text: string) => {
        console.log(text)
    }

    // const handleClear = () => {
    //     setDepartment({id:0, name:'Select..'});
    //     setSearch('')
    // }

    useIsomorphicLayoutEffect(() => {
        const isIndeterminate = selectedDepartment.length > 0 && selectedDepartment.length < departments.length
        setChecked(selectedDepartment.length === departments.length)
        setIndeterminate(isIndeterminate)
        if(checkbox.current){
            checkbox.current.indeterminate = isIndeterminate
        }
      }, [selectedDepartment])
    
    const toggleAll = () => {
        setSelectedDepartment(checked || indeterminate ? [] : departments)
        setChecked(!checked && !indeterminate)
        setIndeterminate(false)
    }

    return (
        <div className='containerized'>
            {/* TITLE AND BUTTONS */}
            <div className='flex align-middle'>
                <h3 className='leading-6 text-2xl mr-auto'>
                    Department
                </h3>

                <div className='ml-auto space-x-3'>
                    <Link to="/dashboard/department/create" className='button-primary'>
                        <PlusCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true"/>
                        Add Department
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
                    {/* <SelectMenu selected={department} setSelected={setDepartment} name="Departments" lists={list} take={handleSelected} className='max-w-sm'/> */}
                    {/* <div className='self-center'>
                        <button className='ml-3 text-blue-900 font-extralight' onClick={handleClear}>
                            Clear All
                        </button>
                    </div> */}

                </div>
            </CardContainer>

            {/* TABLE */}
            <DepartmentTable checkbox={checkbox} departments={departments} state={selectedDepartment} setState={setSelectedDepartment} checked={checked} toggleAll={toggleAll}/>

        </div>
    )
}

export default DepartmentIndex