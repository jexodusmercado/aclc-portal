import Card from 'components/CardContainer'
import Title from 'components/Title'
import { useEffectOnce } from 'hooks'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllStudentsByTeacherID, getByStudentId } from 'redux/classroom/action'
import { getClassrooms } from 'redux/classroom/selector'
import Table from './Table'

const FacultyGrades = () => {

    const params        = useParams()
    const dispatch      = useDispatch()
    const classrooms    = useSelector(getClassrooms)

    useEffectOnce(() => {
        if(params.id){
            dispatch(
                getByStudentId({studentId: params.id})
            )
        }
    })

    return(
        <div className='containerized'>
           <Title name={`Grades - John Doe`} />

            <Card>
                <Table classrooms={classrooms}/>
            </Card>

        </div>
    )
}

export default FacultyGrades