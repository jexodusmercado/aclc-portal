import React, { useRef, useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams }   from 'react-router-dom'
import toast                        from 'react-hot-toast'
import DatePicker                   from 'react-datepicker'
import dayjs                        from 'dayjs'
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
// components
import Card             from 'components/CardContainer'
import QuizContentTable from './Table'
import Title            from 'components/Title'
import ConfirmModal     from 'components/Modals/ConfirmModal'
import Toggle           from 'components/Toggle'

// hooks and effects
import { GET_QUIZ }         from 'redux/quiz/types'
import { isLoading }        from 'redux/loading/selector'
import { getQuiz }          from 'redux/quiz/selector'
import { getAuthUser }      from 'redux/auth/selector'

import { 
    useEffectOnce,
    useIsomorphicLayoutEffect
} from 'hooks'

import {
    deleteQuizContent,
    getAllByCreatorID,
    getQuizByID,
    updateQuiz 
} from 'redux/quiz/action'


const QuizDetail = () => {
    const params    = useParams()
    const navigate  = useNavigate()
    const dispatch  = useDispatch()

    const loading                                       = useSelector(isLoading([GET_QUIZ]))
    const quiz                                          = useSelector(getQuiz)
    const user                                          = useSelector(getAuthUser)
    
    const checkbox                                      = useRef<HTMLInputElement | null>(null)

    // const [quiz, setQuiz]                               = useState<QuizData>()
    const [quizzes, setQuizzes]                         = useState<any[]>([])
    const [selectedQuiz, setSelectedQuiz]               = useState<number[]>([])
    const [search, setSearch]                           = useState<string>('')
    const [isDelete, setDelete]                         = useState<boolean>(false)
    const [checked, setChecked]                         = useState<boolean>(false)
    const [indeterminate, setIndeterminate]             = useState<boolean>(false)
    const [selected, setSelected]                       = useState<number | undefined>(undefined)

    const toggleAll = () => {
        setSelectedQuiz(checked || indeterminate ? [] : quiz.contents.map(content => content.id))
        setChecked(!checked && !indeterminate)
        setIndeterminate(false)
    }

    const fetchQuizzes = () => {
        dispatch(getAllByCreatorID({id: user.id}))
    }

    const fetchQuiz = () => {
        if(params.id) {
            dispatch(getQuizByID({id: Number(params.id)}))
         }
    }

    const handleDeleteModal = () => {
        setDelete(true)
    }

    const onSuccess = () => {
        fetchQuiz()
        fetchQuizzes()
        toast.success('Deleted')
        setDelete(false)
    }

    const onFailed = () => {
        toast.success('Something went wrong!')
        setDelete(false)
    }

    const handlePublish = (status: boolean) => {
        if(params.id){
            dispatch(updateQuiz({id: String(params.id), is_published: status}))
        }
    }

    const onEndDateChangeSuccess = () => {
        toast.success('End date changed')
        fetchQuiz()
    }

    const handleEndDateChange = (e: string) => {
        if(params.id){
            dispatch(
                updateQuiz({
                    id: String(params.id), 
                    end_date: e,
                    onSuccess: onEndDateChangeSuccess
                })
            )
        }
    }

    const handleDelete = () => {
        if(params.id) {
            console.log('deleting this ids', {id: params.id,  contentID: selectedQuiz})
            const payload = {
                id: Number(params.id),
                contentID: selectedQuiz,
                onSuccess: onSuccess,
                onFailed: onFailed
            }
            dispatch(deleteQuizContent(payload))
        }

    }

    useEffectOnce(() => {
        if(!params.id) {
            navigate('/faculty/quiz')
            return
        }

        fetchQuiz()
    })

    useIsomorphicLayoutEffect(() => {
        const isIndeterminate = selectedQuiz.length > 0 && selectedQuiz.length < quiz.contents.length
        setChecked(selectedQuiz.length === (quiz.contents ? quiz.contents.length : -1))
        setIndeterminate(isIndeterminate)
        if(checkbox.current){
            checkbox.current.indeterminate = isIndeterminate
        }
    }, [selectedQuiz])

    if(loading){
        return(
            <>Loading...</>
        )
    }

    if(!quiz) {
        return(
            <>no data for this quiz</>
        )
    }

    return(
        <>
            <Title 
                name={`Quiz - ${quiz?.classroom?.title}`} 
                buttonName={`Create Questions`}
                redirection={`/faculty/quiz/${quiz?.id}/questions`}
            />
            <Card> 
                {
                    quiz.contents &&
                    <div className='flex justify-between my-5'>
                        <Toggle label='Publish this quiz' currentStatus={quiz.is_published} status={handlePublish}/>
                        <div className="mt-1 flex rounded-md shadow">
                                <DatePicker 
                                    id='end_date'
                                    selected={dayjs(quiz.end_date).toDate()}
                                    onChange={(e) => handleEndDateChange(dayjs(e).format('YYYY-MM-DD').toString())}
                                    className="input-text disabled:cursor-not-allowed disabled:bg-gray-200"
                                    dropdownMode="scroll"
                                    showMonthDropdown
                                    showYearDropdown
                                />
                            </div>
                    </div>
                }
                <QuizContentTable 
                    checkbox={checkbox}
                    quizContent={quiz?.contents ?? []} 
                    state={selectedQuiz} 
                    setState={setSelectedQuiz} 
                    checked={checked} 
                    toggleAll={toggleAll}
                    onDelete={handleDeleteModal}
                    loading={loading}  
                />
                    
            </Card>

            
            <ConfirmModal 
                setOpen={setDelete} 
                open={isDelete} 
                title={'Delete'}
                phrase={'Are you sure to delete this?'}
                confirmButtonName={'Delete'}
                handleOnClick={handleDelete}
            />
        </>
                
    )
}

export default QuizDetail