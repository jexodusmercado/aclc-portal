import { PlusCircleIcon } from '@heroicons/react/solid'
import React from 'react'
import { Link } from 'react-router-dom'

interface IProps {
    name: string
    buttonName?: string
    redirection?: string
}

const Title: React.FC<IProps> = ({name, buttonName, redirection}) => {
    return (
        <div className='flex align-middle my-8'>
            <h3 className='leading-6 text-2xl mr-auto'>
                {name}
            </h3>

            {
                (buttonName && redirection) &&
                <div className='ml-auto space-x-3'>
                    <Link to={redirection} className='button-primary'>
                        <PlusCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true"/>
                        {buttonName}
                    </Link>
                </div>
            }
            
        </div>
    )
}

export default Title