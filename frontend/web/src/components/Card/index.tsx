import { MailIcon, CheckCircleIcon } from '@heroicons/react/solid'
import React from 'react'
import { classNames } from 'utility'

interface Props {
    headerText: string
    descriptionText: string
    headerClass?: string
    descriptionClass?: string
    createButton?: boolean
    buttonText?: string
    onClick? : () => void
    users: {
        applicant: {
            name: string
            email: string
            imageUrl: string
        },
        date: string
        dateFull: string
        stage: string
        href: string
    }[]
}

const Card: React.FC<Props> = ({headerText, descriptionText, headerClass, descriptionClass, createButton, buttonText, onClick, users}) => {
    return(
        <div className="bg-white px-4 py-5 border shadow-sm rounded-md border-gray-100 sm:px-6">
            <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
                <div className="ml-4 mt-4">
                    <h3 className={classNames(headerClass ? headerClass : "", "text-2xl leading-6 font-medium text-gray-900")}>
                        {headerText}
                    </h3>
                    <p className={classNames(descriptionClass ? descriptionClass : "", "mt-1 text-sm text-gray-500")}>
                        {descriptionText}
                    </p>
                </div>
                {
                    createButton &&
                    <div className="ml-4 mt-4 flex-shrink-0">
                        <button
                            type="button"
                            onClick={onClick}
                            className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {buttonText}
                        </button>
                    </div>
                }
            </div>

            <div className="bg-white overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {users.map((user) => (
                    <li key={user.applicant.email}>
                        <a href={user.href} className="block hover:bg-gray-50">
                            <div className="flex items-center px-4 py-4 sm:px-6">
                                <div className="min-w-0 flex-1 flex items-center">
                                    <div className="flex-shrink-0">
                                        <img className="h-12 w-12 rounded-full" src={user.applicant.imageUrl} alt="" />
                                    </div>
                                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-indigo-600 truncate">{user.applicant.name}</p>
                                            <p className="mt-2 flex items-center text-sm text-gray-500">
                                                <MailIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                <span className="truncate">{user.applicant.email}</span>
                                            </p>
                                        </div>
                                        <div className="hidden md:block">
                                            <div>
                                                <p className="text-sm text-gray-900">
                                                Applied on <time dateTime={user.date}>{user.dateFull}</time>
                                                </p>
                                                <p className="mt-2 flex items-center text-sm text-gray-500">
                                                <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />
                                                {user.stage}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>
                    ))}
                    {
                        users.length > 1 && 
                        <li className='my-3'>
                            <button className="w-full items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0">
                                VIEW ALL
                            </button>
                        </li>
                    }
                </ul>
            </div>
        </div>
    )
}

export default Card