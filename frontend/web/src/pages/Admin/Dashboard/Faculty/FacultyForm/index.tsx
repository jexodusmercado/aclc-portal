import React from 'react'
import CardContainer from 'components/CardContainer'
import { Link } from 'react-router-dom'

const FacultyForm = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto">
                <CardContainer>
                <div className='flex align-middle'>
                    <h3 className='leading-6 text-2xl mr-auto'>
                        Faculty
                    </h3>

                    <div className='ml-auto space-x-3'>
                        <Link to="/dashboard/faculty/create" className='bg-white font-thin text-gray-600 hover:font-medium'>
                            Back
                        </Link>

                    </div>
                </div>
                </CardContainer>    
            </div>
        </div>
    )
}

export default FacultyForm