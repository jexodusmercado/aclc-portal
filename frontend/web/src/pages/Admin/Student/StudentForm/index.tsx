import React, { useState } from 'react'
import CardContainer from 'components/CardContainer'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import SelectMenu from 'components/SelectMenu'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { classNames } from 'utility'
import { useCoursesState, useEffectOnce, useIsomorphicLayoutEffect, useUpdateEffect, useUserCreated } from 'hooks'
import { useDispatch } from 'react-redux'
import { createUserRequest } from 'redux/users/action'
import 'react-datepicker/dist/react-datepicker.css'
import { List } from 'interfaces'
import { getAllCoursesRequest } from 'redux/courses/action'
import { GetActiveSchoolYear, GetAllSchoolYears } from 'redux/school-year/action'
import { useActiveSchoolYear, useSchoolYears } from 'hooks/schoolyear'
import toast from 'react-hot-toast'
import dayjs from 'dayjs'

interface IForm {
    username        : string
    first_name      : string
    last_name       : string
    birthday        : Date | null
    email           : string
    type            : string
    letter_type     : string
    course_id       : number
    phone           : string
    schoolyear_id   : number
}

const facultySchema = yup.object({
    username        : yup.string().trim().required('*Username is required'),
    first_name      : yup.string().trim().required('*First name is required'),
    last_name       : yup.string().trim().required('*First name is required'),
    birthday        : yup.date().required('*Birthday is required'),
    email           : yup.string().trim().email('*Input correct email format'),
    course_id       : yup.number().required('*Course is required'),
    phone           : yup.string().required('*Phone number is required'),
    schoolyear_id   : yup.number().required('*School Year is required')
}).required()

