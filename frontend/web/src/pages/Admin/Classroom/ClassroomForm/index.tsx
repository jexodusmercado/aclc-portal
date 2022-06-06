import Card from 'components/CardContainer';
import SelectMenu from 'components/SelectMenu';
import MultipleSelectMenu from 'components/MultipleSelectMenu';
import { useEffectOnce, useUpdateEffect } from 'hooks';
import { List, ListWithAvatar } from 'interfaces';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getAllSubjects } from 'redux/subject/action';
import { usersRequest } from 'services/request';
import { useFilteredSubjects } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { createClassroom } from 'redux/classroom/action';

const formSchema = yup.object({
    title: yup.string().trim().required('*Title is required'),
    subject_id: yup.number().required('*Subject is required'),
    teacher_id: yup.number().required('*Teacher is required'),
    student_id: yup.array().of(yup.number()).required()
})

interface IForm {
    title:          string
    teacher_id:     number
    subject_id:     number
    student_id:     Array<number>
}

const ClassroomForm = () => {
    const [subject, setSubject]                 = useState<List | null>(null)
    const [teacher, setTeacher]                 = useState<List | null>(null)
    const [students, setStudents]               = useState<ListWithAvatar[]>([])
    const [teacherOptions, setTeacherOptions]   = useState<List[]>([])
    const [studentOptions, setStudentOptions]   = useState<ListWithAvatar[]>([])
    const subjects                              = useFilteredSubjects()
    const dispatch                              = useDispatch();
    const navigate                              = useNavigate();
    
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IForm>({
        mode: "onChange",
        resolver: yupResolver(formSchema)
    })

    const fetchInitialData = () => {
        dispatch(getAllSubjects({keyword:""}))
        usersRequest.getAllUsersRequest({type:"FACULTY"}).then(({data}) => {
            const filtered = data.data.rows.map((row: {id:string, first_name: string, last_name: string}) => {
                return {
                    id: row.id,
                    name: row.first_name + " " + row.last_name,
                    avatar: ""
                }
            })
            setTeacherOptions(filtered)
        });
        usersRequest.getAllUsersRequest({type:"STUDENT"}).then(({data}) => {
            const filtered = data.data.rows.map((row: {id:string, first_name: string, last_name: string}) => {
                return {
                    id: row.id,
                    name: row.first_name + " " + row.last_name,
                    avatar: ""
                }
            })
            setStudentOptions(filtered)
        })
    }

    const success = () => {
        navigate("/dashboard/classroom")
    }

    const onSubmit : SubmitHandler<IForm> = (data) => {
        // console.log(data)
        const params = {
            ...data,
            onSuccess: success
        }
        dispatch(createClassroom(params))
    }

    useEffectOnce(() => {
        fetchInitialData();
    })

    useUpdateEffect(() => {
        setValue('subject_id', subject!.id)
    },[subject])

    useUpdateEffect(() => {
        setValue('teacher_id', teacher!.id)
        console.log(teacher)
    }, [teacher])

    useUpdateEffect(() => {
        if(students.length){
            setValue('student_id', students.map(student => student.id))
        }else {
            setValue('student_id', [])
        }
    },[students])

    return (
        <div className='containerized'>

            <div className='flex justify-center'>
                <div className='flex-1 max-w-2xl'>
                    <Card className='space-y-5'>
                        <div className="mx-auto">
                            <div className='flex align-middle'>
                                <h3 className='leading-6 text-2xl mr-auto text-gray-500'>
                                    Create Classroom
                                </h3>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <div className="mt-1">
                                    <input
                                    type="text"
                                    id="title"
                                    className="input-text"
                                    placeholder="Ex. Computer Science 1"
                                    {...register('title')}
                                    />
                                </div>
                                {errors.title && <p className='text-sm text-red-400'> {errors.title.message} </p>}
                            </div>
                            <div>
                                <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                                    Subject
                                </label>
                                <div className="mt-1 flex rounded-md shadow">
                                    <SelectMenu selected={subject} setSelected={setSubject} lists={subjects} className='mt-0 pt-0'/>
                                </div>
                                {errors.subject_id && <p className='text-sm text-red-400'> {errors.subject_id.message} </p>}
                            </div>
                            <div>
                                <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                                    Teacher
                                </label>
                                <div className="mt-1 flex rounded-md shadow">
                                    <SelectMenu selected={teacher} setSelected={setTeacher} lists={teacherOptions} className='mt-0 pt-0'/>
                                </div>
                                {errors.teacher_id && <p className='text-sm text-red-400'> {errors.teacher_id.message} </p>}
                            </div>
                            <div>
                                <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                                    Students
                                </label>
                                <div className="mt-1 flex rounded-md shadow">
                                    <MultipleSelectMenu selectedAvatars={students} setSelectedAvatars={setStudents} list={studentOptions}/>
                                </div>
                                {errors.student_id && <p className='text-sm text-red-400'> {"*Students are required"} </p>}
                            </div>

                            <div className='flex border-t justify-end pt-5 space-x-3'>
                                <button type="button" className='button-secondary' onClick={() => navigate(-1)}> Back </button>
                                <button type="submit" className='button-primary'> Submit </button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>

        </div>
    )
}

export default ClassroomForm;