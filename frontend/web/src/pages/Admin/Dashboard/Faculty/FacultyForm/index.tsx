import React, { useState } from 'react'
import CardContainer from 'components/CardContainer'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { classNames } from 'utility'
import { useUpdateEffect, useUserCreated } from 'hooks'
import { useDispatch } from 'react-redux'
import { createUserRequest } from 'redux/auth/action'
import { isUserCreated } from 'redux/auth/selector'

interface FormData {
    username    : string
    first_name  : string
    last_name   : string
    birthday    : Date | null
    email       : string
    type        : string
}

const facultySchema = yup.object({
    username    : yup.string().trim().required('*Username is required'),
    first_name  : yup.string().trim().required('*First name is required'),
    last_name   : yup.string().trim().required('*First name is required'),
    birthday    : yup.date().required('*Birthday is required'),
    email       : yup.string().trim().email('*Input correct email format')
}).required()

const FacultyForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const createdState = useUserCreated();
    const [startDate, setStartDate] = useState<Date | null>(null);

    const cancelForm = () => navigate('/dashboard/faculty');

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
        mode: "onChange",
        resolver: yupResolver(facultySchema)
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        data.type = "faculty"

        dispatch(createUserRequest(data))
    }

    useUpdateEffect(() => {
        setValue('birthday', startDate)
    },[startDate])

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
                        <CardContainer padding='p-10' footer={true} cancelOnclick={cancelForm}>
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