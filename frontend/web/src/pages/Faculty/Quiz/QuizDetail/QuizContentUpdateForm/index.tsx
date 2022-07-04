import Card from 'components/CardContainer'
import Title from 'components/Title'
import { useEffectOnce, useIsomorphicLayoutEffect, useUpdateEffect } from 'hooks'
import { Control, FieldArrayWithId, SubmitHandler, useFieldArray, UseFieldArrayRemove, UseFieldArrayUpdate, useForm, UseFormRegister } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { isLoading } from 'redux/loading/selector'
import { createQuizContent, getQuizContent, updateQuizContent } from 'redux/quiz/action'
import { getContent } from 'redux/quiz/selector'
import { GET_QUIZ_CONTENT } from 'redux/quiz/types'
import { quizContentRequest } from 'services/request'
interface IFields {
    question:   string
    answer:     string
}

interface IForm {
    form: IFields[]
}

const QuizContentUpdateForm = () => {
    const params    = useParams()
    const dispatch  = useDispatch()
    const navigate  = useNavigate()
    const content   = useSelector(getContent)
    const loading   = useSelector(isLoading([GET_QUIZ_CONTENT]))
    
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
        if(params.id){

            const payload = {
                question: data.form[0].question,
                answer: data.form[0].answer,
                id: params.id,
                content: Number(params.content),
                onSuccess: onSuccess,
                onFailed: onFailed
            }

            dispatch(updateQuizContent(payload))
        }
    }

    useEffectOnce(() => {
        if(params.id && params.content){
            dispatch(getQuizContent({id: Number(params.id), contentID: Number(params.content)}))
        }
    })

    useUpdateEffect(() => {
        if(content){
            append({
                question: content.question,
                answer: content.answer
            })
        }
    },[content])

    if(loading){
        return(
            <>
                loading...
            </>
        )
    }

    return (
        <>
            <Title name='Add Questions'/>
                <Card 
                    footer={true} 
                    cancelText='Back' 
                    cancelOnclick={() => navigate(`/faculty/quiz/${params.id}`)}
                    submitText='Submit'
                    submitOnclick={handleSubmit(onSubmit)}
                >
                    {
                        fields.map((field, index) => (
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
                                </div>

                            </fieldset>
                        ))
                    }
                            
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
        </>
    )
}

export default QuizContentUpdateForm