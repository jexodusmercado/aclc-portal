import React, { useRef, useState } from 'react'
import { PlusCircleIcon } from '@heroicons/react/solid'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffectOnce, useIsomorphicLayoutEffect } from 'hooks'
import { getAuthUser } from 'redux/auth/selector'
import { isLoading } from 'redux/loading/selector'
import { deleteQuiz, getAllByClassroomID, getAllByCreatorID } from 'redux/quiz/action'
import { getPublishedQuizzes, getQuizzes } from 'redux/quiz/selector'
import { GET_ALL_QUIZ_BY_CREATOR_ID } from 'redux/quiz/types'
import ConfirmModal from 'components/Modals/ConfirmModal'
import QuizTable from './Components/Tables'
import toast from 'react-hot-toast'
import { classNames } from 'utility'
import { getClassrooms } from 'redux/classroom/selector'

const Quiz = () => {
    const checkbox                                      = useRef<HTMLInputElement | null>(null)
    const navigate                                      = useNavigate()
    const user                                          = useSelector(getAuthUser)
    const quizzes                                       = useSelector(getPublishedQuizzes)
    const classrooms                                    = useSelector(getClassrooms)
    const params                                        = useParams()
    const dispatch                                      = useDispatch()
    const loading                                       = useSelector(isLoading([GET_ALL_QUIZ_BY_CREATOR_ID]))
    
    const [isDelete, setDelete]                         = useState<boolean>(false)
    const [checked, setChecked]                         = useState<boolean>(false)
    const [selectedQuiz, setSelectedQuiz]               = useState<number[]>([])
    const [indeterminate, setIndeterminate]             = useState<boolean>(false)


    const fetchData = () => {
        dispatch(getAllByClassroomID({id: Number(params.id)}))
    }

    const onDeleteSuccess = () => {
        toast.success('Deleted')
        fetchData()
        setDelete(false)
    }

    const onDeleteFailed = () => {
        toast.error('Failed to delete.')
        setDelete(false)
    }

    const handleDelete = () => {
        dispatch(deleteQuiz({
            id: selectedQuiz,
            onSuccess: onDeleteSuccess,
            onFailed: onDeleteFailed
        }))
    }

    const handleDeleteModal = () => {
        setDelete(true)
    }

    const toggleAll = () => {
        setSelectedQuiz(checked || indeterminate ? [] : quizzes.map(quiz => quiz.id))
        setChecked(!checked && !indeterminate)
        setIndeterminate(false)
    }

    useEffectOnce(() => {
        fetchData()
    })

    useIsomorphicLayoutEffect(() => {
        console.log(selectedQuiz);
        const isIndeterminate = selectedQuiz.length > 0 && selectedQuiz.length < quizzes.length
        setChecked(selectedQuiz.length === quizzes.length)
        setIndeterminate(isIndeterminate)
        if(checkbox.current){
            checkbox.current.indeterminate = isIndeterminate
        }
    }, [selectedQuiz])

    return(
        <div className='containerized'>
            <div className='flex align-middle'>
                <h3 className='leading-6 text-2xl mr-auto'>
                    Quiz
                </h3>
            </div>

             {/* TABLE */}
            <QuizTable 
                checkbox={checkbox}
                quizzes={quizzes} 
                state={selectedQuiz} 
                setState={setSelectedQuiz} 
                checked={checked} 
                toggleAll={toggleAll}
                onDelete={handleDeleteModal}
                loading={loading}    
            />
            
            <ConfirmModal 
                setOpen={setDelete} 
                open={isDelete} 
                title={'Delete'}
                phrase={'Are you sure to delete this?'}
                confirmButtonName={'Delete'}
                handleOnClick={handleDelete}
            />


        </div>
    )
}

export default Quiz