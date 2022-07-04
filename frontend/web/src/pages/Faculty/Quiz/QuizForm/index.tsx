import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import toast from 'react-hot-toast'
import dayjs from 'dayjs'
import * as yup from 'yup'
import CardContainer from 'components/CardContainer'
import SelectMenu from 'components/SelectMenu'
import 'react-datepicker/dist/react-datepicker.min.css'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { getUserRequest } from 'redux/users/action'
import { GetActiveSchoolYear, GetAllSchoolYears } from 'redux/school-year/action'
import { useEffectOnce, useFilteredClassroom, useIsomorphicLayoutEffect, useUpdateEffect, useUserCreated } from 'hooks'
import Title from 'components/Title'
import { getByTeacherId } from 'redux/classroom/action'
import { getAuthUser } from 'redux/auth/selector'
import { GRADE_PREIOD } from 'contants'
import { createQuiz, updateQuiz } from 'redux/quiz/action'


interface IForm {
    creator_id          : number
    grade_period        : string
    classroom_id        : number
    end_date            : Date | null
}

const classroomSchema = yup.object({
    classroom_id    : yup.number().required('*Classroom is required'),
    end_date        : yup.date().required('*End date is required'),
   
}).required()

const FacultyForm = () => {
    const params                        = useParams()
    const navigate                      = useNavigate()
    const dispatch                      = useDispatch()
    const createdState                  = useUserCreated()
    const schoolyears                   = useFilteredClassroom()
    const user                          = useSelector(getAuthUser)

    const [selected, setSelected]       = useState<number | string | undefined>()
    const [classroomID, setClassroomID]   = useState<number | string | undefined>(undefined)

    const cancelForm = () => navigate('/dashboard/faculty');

    const { handleSubmit, setValue, formState: { errors }, reset, watch } = useForm<IForm>({
        mode: "onChange",
        resolver: yupResolver(classroomSchema),
    });

    const { end_date } = watch()

    const fetchingData = () => {
        if(params.id){
            dispatch(getByTeacherId({teacherId: params.id.toString(), keyword:''}))
        }
    }

    const onSuccess = () => {
        fetchingData()
        navigate('/faculty/quiz')
        toast.success(params.id ? 'Updated!' : 'Created!')
    }

    const onFailed = () => {
        toast.error(`Failed to ${params.id ? 'update' : 'create'}!`)
    }

    const onSubmit: SubmitHandler<IForm> = (data) => {
        const body = {
            creator_id: data.creator_id,
            classroom_id: data.classroom_id,
            end_date: dayjs(data.end_date).format('YYYY-MM-DD').toString(),
            grade_period: data.grade_period,
            onSuccess: onSuccess,
            onFailed: onFailed
        }
        
        console.log(body)

        if(params.id){

            const param = {
                ...body,
                id: params.id
            }
            console.log('updating')

            dispatch(updateQuiz(param))
        } else {
            console.log('creating')
            // quizRequest.createQuiz(body)
            dispatch(createQuiz(body))
        }
    }

    useEffectOnce(() => {
        reset()
        dispatch(GetAllSchoolYears())
        dispatch(GetActiveSchoolYear())
        setValue('creator_id', user.id)
    })

    useEffectOnce(() => {
        if(params.id){
            reset()
            dispatch(getUserRequest({ id: params.id}))

        } 
    })

    useIsomorphicLayoutEffect(() => {
        if(classroomID){
            setValue('classroom_id', Number(classroomID))
        }
    },[classroomID])

    useIsomorphicLayoutEffect(() => {
        if(params.id && user){
            // setValue('email', user.email)
            // setValue('phone', user.phone)
            // setValue('username', user.username)
            // setValue('last_name', user.last_name)
            // setValue('first_name', user.first_name)
            // setSchoolYear(user.school_year)
            // setStartDate(dayjs(user.birthday).toDate())
        }
    },[user])

    useUpdateEffect(() => {
        if(selected){
            setValue('grade_period', selected.toString());
        }
    },[selected])

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Title name={'Create Quiz'} />

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <CardContainer 
                    title={''}
                    description={'Fill out the form to create new quiz.'}
                    footer={true}
                    cancelOnclick={cancelForm} 
                    loading={createdState.loading}
                >
                    <div className="grid grid-cols-4 gap-6">
                        <div className="col-span-2 sm:col-span-2">
                            <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
                                Grade Period
                            </label>
                            <div className="mt-1 flex rounded-md shadow">
                                <SelectMenu lists={GRADE_PREIOD} selected={selected} setSelected={setSelected} />
                            </div>
                            {errors.end_date && <p className='text-sm text-red-400'> *Date is required </p>}
                        </div>
                        <div className="col-span-2 sm:col-span-2">
                            <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
                                Due Date:
                            </label>
                            <div className="mt-1 flex rounded-md shadow">
                                <DatePicker 
                                    id='end_date'
                                    selected={end_date}
                                    onChange={(e) => setValue('end_date',e)}
                                    className="input-text disabled:cursor-not-allowed disabled:bg-gray-200"
                                    dropdownMode="scroll"
                                    showMonthDropdown
                                    showYearDropdown
                                    disabled={params.id ? true : false}
                                />
                            </div>
                            {errors.end_date && <p className='text-sm text-red-400'> *Date is required </p>}
                        </div>

                        <div className="col-span-2 sm:col-span-2">
                            <label htmlFor="clasroom" className="block text-sm font-medium text-gray-700">
                                Classroom
                            </label>
                            <div className="mt-1 flex rounded-md shadow">
                                <SelectMenu 
                                    selected={classroomID} 
                                    setSelected={setClassroomID} 
                                    lists={schoolyears} 
                                    className='mt-0 pt-0'
                                    isDisabled={params.id ? true : false}
                                />
                            </div>
                            {errors.classroom_id && <p className='text-sm text-red-400'> {errors.classroom_id.message} </p>}
                        </div>
                    </div>
                </CardContainer>
            </form>
        </div>
    )
}

export default FacultyForm