import { MinusIcon, PlusIcon } from '@heroicons/react/solid'
import Card from 'components/CardContainer'
import Title from 'components/Title'
import { useEffectOnce } from 'hooks'
import React, { useEffect, useState } from 'react'
import { Control, FieldArrayWithId, FormProvider, SubmitHandler, useFieldArray, UseFieldArrayRemove, UseFieldArrayUpdate, useForm, useFormContext, UseFormRegister } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { createQuiz, createQuizContent } from 'redux/quiz/action'
import { quizContentRequest } from 'services/request'
import { classNames } from 'utility'
interface IFields {
    question:   string
    answer:     string
}

interface IForm {
    form: IFields[]
}

const QuizContentForm = () => {
    const params    = useParams()
    const dispatch  = useDispatch()
    const navigate  = useNavigate()
    
    const {control, handleSubmit, register} = useForm<IForm>()
    const {fields, append, update, remove} = useFieldArray<IForm>({
        control,
        name:"form",
    })

    const onSuccess = () => {
        navigate(`/faculty/quiz/${params.id}`)
        toast.success('Created!')
    }

    const onFailed = () => {
        toast.error('Failed to update')
    }

    const onSubmit:SubmitHandler<IForm> = (data) => {
        console.log('asdfasdf')
        console.log(data)
        const payload = {
            form: data.form,
            quizId: Number(params.id),
            onSuccess,
            onFailed
        }

        if(params.id){
            dispatch(createQuizContent(payload))
        }
    }

    useEffectOnce(() => {
        console.log(params)

        append({
            question: "",
            answer: ""
        })
    })

    return (
        <>
            <Title name='Add Questions'/>
                <Card 
                    footer={true} 
                    cancelText='Back' 
                    cancelOnclick={() => navigate(-1)}
                    submitText='Submit'
                    submitOnclick={handleSubmit(onSubmit)}
                >
                    {fields.map((field, index) => (
                        <fieldset key={field.id}>
                                <div className="grid grid-cols-7 gap-6 align-middle">
                            
                                <ChildForm
                                    control={control}
                                    update={update}
                                    index={index}
                                    value={field}
                                    remove={remove}
                                    register={register}
                                />

                                <div className={classNames(
                                    index === 0 ? 'flex' : 'hidden',
                                    "col-span-6 sm:col-span-1 justify-self-center flex items-center")}>
                                    <button className='button-primary p-1' onClick={() => {
                                        append({
                                            question: "",
                                            answer: ""
                                        })
                                    }}>
                                        <PlusIcon className='h-5 w-5'/>
                                    </button>
                                </div>
                            </div>

                        </fieldset>
                    ))}
                            
                </Card>
        </>
    )
}

interface IChild {
    control: Control<IForm, any> | undefined
    update: UseFieldArrayUpdate<IForm, "form">
    index: number
    value: FieldArrayWithId<IForm, "form", "id">
    remove: UseFieldArrayRemove
    register: UseFormRegister<IForm>
}

const ChildForm = ({control, update, index, value, remove, register}: IChild) => {

    return (
        <>
            <div className="col-span-8 sm:col-span-3">
                <label htmlFor="question" className="block text-sm font-medium text-gray-700">
                    Question
                </label>
                <input
                    type="text"
                    id="question"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    {...register(`form.${index}.question`)}
                />
            </div>

            <div className="col-span-6 sm:col-span-3">
                <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
                    Answer
                </label>
                <input
                    type="text"
                    id="answer"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    {...register(`form.${index}.answer`)}
                />
            </div>
            {
                index !== 0 &&
                <div className="col-span-6 sm:col-span-1 justify-self-center flex items-center">
                    <button className='button-primary p-1' onClick={() => {
                        remove(index)
                    }}>
                        <MinusIcon className='h-5 w-5'/>
                    </button>
                </div>
            }
           
        </>
    )
}

export default QuizContentForm