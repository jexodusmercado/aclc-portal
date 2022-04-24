import React from 'react'
import CardContainer from 'components/CardContainer'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { classNames } from 'utility'
import { useCourseCreated, useIsomorphicLayoutEffect, useCourseError } from 'hooks'
import { useDispatch } from 'react-redux'
import { createCourseRequest } from 'redux/courses/action'
import toast from 'react-hot-toast'

interface FormData {
    name        : string
    description : string
}

const facultySchema = yup.object({
    name        : yup.string().trim().required('*name is required'),
    description : yup.string().trim().required('*description is required'),
}).required()

const CourseForm = () => {
    const navigate                      = useNavigate()
    const dispatch                      = useDispatch()
    const createdState                  = useCourseCreated()
    const error                         = useCourseError()


    const cancelForm = () => navigate('/dashboard/course');

    const { register, handleSubmit, formState: { errors }, setError } = useForm<FormData>({
        mode: "onChange",
        resolver: yupResolver(facultySchema)
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {

        dispatch(createCourseRequest(data))
    }

    useIsomorphicLayoutEffect( () => {
        if(createdState.success) {
            navigate('/dashboard/course')
        }
    }, [createdState])

    useIsomorphicLayoutEffect( () => {
        if(error.status !== 0){
            setError('name', { message: error.message})
            toast.error(error.message)
        }
    }, [error])


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto my-10">
                <div className='flex align-middle'>
                    <h3 className='leading-6 text-2xl mr-auto text-gray-500'>
                        Add Course
                    </h3>
                </div>
            </div>

            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h1 className="text-lg font-medium text-gray-500 leading-6"> Course </h1>
                        <p className="mt-1 text-sm text-gray-500 opacity-60">
                            Fill out the form for the course information.
                        </p>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <CardContainer padding='p-10' footer={true} cancelOnclick={cancelForm} loading={createdState.loading}>
                            <div className="grid grid-cols-4 gap-6">
                                <div className="col-span-4 sm:col-span-4">
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <div className="mt-1 flex rounded-md shadow">
                                        <input
                                            type="text"
                                            id="username"
                                            className={classNames(errors.name ? "border border-red-300 focus:ring-red-300 focus:border-red-300" : "", "input-text")}
                                            {...register('name')}
                                        />
                                    </div>
                                    {errors.name && <p className='text-sm text-red-400'> {errors.name.message} </p>}
                                </div>

                                <div className="col-span-4 sm:col-span-4">
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <div className="mt-1 flex rounded-md shadow">
                                        <input
                                            type="text"
                                            id="firstName"
                                            className={classNames(errors.description ? "border border-red-300 focus:ring-red-300 focus:border-red-300" : "", "input-text")}
                                            {...register('description')}
                                        />
                                    </div>
                                    {errors.description && <p className='text-sm text-red-400'> {errors.description.message} </p>}
                                </div>

                            </div>
                        </CardContainer>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CourseForm