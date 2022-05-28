import { useRef, useState } from 'react'
import { DownloadIcon, PlusCircleIcon } from '@heroicons/react/solid'
import { useCoursesState, useEffectOnce, useIsomorphicLayoutEffect } from 'hooks'
import { GetCoursesState } from 'redux/courses/types'
import CardContainer from 'components/CardContainer'
import SelectInputText from 'components/SearchInputText'
import { Link } from 'react-router-dom'
import CourseTable from './Components/Tables'
import { useDispatch } from 'react-redux'
import { getAllCoursesRequest } from 'redux/courses/action'

const CourseIndex = () => {
    const [search, setSearch]                           = useState<string>('')
    // const [department, setDepartment]                = useState<List>({id:0, name:'Select..'})
    const [checked, setChecked]                         = useState<boolean>(false)
    const [indeterminate, setIndeterminate]             = useState<boolean>(false)
    const [selectedCourse, setSelectedCourse]           = useState<GetCoursesState['data']>([])
    const checkbox                                      = useRef<HTMLInputElement | null>(null)
    const courses                                       = useCoursesState()
    const dispatch                                      = useDispatch()

    const toggleAll = () => {
        setSelectedCourse(checked || indeterminate ? [] : courses.data)
        setChecked(!checked && !indeterminate)
        setIndeterminate(false)
    }

    useIsomorphicLayoutEffect(() => {
        const isIndeterminate = selectedCourse.length > 0 && selectedCourse.length < courses.data.length
        setChecked(selectedCourse.length === courses.data.length)
        setIndeterminate(isIndeterminate)
        if(checkbox.current){
            checkbox.current.indeterminate = isIndeterminate
        }
    }, [selectedCourse])

    useEffectOnce(() => {
        dispatch(getAllCoursesRequest())
    })


    return (
        <div className='containerized over'>
            {/* TITLE AND BUTTONS */}
            <div className='flex align-middle'>
                <h3 className='leading-6 text-2xl mr-auto'>
                    Course
                </h3>

                <div className='ml-auto space-x-3'>
                    <Link to="/dashboard/course/create" className='button-primary'>
                        <PlusCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true"/>
                        Add Course
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
                    {/* <SelectMenu selected={department} setSelected={setDepartment} name="Departments" lists={list} take={handleSelected} className='max-w-sm'/> */}
                    {/* <div className='self-center'>
                        <button className='ml-3 text-blue-900 font-extralight' onClick={handleClear}>
                            Clear All
                        </button>
                    </div> */}

                </div>
            </CardContainer>

            {/* TABLE */}
            <CourseTable checkbox={checkbox} courses={courses.data} state={selectedCourse} setState={setSelectedCourse} checked={checked} toggleAll={toggleAll}/>

        </div>
    )
}

export default CourseIndex