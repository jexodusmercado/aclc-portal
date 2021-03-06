import React from 'react'
import { useEffectOnce } from 'hooks'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllSchoolYears } from 'redux/school-year/action'
import SchoolYearTable from '../Tables'
import { getSchoolYears } from 'redux/school-year/selector'

const SchoolYearComponent = () => {

    const schoolyears = useSelector(getSchoolYears)
    const dispatch = useDispatch()

    useEffectOnce(() => {
        dispatch(GetAllSchoolYears())
    })

    return (
        <>
            <div className='flex justify-between mt-10'>
                <span className="text-lg leading-6 font-medium text-gray-900">
                    Application School Year
                </span>

                <button className='button-primary'>
                    Add School Year
                </button>
            </div>

            <SchoolYearTable schoolyears={schoolyears}  />
        </>
    )
}

export default SchoolYearComponent