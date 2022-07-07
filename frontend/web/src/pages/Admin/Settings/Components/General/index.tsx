import React, { useState } from 'react'
import { classNames } from 'utility'
import { Switch } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthUser } from 'redux/auth/selector'
import Modal from 'components/Modal'
import { useForm } from 'react-hook-form'
import { getUserRequest, updateUserRequest } from 'redux/users/action'
import { isLoading } from 'redux/loading/selector'
import { isError } from 'redux/error/selector'
import { UPDATE_USER } from 'redux/users/types'
import { useUpdateEffect } from 'hooks'
import { fetchRequest } from 'redux/auth/action'

interface IForm {
    first_name: string
    last_name: string
    email: string
}

const FieldTitle: { [key: string]: string } = {
    'first_name'    : 'First Name',
    'last_name'     : 'Last Name',
    'email'         : 'Email',
}

const GeneralComponent = () => {
    const dispatch  = useDispatch()
    const user      = useSelector(getAuthUser)

    const loading   = useSelector(isLoading([UPDATE_USER]))
    const error     = useSelector(isError(UPDATE_USER))

    const [updateField, setUpdateField] = useState<string>('')
    const [updateModal, setUpdateModal] = useState<boolean>(false)
    const [updateValue, setUpdateValue] = useState<string>('')

    const handleUpdate = (field: string, value: string) => {
        setUpdateField(field)
        setUpdateValue(value)
        setUpdateModal(true)

    }

    const onSubmit = () => {

        const fd = new FormData()

        fd.append(updateField, updateValue)

        dispatch(updateUserRequest({id: user.id.toString(), formData: fd}))
    }

    useUpdateEffect(() => {
        if(!loading && !error) {
            setUpdateModal(false)
            dispatch(fetchRequest({id: user.id.toString()}))
        }
    }, [loading, error])

    return (
        <>
            <div className="mt-10 divide-y divide-gray-200">
                <div className="space-y-1">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
                    <p className="max-w-2xl text-sm text-gray-500">
                        This information will be displayed publicly so be careful what you share.
                    </p>
                </div>
                <div className="mt-6">
                    <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500">First Name</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">{user.first_name}</span>
                                <span className="ml-4 flex-shrink-0">
                                    <button
                                        type="button"
                                        className="bg-white rounded-md font-medium text-blue-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        onClick={() => handleUpdate('first_name', user.first_name)}
                                    >
                                        Update
                                    </button>
                                </span>
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500">Last Name</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">{user.last_name}</span>
                                <span className="ml-4 flex-shrink-0">
                                    <button
                                        type="button"
                                        className="bg-white rounded-md font-medium text-blue-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        onClick={() => handleUpdate('last_name', user.last_name)}
                                    >
                                        Update
                                    </button>
                                </span>
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                            <dt className="text-sm font-medium text-gray-500">Photo</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                </span>
                                <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                                    <button
                                        type="button"
                                        className="bg-white rounded-md font-medium text-blue-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Update
                                    </button>
                                    <span className="text-gray-300" aria-hidden="true">
                                        |
                                    </span>
                                    <button
                                        type="button"
                                        className="bg-white rounded-md font-medium text-blue-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Remove
                                    </button>
                                </span>
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                            <dt className="text-sm font-medium text-gray-500">Email</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">{user.email !== "" ? user.email : "N/A"}</span>
                            <span className="ml-4 flex-shrink-0">
                                <button
                                type="button"
                                className="bg-white rounded-md font-medium text-blue-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                onClick={() => handleUpdate('email', user.email)}
                                >
                                Update
                                </button>
                            </span>
                            </dd>
                        </div>
                        
                    </dl>
                </div>
            </div>

            <div className="mt-10 divide-y divide-gray-200">
                <div className="space-y-1">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Account</h3>
                    <p className="max-w-2xl text-sm text-gray-500">
                    Manage how information is displayed on your account.
                    </p>
                </div>
                {/* <div className="mt-6">
                    <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500">Password</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">**********</span>
                                <span className="ml-4 flex-shrink-0">
                                    <button
                                    type="button"
                                    className="bg-white rounded-md font-medium text-blue-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    onClick={() => handleUpdate('password')}
                                    >
                                    Change
                                    </button>
                                </span>
                            </dd>
                        </div>
                    </dl>
                </div> */}
            </div>
                                        
            <Modal open={updateModal} setOpen={setUpdateModal}>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    {FieldTitle[updateField]}
                </label>
                <div className="mt-1 flex rounded-md shadow">
                    <input
                        type="text"
                        className={"input-text"}
                        required
                        
                        value={updateValue}
                        onChange={(e) => setUpdateValue(e.target.value)}
                    />
                </div>
                <button className='mt-2 button-primary' onClick={() => onSubmit()}>
                    Update
                </button>
            </Modal>
        </>
    )
}

export default GeneralComponent