import React from 'react'
import { useEffectOnce } from 'hooks'
import { useSchoolYears } from 'hooks/schoolyear'
import { useDispatch } from 'react-redux'
import { GetAllSchoolYears } from 'redux/school-year/action'
import SchoolYearTable from '../Tables'

const SchoolYearComponent = () => {


    const schoolyears = useSchoolYears()
    const dispatch = useDispatch()

    useEffectOnce(() => {
        dispatch(GetAllSchoolYears())
    })

    return (
        <>
            <div className='flex justify-between mt-10'>
                <span className='text-gray-600 leading-6 text-lg'>
                    Application School Year
                </span>

                <button className='button-primary'>
                    Add School Year
                </button>
            </div>

            <SchoolYearTable schoolyears={schoolyears.data}  />
        </>
    )
}

export default SchoolYearComponent