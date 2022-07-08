import Card from 'components/CardContainer'
import Title from 'components/Title'
import { useEffectOnce } from 'hooks'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllStudentsByTeacherID, getByStudentId } from 'redux/classroom/action'
import { getClassrooms } from 'redux/classroom/selector'
import { getUserRequest } from 'redux/users/action'
import { getUser } from 'redux/users/selector'
import Table from './Table'

const FacultyGrades = () => {

    const params        = useParams()
    const dispatch      = useDispatch()
    const classrooms    = useSelector(getClassrooms)
    const user          = useSelector(getUser)

    useEffectOnce(() => {
        if(params.id){
            dispatch(
                getByStudentId({studentId: params.id})
            )

            dispatch(
                getUserRequest({id: params.id})
            )
        }
    })

    return(
        <div className='containerized'>
           <Title name={`Grades - ${user.full_name}`} />

            <Card>
                <Table classrooms={classrooms}/>
            </Card>

        </div>
    )
}

export default FacultyGrades