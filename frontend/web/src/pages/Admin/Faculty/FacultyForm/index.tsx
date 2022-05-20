import React, { useState } from 'react'
import CardContainer from 'components/CardContainer'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { classNames } from 'utility'
import { useEffectOnce, useIsomorphicLayoutEffect, useUpdateEffect, useUserCreated } from 'hooks'
import { useDispatch } from 'react-redux'
import { createUserRequest } from 'redux/users/action'
import { useActiveSchoolYear, useSchoolYears } from 'hooks/schoolyear'
import { List } from 'interfaces'
import { GetAllSchoolYears } from 'redux/school-year/action'
import SelectMenu from 'components/SelectMenu'

interface FormData {
    username        : string
    first_name      : string
    last_name       : string
    birthday        : Date | null
    email           : string
    type            : string
    letter_type     : string
    schoolyear_id   : number
}

const facultySchema = yup.object({
    username    : yup.string().trim().required('*Username is required'),
    first_name  : yup.string().trim().required('*First name is required'),
    last_name   : yup.string().trim().required('*First name is required'),
    birthday    : yup.date().required('*Birthday is required'),
    email       : yup.string().trim().email('*Input correct email format'),
    schoolyear_id : yup.number().required('*School Year is required')
}).required()

const FacultyForm = () => {
    const navigate                      = useNavigate()
    const dispatch                      = useDispatch()
    const createdState                  = useUserCreated();
    const schoolyears                   = useSchoolYears()
    const activeSchoolyear              = useActiveSchoolYear()
    const [startDate, setStartDate]     = useState<Date | null>(null);
    const [schoolYear, setSchoolYear]   = useState<List>({id: activeSchoolyear.ID, name:activeSchoolyear.school_year+", "+activeSchoolyear.semester+" Semester"})
    const [yearList, setYearList]       = useState<List[]>([])

    const cancelForm = () => navigate('/dashboard/faculty');

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
        mode: "onChange",
        resolver: yupResolver(facultySchema)
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        data.type           = "faculty"
        data.letter_type    = "f"

        dispatch(createUserRequest(data))
    }

    useEffectOnce(() => {
        dispatch(GetAllSchoolYears())
    })

    useUpdateEffect(() => {
        setValue('birthday', startDate)
    },[startDate])

    useUpdateEffect(() => {
        setValue('schoolyear_id', schoolYear.id)
    },[schoolYear])

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
        if(createdState.success){
            navigate('/dashboard/faculty')
        }
    },[createdState])


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto my-10">
                <div className='flex align-middle'>
                    <h3 className='leading-6 text-2xl mr-auto text-gray-500'>
                        Add Faculty Member
                    </h3>
                </div>
            </div>

            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h1 className="text-lg font-medium text-gray-500 leading-6"> Profile </h1>
                        <p className="mt-1 text-sm text-gray-500 opacity-60">
                            Fill out the form for the new faculty member.
                        </p>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <CardContainer padding='p-10' footer={true} cancelOnclick={cancelForm} loading={createdState.loading}>
                            <div className="grid grid-cols-4 gap-6">
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
                                        School Year
                                    </label>
                                    <div className="mt-1 flex rounded-md shadow">
                                        <SelectMenu selected={schoolYear} setSelected={setSchoolYear} lists={yearList} className='max-w-sm mt-0 pt-0'/>
                                    </div>
                                    {errors.schoolyear_id && <p className='text-sm text-red-400'> {errors.schoolyear_id.message} </p>}
                                </div>

                                <div className="col-span-4 sm:col-span-4">
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
                            </div>
                        </CardContainer>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FacultyForm