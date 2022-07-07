import Badges from 'components/Badge';
import React from 'react'
import { Link } from 'react-router-dom';
import { classNames } from 'utility';
import { Student } from 'redux/classroom/interface';

interface IProps {
    students: Student[]
}

const Table: React.FC<IProps> = ({students}) => {

    if(!students.length) {
        return(
            <div className='text-center'> No data found </div>
        )
    }

    return (
        <div className="hidden sm:block mt-2">
            <div className="max-w-7xl mx-auto px-1 sm:px-2 lg:px-4">
                <div className="flex flex-col"> 
                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th
                                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        scope="col"
                                    >
                                        Student ID
                                    </th>
                                    <th
                                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        scope="col"
                                    >
                                        Name
                                    </th>
                                    <th
                                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        scope="col"
                                    >
                                        Contact
                                    </th>
                                    <th
                                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        scope="col"
                                    >
                                        Course
                                    </th>
                                    <th
                                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        scope="col"
                                    >
                                        Classes
                                    </th>
                                    <th
                                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        scope="col"
                                    >
                                        Status
                                    </th>
                                    <th
                                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        scope="col"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {students.map((student) => (
                                <tr key={student.id} className="bg-white">
                                    <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                                        <span className="text-gray-900 font-medium">{student?.username} </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <div className="flex">
                                            <p className="text-gray-500 truncate group-hover:text-gray-900">
                                                {student?.first_name + ' ' + student?.last_name}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                                        <span className="text-gray-900 font-medium">{student?.phone} </span>
                                    </td>
                                    <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                                        {student?.course?.description}
                                    </td>
                                    <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                                        {student?.classroom && student?.classroom.map((classroom, index) => 
                                            <Link to={`/faculty/classroom/${classroom.id}`} className='flex flex-col'>
                                                <Badges key={index} text={classroom.title}/>
                                            </Link>
                                        )}
                                        {
                                            !student.classroom &&
                                            <>
                                                N/A
                                            </>
                                        }
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span
                                            className={classNames(
                                            student?.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800',
                                            'inline-flex items-center px-2.5 py-2 rounded-full text-xs font-medium capitalize'
                                            )}
                                        >
                                            {student?.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                       <Link to={`/faculty/student/${student.id}/grades`}>
                                            View Grades
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
    )
}

export default Table;