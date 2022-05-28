import Card from 'components/CardContainer';
import SelectMenu from 'components/SelectMenu';
import MultipleSelectMenu from 'components/MultipleSelectMenu';
import { useEffectOnce } from 'hooks';
import { List, ListWithAvatar } from 'interfaces';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getAllSubjects } from 'redux/subject/action';
import { usersRequest } from 'services/request';


const ClassroomForm = () => {
    const [subject, setSubject]   = useState<List | null>(null)
    const [teacher, setTeacher]   = useState<List | null>(null)
    const [students, setStudents]   = useState<ListWithAvatar[]>([])
    const [teacherOptions, setTeacherOptions]   = useState<List[]>([])
    const [studentOptions, setStudentOptions]   = useState<ListWithAvatar[]>([])
    const dispatch = useDispatch();

    const fetchInitialData = () => {
        dispatch(getAllSubjects({keyword:""}))
        usersRequest.getAllUsersRequest({type:"FACULTY"}).then(({data}) => {
            const filtered = data.data.rows.map((row: {id:string, first_name: string, last_name: string}) => {
                return {
                    value: row.id,
                    name: row.first_name + " " + row.last_name,
                    avatar: ""
                }
            })
            console.log(filtered)
            setTeacherOptions(filtered)
        });
        usersRequest.getAllUsersRequest({type:"STUDENT"}).then(({data}) => {
            const filtered = data.data.rows.map((row: {id:string, first_name: string, last_name: string}) => {
                return {
                    value: row.id,
                    name: row.first_name + " " + row.last_name,
                    avatar: ""
                }
            })
            console.log(filtered)
            setStudentOptions(filtered)
        })
    }

    useEffectOnce(() => {
        fetchInitialData();
    })

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
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <div className="mt-1">
                                <input
                                type="text"
                                name="name"
                                id="name"
                                className="input-text"
                                placeholder="Computer Science 1"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                                Subject
                            </label>
                            <div className="mt-1 flex rounded-md shadow">
                                <SelectMenu selected={subject} setSelected={setSubject} lists={[]} className='mt-0 pt-0'/>
                            </div>
                            {/* {errors.schoolyear_id && <p className='text-sm text-red-400'> {errors.schoolyear_id.message} </p>} */}
                        </div>
                        <div>
                            <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                                Teacher
                            </label>
                            <div className="mt-1 flex rounded-md shadow">
                                <SelectMenu selected={teacher} setSelected={setTeacher} lists={teacherOptions} className='mt-0 pt-0'/>
                            </div>
                            {/* {errors.schoolyear_id && <p className='text-sm text-red-400'> {errors.schoolyear_id.message} </p>} */}
                        </div>
                        <div>
                            <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                                Students
                            </label>
                            <div className="mt-1 flex rounded-md shadow">
                                <MultipleSelectMenu selectedAvatars={students} setSelectedAvatars={setStudents} list={studentOptions}/>
                                {/* <SelectMenu selected={subject} setSelected={setSubject} lists={[]} className='mt-0 pt-0'/> */}
                            </div>
                            {/* {errors.schoolyear_id && <p className='text-sm text-red-400'> {errors.schoolyear_id.message} </p>} */}
                        </div>

                        <div className='flex border-t justify-end pt-5 space-x-3'>
                            <button className='button-secondary'> Back </button>
                            <button className='button-primary'> Submit </button>
                        </div>

                    </Card>
                </div>
            </div>

        </div>
    )
}

export default ClassroomForm;