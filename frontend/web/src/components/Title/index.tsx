import React from 'react'

interface IProps {
    name: string
}

const Title: React.FC<IProps> = ({name}) => {
    return (
        <div className="mx-auto my-10">
            <div className='flex align-middle'>
                <h3 className='leading-6 text-2xl mr-auto text-gray-600'>
                    {name}
                </h3>
            </div>
        </div>
    )
}

export default Title