import Badges from 'components/Badge';
import Greeting from 'components/Greeting';
import { useEffectOnce } from 'hooks';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isLoading } from 'redux/loading/selector';
import { getAllUsersRequest } from 'redux/users/action';
import { getUsers } from 'redux/users/selector';
import { GET_USER } from 'redux/users/types';
import { classNames } from 'utility';

const HomePage = () => {
    const dispatch  = useDispatch()
    const students  = useSelector(getUsers)
    const loading   = useSelector(isLoading([GET_USER]))



    useEffectOnce(() => {
        dispatch(getAllUsersRequest({type: "student"}))
    })

    if(!students || students.length < 0){

        return (
            <> no data</>
        )
    }

    return (
        <>
            <Greeting />
            <div className="hidden sm:block mt-5">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col mt-2"> 
                        <h1 className='leading-6 text-xl my-8'>Active Students</h1>
                        <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
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
                                            className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block"
                                            scope="col"
                                        >
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {students.length > 0 &&students?.map((student) => (
                                    <tr key={student.id} className="bg-white">
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
                                                <Link to={`/dashboard/classroom/${classroom.id}`} className='flex flex-col'>
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
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage;