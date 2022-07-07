import Badges from 'components/Badge'
import Card from 'components/CardContainer'
import SelectInputText from 'components/SearchInputText'
import Title from 'components/Title'
import { useEffectOnce, useIsomorphicLayoutEffect } from 'hooks'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { classNames } from 'react-select/dist/declarations/src/utils'
import { getAuthUser } from 'redux/auth/selector'
import { getAllStudentsByTeacherID } from 'redux/classroom/action'
import { getStudents } from 'redux/classroom/selector'
import Table from './Table'

interface IParameter {
    courseId? : string
    classroomId? : string
    keyword? : string

}

const FacultyStudent = () => {
    const dispatch                      = useDispatch()
    const user                          = useSelector(getAuthUser)
    const students                      = useSelector(getStudents)
    const [keyword, setKeyword]         = useState<string>('')
    const [classroomId, setClassroomId] = useState<string>('')
    const [courseId, setCourseId]       = useState<string>('')

    const fetchTableData = () => {
        dispatch(getAllStudentsByTeacherID({teacherId:user.id, classroomId, courseId, keyword}))
    }

    useEffectOnce(() => {
        fetchTableData()
    })

    useIsomorphicLayoutEffect(() => {
        fetchTableData()
    },[keyword])

    return(
        <div className='containerized'>
            <Title name='Students' />

            {
                students.length > 0 &&
                <Card>
                    <SelectInputText state={keyword} setState={setKeyword} className='max-w-sm'/>
                </Card>
            }
            

            <Card>
                <Table students={students}/>
            </Card>
        </div>

    )
}

export default FacultyStudent