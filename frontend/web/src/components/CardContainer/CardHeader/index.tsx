import React from 'react'

interface IProps {
    title:          string
    description:    string
}

const CardHeader: React.FC<IProps> = ({title, description}) => {

    return (
        <div className="p-4 sm:px-0">
            <h1 className="text-lg font-medium text-gray-500 leading-6"> {title} </h1>
            <p className="mt-1 text-sm text-gray-500 opacity-60">
                {description}
            </p>
        </div>
    )
}

export default CardHeader