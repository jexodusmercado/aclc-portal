import React, { useState } from 'react'
import ACLCLogo from 'assets/images/aclc.jpeg'
import Alert from 'components/Alert'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { classNames } from 'utility'
import { useDispatch } from 'react-redux'
import { loginRequest } from 'redux/auth/action'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { useEffectOnce, useIsomorphicLayoutEffect, useUpdateEffect, useUserAuthenticated, useUserError } from 'hooks'
import { useNavigate } from 'react-router-dom'

type FormData = {
    username: string
    password: string
}

const loginSchema = yup.object({
    username: yup.string().trim().required('*Username is required'),
    password: yup.string().trim().required('*Password is required')
}).required()

const SignIn = () => {
    const [showError, setShowError] = useState<boolean>(false)
    const dispatch  = useDispatch()
    const error     = useUserError()
    const navigate  = useNavigate()
    const auth      = useUserAuthenticated()

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        mode: "onChange",
        resolver: yupResolver(loginSchema)
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        const jsondata = {
            username: data.username,
            password: data.password
        }

        dispatch(loginRequest(jsondata))
    }

    useEffectOnce(() => {
        if(auth){
            navigate('/dashboard')
        }
    })

    useIsomorphicLayoutEffect(() => {
        if(auth){
            navigate('/dashboard')
        }
    },[auth])

    useUpdateEffect(() => {
        if(error.status !== 0){
            setShowError(true)
        }
    }, [error])

    return (
        <>
            <div className="h-screen flex">
                <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>

                        <img
                            className="w-full h-auto"
                            src={ACLCLogo}
                            alt="Workflow"
                        />

                            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Student Portal</h2>
                            
                        </div>

                        <div className="mt-8">

                            {
                                showError &&
                                <Alert 
                                Icon={ExclamationCircleIcon} 
                                title={"Username/Password is incorrect"} 
                                description={"Please provide the correct credentials"} 
                                backgroundColor={"bg-red-100"}
                                titleTextColor={"text-red-800"}
                                descriptionColor={"text-red-700"}
                                iconColor={"text-red-300"}
                                />
                            }

                            <div className="mt-6">
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                        Student No.
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="username"
                                            type="text"
                                            autoComplete="username"
                                            className={
                                                classNames(
                                                    errors.username || showError ?
                                                    "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500",
                                                    "appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
                                                )
                                            }
                                            {...register('username')}
                                        />
                                    </div>
                                    { errors.username && <p className='text-error'> Please provide username. </p>}
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="mt-1">
                                    <input
                                        id="password"
                                        type="password"
                                        autoComplete="current-password"
                                        className={
                                            classNames(
                                                errors.password || showError ?
                                                "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500",
                                                "appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                                            )
                                        }
                                        {...register('password')}
                                    />
                                    </div>
                                    { errors.password && <p className='text-error'> Please provide password.</p>}
                                </div>

                                <div>
                                    <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Sign in
                                    </button>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block relative w-0 flex-1">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                        alt=""
                    />
                </div>
            </div>
        </>
    )
}

export default SignIn