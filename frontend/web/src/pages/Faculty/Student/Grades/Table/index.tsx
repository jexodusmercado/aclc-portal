import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { Classroom } from 'redux/classroom/interface';

interface IProps {
    classrooms: Classroom[]
}

const Table: React.FC<IProps> = ({classrooms}) => {
    const params = useParams()

    if(!classrooms.length){
        return (
            <> No enrolled classrooms</>
        )
    }

    return (
        <div className="hidden sm:block mt-2">
            <div className="mx-auto px-1 sm:px-2 lg:px-4">
                <div className="flex flex-col"> 
                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th
                                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        scope="col"
                                    >
                                        Subject Code
                                    </th>
                                    <th
                                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        scope="col"
                                    >
                                        Classroom
                                    </th>
                                    <th
                                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        scope="col"
                                    >
                                        Teacher Name
                                    </th>
                                    <th
                                        className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        scope="col"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {classrooms.map((classroom) => (
                                <tr key={classroom.id} className="bg-white">
                                    <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                                        <span className="text-gray-900 font-medium">{classroom.subject.code} </span>
                                    </td>
                                    <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-900">
                                        <span className="text-gray-900 font-medium">
                                            {classroom.title}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                                        <span className="text-gray-900 font-medium">{classroom.teacher.full_name} </span>
                                    </td>
                                   
                                    <td className="px-6 py-4 whitespace-nowrap text-sm  text-right text-gray-500">
                                       <Link to={`/faculty/student/${params.id}/grades/${classroom.id}/view`}>
                                            View Grade
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