import { OfficeBuildingIcon } from '@heroicons/react/solid'
import Avatar from 'components/Avatar'
import Card from 'components/CardContainer'
import { useUserData } from 'hooks'
import React from 'react'
import { greetingTime, timeConvertFormat } from 'utility'

const Greeting = () => {
    const user = useUserData()
    
    return (
        <Card>
            <div className="flex-1 min-w-0">
                {/* Profile */}
                <div className="flex items-center">
                    <Avatar
                        name={user.first_name + ' ' + user.last_name}
                        avatar={user.image}
                        height={16}
                        width={16}
                        rounded
                    />
                    <div>
                        <div className="flex items-center">
                            <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                            {greetingTime()}, {user.first_name} {user.last_name}
                            </h1>
                        </div>
                        <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                            <dt className="sr-only">Company</dt>
                            <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                            <OfficeBuildingIcon
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                                Member since {timeConvertFormat(user.created_at)}
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </Card> 
    )
}

export default Greeting