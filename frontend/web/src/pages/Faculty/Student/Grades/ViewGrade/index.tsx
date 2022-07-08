import Card from 'components/CardContainer'
import Title from 'components/Title'
import { useEffectOnce, useIsomorphicLayoutEffect } from 'hooks'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getGradeRequest } from 'redux/grade/action'
import { getGrade } from 'redux/grade/selector'
import { GET_GRADE } from 'redux/grade/type'
import { isLoading } from 'redux/loading/selector'
import Table from './Table'

const ViewGrade = () => {

    const params    = useParams()
    const dispatch  = useDispatch()
    const grade     = useSelector(getGrade)
    const loading   = useSelector(isLoading([GET_GRADE]))

    useEffectOnce(() => {
        console.log(params)
        if(params.id && params.classroomId){
            dispatch(getGradeRequest({studentId: Number(params.id), classroomId: Number(params.classroomId)}))
        }
    })

    if(loading) {
        return <div>Loading...</div>
    }

    return(
        <div className='containerized'>
            <Title 
                name={`View Grade - ${grade?.subject?.code} - ${grade?.subject?.name} - ${grade?.school_year?.semester} Semester, ${grade?.school_year?.school_year}`}
            />
            <Table grade={grade?.grade_periods} />
        </div>
    )
}

export default ViewGrade