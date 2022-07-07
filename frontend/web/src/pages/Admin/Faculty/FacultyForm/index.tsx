import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import toast from 'react-hot-toast'
import dayjs from 'dayjs'
import * as yup from 'yup'
import CardContainer from 'components/CardContainer'
import SelectMenu from 'components/SelectMenu'
import 'react-datepicker/dist/react-datepicker.css'
import { List } from 'interfaces'
import { classNames } from 'utility'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { createUserRequest, getUserRequest, searchUsersRequest, updateUserRequest } from 'redux/users/action'
import { GetActiveSchoolYear, GetAllSchoolYears } from 'redux/school-year/action'
import { useEffectOnce, useIsomorphicLayoutEffect, useUpdateEffect } from 'hooks'
import Title from 'components/Title'
import ImageUploader from 'components/ImageUploader'
import { isLoading } from 'redux/loading/selector'
import { getUser } from 'redux/users/selector'
import { CREATE_USER, GET_USER, UPDATE_USER } from 'redux/users/types'
import { isError } from 'redux/error/selector'
import { getActiveSchoolYear, getSchoolYears } from 'redux/school-year/selector'

interface IForm {
    username        : string
    first_name      : string
    last_name       : string
    birthday        : Date | null
    email           : string
    type            : string
    letter_type     : string
    phone           : string
    schoolyear_id   : number
}

const facultySchema = yup.object({
    username    : yup.string().trim().required('*Username is required'),
    first_name  : yup.string().trim().required('*First name is required'),
    last_name   : yup.string().trim().required('*First name is required'),
    birthday    : yup.date().required('*Birthday is required'),
    phone       : yup.string().required('*Phone is required'),
    email       : yup.string().trim().email('*Input correct email format'),
    schoolyear_id : yup.number().required('*School Year is required')
}).required()

const FacultyForm = () => {
    const params                        = useParams();
    const navigate                      = useNavigate()
    const dispatch                      = useDispatch()
    const loading                       = useSelector(isLoading([GET_USER]))
    const error                         = useSelector(isError(GET_USER))
    const createLoading                 = useSelector(isLoading([CREATE_USER, UPDATE_USER]))
    const createError                   = useSelector(isError(CREATE_USER))
    const updateError                   = useSelector(isError(UPDATE_USER))
    const schoolyears                   = useSelector(getSchoolYears)
    const activeSchoolyear              = useSelector(getActiveSchoolYear)
    const user                          = useSelector(getUser)

    const [picture, setPicture]         = useState<File>()
    const [yearList, setYearList]       = useState<List[]>([])
    const [schoolYear, setSchoolYear]   = useState<number | string | undefined>(undefined)
    const [startDate, setStartDate]     = useState<Date | null>(null)

    const cancelForm = () => navigate('/dashboard/faculty');

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<IForm>({
        mode: "onChange",
        resolver: yupResolver(facultySchema)
    });

    const fetchingData = () => {
        dispatch(searchUsersRequest({keyword: '', type: "faculty"}))
        dispatch(GetAllSchoolYears())
    }

    const onSuccess = () => {
        fetchingData()
        navigate('/dashboard/faculty')
        toast.success(params.id ? 'Updated!' : 'Created!')
    }

    const onFailed = () => {
        toast.error(`Failed to ${params.id ? 'update' : 'create'}!`)
    }

    const onSubmit: SubmitHandler<IForm> = (data) => {
        const fd = new FormData()

        for( var key in data) {
            fd.append(key, (data as any)[key])
        }
        
        fd.set('type', 'faculty')

        fd.set('birthday', dayjs(data.birthday).format("YYYY-MM-DD"))

        if(picture){
            fd.append('file', picture)
        }

        if(params.id){
            console.log('updating')
            dispatch(
                updateUserRequest({
                    id: params.id, 
                    type:'facultly', 
                    letter_type:'f', 
                    formData: fd,
                    onSuccess:onSuccess,
                    onFailed: onFailed
                })
            )
        } else {
            console.log('creating')
            dispatch(
                createUserRequest({
                    type:'faculty', 
                    letter_type:'f', 
                    formData: fd,
                    onSuccess:onSuccess,
                    onFailed: onFailed
                })
            )
        }
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

    useEffectOnce(() => {
        if(params.id){
            reset()
            dispatch(getUserRequest({ id: params.id}))

        } 
    })

    useIsomorphicLayoutEffect(() => {
        if(params.id && user){
            setValue('email', user.email)
            setValue('phone', user.phone)
            setValue('username', user.username)
            setValue('last_name', user.last_name)
            setValue('first_name', user.first_name)
            setSchoolYear(user.school_year)
            setStartDate(dayjs(user.birthday).toDate())
        }
    },[user])

    useUpdateEffect(() => {
        setValue('birthday', startDate)
    },[startDate])

    useUpdateEffect(() => {
        if(schoolYear){
            setValue('schoolyear_id', Number(schoolYear))
        }
    },[schoolYear])

    useIsomorphicLayoutEffect(() => {
        if(schoolyears){
            setValue('schoolyear_id', activeSchoolyear.ID)
            const list = schoolyears.map(year => {
                return {
                    id: year.ID,
                    name: year.school_year+", "+year.semester + " Semester"
                }
            })
            setYearList(list)
        }
    },[schoolyears])

    useUpdateEffect(() => {
        console.log(createLoading)
        if(!createLoading && !createError && !updateError){
            navigate('/dashboard/faculty')
        }
    },[createLoading, createError])

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Title name={'Add Faculty Member'} />

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <CardContainer 
                    title={'Profile'}
                    description={'Fill out the form for the new faculty member.'}
                    footer={true}
                    cancelOnclick={cancelForm} 
                    loading={createLoading}
                >
                    <div className="grid grid-cols-4 gap-6">

                        <div className="col-span-3">
                            <label className="block text-sm font-medium text-gray-700">Photo</label>
                            <ImageUploader setPicture={setPicture} picture={picture} fileOnChange={handleAttachement} />
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
                                    className="input-text disabled:cursor-not-allowed disabled:bg-gray-200"
                                    dropdownMode="select"
                                    showMonthDropdown
                                    showYearDropdown
                                    disabled={params.id ? true : false}
                                />
                            </div>
                            {errors.birthday && <p className='text-sm text-red-400'> *Date is required </p>}
                        </div>

                        <div className="col-span-2 sm:col-span-2">
                            <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                                School Year
                            </label>
                            <div className="mt-1 flex rounded-md shadow">
                                <SelectMenu 
                                    selected={schoolYear} 
                                    setSelected={setSchoolYear} 
                                    lists={yearList} 
                                    className='mt-0 pt-0'
                                    isDisabled={params.id ? true : false}
                                />
                            </div>
                            {errors.schoolyear_id && <p className='text-sm text-red-400'> {errors.schoolyear_id.message} </p>}
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
    )
}

export default FacultyForm