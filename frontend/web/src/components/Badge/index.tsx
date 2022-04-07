import React from 'react'

interface Props {
    text: string
}

const Badges: React.FC<Props> = ({text}) => {
    return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
            <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-blue-800" fill="currentColor" viewBox="0 0 8 8">
                <circle cx={4} cy={4} r={3} />
            </svg>
            {text}
        </span>
    )

}

export default Badges