const StudentForm = () => {
    const navigate                      = useNavigate()
    const dispatch                      = useDispatch()
    const createdState                  = useUserCreated()
    const courses                       = useCoursesState()
    const schoolyears                   = useSchoolYears()
    const activeSchoolyear              = useActiveSchoolYear()
    const [selected, setSelected]       = useState<number | undefined>(undefined)
    const [schoolYear, setSchoolYear]   = useState<number | undefined>(undefined)
    const [startDate, setStartDate]     = useState<Date | null>(null)
    const [coursesList, setCoursesList] = useState<List[]>([])
    const [yearList, setYearList]       = useState<List[]>([])
    const [picture, setPicture]         = useState<File>()



    const cancelForm = () => navigate('/dashboard/faculty');

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IForm>({
        mode: "onChange",
        resolver: yupResolver(facultySchema)
    });

    // const onSubmit: SubmitHandler<FormData> = (data) => {
    //     data.type           = "student"
    //     data.letter_type    = "s"

    //     dispatch(createUserRequest(data))
    // }

    const onSubmit: SubmitHandler<IForm> = (data) => {
        const fd = new FormData()

        for( var key in data) {
            fd.append(key, (data as any)[key])
        }
        
        fd.set('type', 'student')

        fd.set('birthday', dayjs(data.birthday).format("YYYY-MM-DD"))

        if(picture){
            fd.append('file', picture)
        }

        dispatch(createUserRequest({type:'student', letter_type:'s', formData: fd}))
    }

    const handleAttachement = (e: React.ChangeEvent<HTMLInputElement>) => {

        if(e.target.files?.length){
            if(e.target.files[0].type.split('/')[0] !== 'image') {
                setPicture(undefined)
                toast.error('File type is not supported.')
                return
            }
            setPicture(e.target.files[0])
        }
    }

    useUpdateEffect(() => {
        setValue('birthday', startDate)
    },[startDate])

    useUpdateEffect(() => {
        if(selected) {
            setValue('course_id', selected)
        }
    },[selected])

    useUpdateEffect(() => {
        if(createdState.success){
            navigate('/dashboard/student')
        }
    },[createdState])

    useEffectOnce(() => {
        dispatch(getAllCoursesRequest())
        dispatch(GetAllSchoolYears())
        dispatch(GetActiveSchoolYear())
    })

    useIsomorphicLayoutEffect(() => {
        if(courses.data){
            const list = courses.data.map(course => {
                return {
                    id: course.ID,
                    name: course.name
                }
            })
            setCoursesList(list)
        }
    },[courses.data])

    useIsomorphicLayoutEffect(() => {
        if(schoolyears.data){
            setValue('schoolyear_id', activeSchoolyear.ID)
            const list = schoolyears.data.map(year => {
                return {
                    id: year.ID,
                    name: year.school_year+", "+year.semester + " Semester"
                }
            })
            setYearList(list)
        }
    },[schoolyears.data])

    useUpdateEffect(() => {
        if(selected){
            setValue('course_id', selected)
        }
    },[selected])

    useUpdateEffect(() => {
        if(schoolYear){
            setValue('schoolyear_id', schoolYear)
        }
    },[schoolYear])


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="mx-auto my-10">
                <div className='flex align-middle'>
                    <h3 className='leading-6 text-2xl mr-auto text-gray-600'>
                        Add Student
                    </h3>
                </div>
            </div>
     
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <CardContainer padding='' footer={true} cancelOnclick={cancelForm} loading={createdState.loading}>
                    
                    <div className="p-4 sm:px-0">
                        <h1 className="text-lg font-medium text-gray-500 leading-6"> Profile </h1>
                        <p className="mt-1 text-sm text-gray-500 opacity-60">
                            Fill out the form for the new faculty member.
                        </p>
                    </div>

                    <div className="grid grid-cols-4 gap-6">

                        <div className="col-span-3">
                            <label className="block text-sm font-medium text-gray-700">Photo</label>
                            <div className="mt-1 flex items-center">
                                {
                                    picture &&
                                    <>
                                        <img
                                            className="inline-block h-14 w-14 rounded-full"
                                            src={URL.createObjectURL(picture)}
                                            alt=""
                                        />
                                        <button
                                            className='ml-5 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                            onClick={() => setPicture(undefined)}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                }

                                {
                                    !picture &&
                                    <>
                                    <span className="inline-block bg-gray-100 rounded-full overflow-hidden h-12 w-12">
                                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </span>
                                    <label
                                    htmlFor='attachment'
                                    className="ml-5 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Upload
                                    </label>
                                    <input type='file' id='attachment' name='attachement' onChange={(e) => handleAttachement(e)} hidden />
                                </>
                                }
                                </div>
                        </div>

                        <div className="col-span-4 sm:col-span-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <div className="mt-1 flex rounded-md shadow">
                                <input
                                    type="text"
                                    id="username"
                                    className={classNames(errors.username ? "border border-red-300 focus:ring-red-300 focus:border-red-300" : "", "input-text")}
                                    {...register('username')}
                                />
                            </div>
                            {errors.username && <p className='text-sm text-red-400'> {errors.username.message} </p>}
                        </div>

                        <div className="col-span-3 sm:col-span-2">
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                First name
                            </label>
                            <div className="mt-1 flex rounded-md shadow">
                                <input
                                    type="text"
                                    id="firstName"
                                    className={classNames(errors.first_name ? "border border-red-300 focus:ring-red-300 focus:border-red-300" : "", "input-text")}
                                    {...register('first_name')}
                                />
                            </div>
                            {errors.first_name && <p className='text-sm text-red-400'> {errors.first_name.message} </p>}
                        </div>

                        <div className="col-span-3 sm:col-span-2">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                Last name
                            </label>
                            <div className="mt-1 flex rounded-md shadow">
                                <input
                                    type="text"
                                    id="lastName"
                                    className={classNames(errors.last_name ? "border border-red-300 focus:ring-red-300 focus:border-red-300" : "", "input-text")}
                                    {...register('last_name')}
                                />
                            </div>
                            {errors.last_name && <p className='text-sm text-red-400'> {errors.last_name.message} </p>}
                        </div>

                        <div className="col-span-2 sm:col-span-2">
                            <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                                Date of Birth
                            </label>
                            <div className="mt-1 flex rounded-md shadow">
                                <DatePicker 
                                    id='birthday'
                                    name='birthday'
                                    selected={startDate}
                                    onChange={e => setStartDate(e)}
                                    className="input-text"
                                />
                            </div>
                            {errors.birthday && <p className='text-sm text-red-400'> *Date is required </p>}
                        </div>

                        <div className="col-span-2 sm:col-span-2">
                            <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                                Course
                            </label>
                            <div className="mt-1 flex rounded-md shadow">
                                <SelectMenu selected={selected} setSelected={setSelected} lists={coursesList} className='mt-0 pt-0'/>
                            </div>
                            {errors.course_id && <p className='text-sm text-red-400'> {errors.course_id.message} </p>}
                        </div>

                        <div className="col-span-2 sm:col-span-2">
                            <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                                School Year
                            </label>
                            <div className="mt-1 flex rounded-md shadow">
                                <SelectMenu selected={schoolYear} setSelected={setSchoolYear} lists={yearList} className='mt-0 pt-0'/>
                            </div>
                            {errors.schoolyear_id && <p className='text-sm text-red-400'> {errors.schoolyear_id.message} </p>}
                        </div>

                        <div className="col-span-2 sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address <span className='text-xs opacity-75'> *optional  </span>
                            </label>
                            <div className="mt-1 flex rounded-md shadow">
                                <input
                                    type="email"
                                    id="email"
                                    className={classNames(errors.email ? "border border-red-300 focus:ring-red-300 focus:border-red-300" : "", "input-text")}
                                    {...register('email')}
                                />
                            </div>
                            {errors.email && <p className='text-sm text-red-400'> {errors.email.message} </p>}
                        </div>

                        <div className="col-span-4 sm:col-span-4">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <div className="mt-1 flex rounded-md shadow">
                                <input
                                    type="phone"
                                    id="phone"
                                    className={classNames(errors.phone ? "border border-red-300 focus:ring-red-300 focus:border-red-300" : "", "input-text")}
                                    {...register('phone')}
                                />
                            </div>
                            {errors.phone && <p className='text-sm text-red-400'> {errors.phone.message} </p>}
                        </div>
                    </div>
                </CardContainer>
            </form>
</div>
    )
}

export default StudentForm