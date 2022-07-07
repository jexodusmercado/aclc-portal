// import Badges from 'components/Badge'
import React from 'react'
import { classNames, timeConvertFormat } from 'utility'
import { Link, useNavigate } from 'react-router-dom'
import { QuizData } from 'redux/quiz/interfaces'

interface Props {
    checked:            boolean
    state:              any
    quizzes:            QuizData[]
    setState:           React.Dispatch<React.SetStateAction<any[]>>
    checkbox:           React.MutableRefObject<HTMLInputElement | null>
    toggleAll:          () => void
    onDelete:           () => void
    loading:            boolean
}

const QuizTable: React.FC<Props> = ({state, setState, quizzes, checkbox, checked, toggleAll, loading, onDelete}) => {
    const navigate = useNavigate();

    if(!quizzes.length) {
        return (
            <div className="w-full mt-7">
                <div className='flex justify-center align-middle'>
                    <span> No quizzes found</span>
                </div>
            </div>
        )
    }
    
    return (
    <div className="mt-5 w-full sm:px-6 ">
        <div className="flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-2">
                    <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded">
                    {state.length > 0 && (
                        <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-200 sm:left-16">
                        {/* <button
                            type="button"
                            className="button-primary bg-gray-100 hover:bg-gray-300 text-gray-600"
                        >
                            Bulk edit
                        </button> */}
                        <button
                            type="button"
                            className="button-primary px-2 bg-red-500 hover:bg-red-700"
                            onClick={onDelete}
                        >
                            Delete
                        </button>
                        </div>
                    )}
                        <table className="min-w-full table-fixed divide-y divide-gray-300">
                            <thead className="bg-gray-200">
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
                                    <th scope="col" className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                                        ID
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Clasroom
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Grade Period
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Due Date
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Publish
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="border-transparent divide-y divide-gray-200 bg-white">
                                { loading &&
                                    Array.from(Array(5).keys()).map( k => 
                                        <tr className='space-x-4 h-10' key={k}>
                                            <td className='animate-pulse relative w-12 px-6 sm:w-16 sm:px-8'>
                                                <div className="absolute left-4 sm:left-6 top-1/2 -mt-2 h-4 w-4 bg-slate-400 rounded" />
                                            </td>
                                            <td className='animate-pulse animation-delay-100 whitespace-pre-wrap px-3 py-4 space-x-1 space-y-1 '>
                                                <div className="h-4 w-20 shadow bg-slate-400 rounded" />
                                            </td>
                                            <td className='animate-pulse animation-delay-150 whitespace-pre-wrap px-3 py-4 space-x-1 space-y-1 '>
                                                <div className="h-4 w-20 bg-slate-400 rounded" />
                                            </td>
                                            <td className='animate-pulse animation-delay-200 whitespace-pre-wrap px-3 py-4 space-x-1 space-y-1 '>
                                                <div className="h-4 w-20 bg-slate-400 rounded" />
                                            </td>
                                            <td className='animate-pulse animation-delay-250 whitespace-pre-wrap px-3 py-4 space-x-1 space-y-1 '>
                                                <div className="h-4 w-20 bg-slate-400 rounded" />
                                            </td>
                                        </tr>
                                    )
                                }
                                { !loading && quizzes.map((quiz) => (
                                    <tr 
                                        // onClick={(e) => {
                                        //     e.stopPropagation()
                                        //     e.nativeEvent.stopPropagation()
                                        //     navigate(`/faculty/quiz/${quiz.id}`)
                                        // }}
                                        key={quiz.id}
                                        className={classNames(state.includes(quiz.id) ? 'bg-gray-50' : '')}
                                    >
                                        <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                                            {state.includes(quiz.id) && (
                                                <div className="absolute inset-y-0 left-0 w-0.5 bg-blue-600" />
                                            )}
                                            <input
                                            type="checkbox"
                                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 z-20 focus:ring-blue-500 sm:left-6"
                                            value={quiz.id}
                                            checked={state.includes(quiz.id)}
                                            onChange={(e) => {
                                                setState(
                                                e.currentTarget.checked
                                                    ? [...state, quiz.id]
                                                    : state.filter((p: any) => p !== quiz.id)
                                                )
                                            }}
                                            />
                                        </td>
                                        <td
                                            className={
                                                classNames(
                                                    'whitespace-pre-wrap py-4 pr-3 text-sm font-medium',
                                                    state.includes(quiz.id) ? 'text-blue-600' : 'text-gray-900'
                                                )
                                            }
                                        >
                                            {quiz?.id}
                                        </td>
                                        {/* <td className="whitespace-pre-wrap px-3 py-4 text-sm space-x-1 space-y-1 text-gray-500">
                                            {user.Subject.length && user.Subject.map((sub, subIdx) => 
                                                <Badges text={sub} key={subIdx} />)
                                            }
                                        </td> */}
                                       
                                        <td className="whitespace-pre-wrap px-3 py-4 text-sm space-x-1 space-y-1 text-blue-500">
                                            <Link to={`/faculty/quiz/${quiz.id}`}>
                                                {quiz?.classroom?.title}
                                            </Link>
                                        </td>
                                        <td className="whitespace-pre-wrap px-3 py-4 text-sm space-x-1 space-y-1 text-gray-500">
                                            {quiz?.grade_period}
                                        </td>
                                        <td className="whitespace-pre-wrap px-3 py-4 text-sm space-x-1 space-y-1 text-gray-500">
                                           {timeConvertFormat(quiz?.end_date)}
                                        </td>
                                        <td className="whitespace-pre-wrap px-3 py-4 text-sm space-x-1 space-y-1 text-gray-500">
                                           {quiz?.is_published ? 'Published' : 'Draft'}
                                        </td>
                                        
                                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <Link to={`/faculty/quiz/${quiz?.id}`} className="text-blue-600 hover:text-blue-900">
                                                Edit<span className="sr-only">, {quiz?.classroom?.title}</span>
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

export default QuizTable