import Card from 'components/CardContainer'
import Title from 'components/Title'
import { useEffectOnce, useIsomorphicLayoutEffect } from 'hooks'
import React, { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { quizDataState } from 'redux/quiz/types'
import { quizRequest } from 'services/request'
import QuizTable from './Table'


const QuizDetail = () => {
    const params = useParams()
    const navigate = useNavigate()
    
    const checkbox                                      = useRef<HTMLInputElement | null>(null)
    
    const [quiz, setQuiz]                               = useState<quizDataState>()
    const [loading, setLoading]                         = useState<boolean>(false)
    const [search, setSearch]                           = useState<string>('')
    const [quizzes, setQuizzes]                         = useState<any[]>([])
    const [isDelete, setDelete]                         = useState<boolean>(false)
    const [checked, setChecked]                         = useState<boolean>(false)
    const [selected, setSelected]                       = useState<number | undefined>(undefined)
    const [selectedQuiz, setSelectedQuiz]               = useState<any[]>([])
    const [indeterminate, setIndeterminate]             = useState<boolean>(false)

    const toggleAll = () => {
        setSelectedQuiz(checked || indeterminate ? [] : quizzes)
        setChecked(!checked && !indeterminate)
        setIndeterminate(false)
    }

    const handleDeleteModal = () => {
        setDelete(true)
    }

    useEffectOnce(() => {
        setLoading(true)
        if(params.id) {
            quizRequest.getByID(params.id)
            .then((response) => setQuiz(response.data))
            .catch(() => navigate('/faculty/quiz'))
            setLoading(false)
            
            return
        }

        setLoading(false)
        navigate('/faculty/quiz')

    })



    return(
        <>
            {
                quiz && 
                <>

                    <Title 
                        name={`Quiz - ${quiz?.classroom.title}`} 
                        buttonName={`Create Questions`}
                        redirection={`/faculty/quiz/${quiz.id}/questions`}
                    />
                    <Card description='Quiz details'> 

                        {
                            quiz.contents != null ?
                            <QuizTable 
                                checkbox={checkbox}
                                quizContent={quiz.contents} 
                                state={selectedQuiz} 
                                setState={setSelectedQuiz} 
                                checked={checked} 
                                toggleAll={toggleAll}
                                onDelete={handleDeleteModal}
                                loading={loading}  
                            />
                            :
                            <>
                                No Questions yet
                            </>
                        }
                            
                    </Card>
                </>
            }
        </>
                
    )
}

export default QuizDetail