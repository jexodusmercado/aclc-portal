import Badges from 'components/Badge'
import React from 'react'
import { classNames } from 'utility'
import { Link } from 'react-router-dom'
import { ActiveSchoolYearType } from 'redux/school-year/types'
import { GetAllSchoolYears } from 'redux/school-year/action'
import { useSchoolYears } from 'hooks/schoolyear'
import { useEffectOnce } from 'hooks'
import { useDispatch } from 'react-redux'

interface Props {
    schoolyears:        ActiveSchoolYearType[]
}

const SchoolYearTable: React.FC<Props> = ({schoolyears}) => {


    return (
        <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Year
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Semester
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Active
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {schoolyears.map((schoolyear) => (
                                    <tr key={schoolyear.ID}>
                                        <td
                                            className={classNames(
                                            'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6',
                                            )}
                                        >
                                            {schoolyear.school_year}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{schoolyear.semester}</td>
                                        <td className="whitespace-nowrap py-4 pl-3 pr-4 sm:pr-6">
                                            <button
                                                type="button"
                                                className='button-selection'
                                                disabled={schoolyear.is_active}                                                
                                            > 
                                                ACTIVE
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SchoolYearTable