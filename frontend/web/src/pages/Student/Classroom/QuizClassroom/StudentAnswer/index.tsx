import Card from 'components/CardContainer'
import Title from 'components/Title'
import { useEffectOnce, useIsomorphicLayoutEffect, useUpdateEffect } from 'hooks'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { isError } from 'redux/error/selector'
import { isLoading } from 'redux/loading/selector'
import { answerRandomContent, getRandomContent } from 'redux/quiz/action'
import { getContent } from 'redux/quiz/selector'
import { ANSWER_QUIZ_CONTENT, GET_RANDOM_QUIZ_CONTENT } from 'redux/quiz/types'

const StudentAnswer = () => {
    const params                = useParams()
    const dispatch              = useDispatch()
    const navigate              = useNavigate()
    const quizContent           = useSelector(getContent)
    const [answer, setAnswer]   = useState<string>('')
    const answerLoading         = useSelector(isLoading([ANSWER_QUIZ_CONTENT]))
    const answerError           = useSelector(isError(ANSWER_QUIZ_CONTENT))
    const contentLoading        = useSelector(isLoading([GET_RANDOM_QUIZ_CONTENT]))
    const contentError          = useSelector(isError(GET_RANDOM_QUIZ_CONTENT))

    const fetchData = () => {
        dispatch(getRandomContent({id: Number(params.id)}))
    }

    useEffectOnce(() => {
        fetchData()
        setAnswer('')
    })

    useUpdateEffect(() => {
        if(!answerError && !answerLoading){
            fetchData()
            setAnswer('')
        }
    }, [answerError, answerLoading])

    useIsomorphicLayoutEffect(() => {
        console.log('loaders')
        console.log(answerError)
        console.log(contentError)

    }, [answerError, contentError])

    const onSubmit = (contentId: number) => {
        if(answer ===  ''){
            toast.error('Please answer or skip the question')
            return
        }

        if(params.id){
            dispatch(answerRandomContent({quizID: params.id, contentID:contentId.toString(), user_input: answer}))
        }
    }

    const onSkip = () => {
        fetchData()
        setAnswer('')
    }



    return(
        <div className='containerized'>
            <Title name='Quiz' />

            <Card title='Question' className='p-0 m-0'>
                <div className="space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="answer" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            {quizContent.question}
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <div className="max-w-lg flex rounded-md shadow-sm">
                                <input
                                    type="text"
                                    name="answer"
                                    id="answer"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex border-t justify-between pt-5 space-x-3'>
                        <button type="button" className='button-primary bg-red-500'> End Test </button>

                        <div>
                            <button type="button" className='button-secondary' onClick={() => onSkip()}> Skip </button>
                            <button type="button" className='button-primary' onClick={() => onSubmit(quizContent.id)}> Submit </button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default StudentAnswer