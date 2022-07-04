import Card from 'components/CardContainer'
import Title from 'components/Title'
import React from 'react'
import Table from './Table'

const FacultyGrades = () => {
    return(
        <div className='containerized'>
           <Title name={`Grades - John Doe`} />

            <Card>
                <Table />
            </Card>

        </div>
    )
}

export default FacultyGrades