import React from 'react'

interface Props {
    className?: string
}

const Card: React.FC<Props> = ({children, className}) => {
    return(
        <div className={`bg-white px-3 py-3 border shadow rounded-md border-gray-100 sm:px-6 ${className}`}>
            {children}
        </div>
    )
}

export default Card