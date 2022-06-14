import React, { useEffect } from 'react'
import { 
    SubmitHandler,
    useForm 
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import * as yup from 'yup'

import { createSubject } from 'redux/subject/action'
import { classNames } from 'utility'
import CardContainer from 'components/CardContainer'

interface IForm {
    code        : string
    name        : string
    unit        : number
}

const subjectSchema = yup.object({
    code        : yup.string().trim().required('*Code is required'),
    name        : yup.string().trim().required('*Name is required'),
    unit        : yup.number().typeError('*Unit must be a number').positive('*Unit must be greater than zero').required('*Unit is required')
}).required()

const SubjectForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { register, handleSubmit,formState: { errors } } = useForm<IForm>({
        mode: "onChange",
        resolver: yupResolver(subjectSchema)
    });

    const onSuccess = () => {
        toast.success('Subject created')
        navigate(-1)
    }

    const onFailed = () => {
        toast.error('Something went wrong')
    }

    const onSubmit: SubmitHandler<IForm> = (data) => {
            dispatch(
                createSubject({
                    ...data,
                    onSuccess,
                    onFailed
                })
            )
    }

    const cancelForm = () => {
        navigate(-1)
    }
    
    useEffect(() => {
        console.log(errors)
    },[errors])

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto my-10">
                <div className='flex align-middle'>
                    <h3 className='leading-6 text-2xl mr-auto text-gray-600'>
                        Add New Subject
                    </h3>
                </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {/* <CardContainer padding='' footer={true} cancelOnclick={cancelForm} loading={createdState.loading}> */}
                <CardContainer padding='' footer={true} cancelOnclick={cancelForm}>
                
                    <div className="grid grid-cols-4 gap-6">

                        <div className="col-span-4 sm:col-span-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <div className="mt-1 flex rounded-md shadow">
                                <input
                                    type="text"
                                    id="name"
                                    className={classNames(errors.name ? "border border-red-300 focus:ring-red-300 focus:border-red-300" : "", "input-text")}
                                    {...register('name')}
                                />
                            </div>
                            {errors.name && <p className='text-sm text-red-400'> {errors.name.message} </p>}
                        </div>

                        <div className="col-span-3 sm:col-span-2">
                            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                                Code
                            </label>
                            <div className="mt-1 flex rounded-md shadow">
                                <input
                                    type="text"
                                    id="code"
                                    className={classNames(errors.code ? "border border-red-300 focus:ring-red-300 focus:border-red-300" : "", "input-text")}
                                    {...register('code')}
                                />
                            </div>
                            {errors.code && <p className='text-sm text-red-400'> {errors.code.message} </p>}
                        </div>

                        <div className="col-span-3 sm:col-span-2">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                Unit
                            </label>
                            <div className="mt-1 flex rounded-md shadow">
                                <input
                                    type="text"
                                    id="lastName"
                                    defaultValue={1}
                                    className={classNames(errors.unit ? "border border-red-300 focus:ring-red-300 focus:border-red-300" : "", "input-text")}
                                    {...register('unit')}
                                />
                            </div>
                            {errors.unit && <p className='text-sm text-red-400'> {errors.unit.message} </p>}
                        </div>
                       
                    </div>
                </CardContainer>
            </form>
        </div>
    )
}

export default SubjectForm