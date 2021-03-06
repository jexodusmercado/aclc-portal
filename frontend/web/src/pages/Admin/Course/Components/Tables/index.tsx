import React from 'react'
import { classNames } from 'utility'
import { Link } from 'react-router-dom'
import { GetCoursesState } from 'redux/courses/types'

interface Props {
    checked:            boolean
    state:              GetCoursesState['data']
    courses:            GetCoursesState['data']
    setState:           React.Dispatch<React.SetStateAction<GetCoursesState['data']>>
    checkbox:           React.MutableRefObject<HTMLInputElement | null>
    toggleAll:          () => void
}

const CourseTable: React.FC<Props> = ({state, setState, courses, checkbox, checked, toggleAll}) => {

    return (
        <div className="mt-5 w-full sm:px-6 ">
        <div className="flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-2">
                    <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    {state.length > 0 && (
                        <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-300 sm:left-16">
                        <button
                            type="button"
                            className="button-primary bg-gray-200 text-gray-600"
                        >
                            Bulk edit
                        </button>
                        <button
                            type="button"
                            className="button-primary bg-red-700"
                        >
                            Delete all
                        </button>
                        </div>
                    )}
                        <table className="min-w-full table-fixed divide-y divide-gray-300">
                            <thead className="bg-gray-300">
                                <tr>
                                    <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
                                        <input
                                            type="checkbox"
                                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 sm:left-6"
                                            ref={checkbox}
                                            checked={checked}
                                            onChange={toggleAll}
                                        />
                                    </th>
                                    <th scope="col" className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Description
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Status
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="border-transparent divide-y divide-gray-200 bg-white">
                                {courses.map((course) => (
                                    <tr key={course.ID} className={state.includes(course) ? 'bg-gray-50' : undefined}>
                                        <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                                            {state.includes(course) && (
                                                <div className="absolute inset-y-0 left-0 w-0.5 bg-blue-600" />
                                            )}
                                            <input
                                            type="checkbox"
                                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 sm:left-6"
                                            value={course.ID}
                                            checked={state.includes(course)}
                                            onChange={(e) =>
                                                setState(
                                                e.target.checked
                                                    ? [...state, course]
                                                    : state.filter((p) => p !== course)
                                                )
                                            }
                                            />
                                        </td>
                                        <td
                                            className={classNames(
                                            'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                                            state.includes(course) ? 'text-blue-600' : 'text-gray-900'
                                            )}
                                        >
                                            {course.name}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{course.description}</td>
                                        <td className="whitespace-pre-wrap px-3 py-4 text-sm space-x-1 space-y-1 text-gray-500">
                                            {course.is_active ? 'Active' : 'Inactive'}
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <Link to="/dashboard/course" className="text-blue-600 hover:text-blue-900">
                                                Edit<span className="sr-only">, {course.name}</span>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default CourseTable