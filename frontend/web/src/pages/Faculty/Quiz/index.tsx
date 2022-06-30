import { PlusCircleIcon } from '@heroicons/react/solid'
import CardContainer from 'components/CardContainer'
import ConfirmModal from 'components/Modals/ConfirmModal'
import SelectInputText from 'components/SearchInputText'
import SelectMenu from 'components/SelectMenu'
import { useEffectOnce, useIsomorphicLayoutEffect } from 'hooks'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAuthUser } from 'redux/auth/selector'
import { quizRequest } from 'services/request'
import QuizTable from './Components/Tables'

const Quiz = () => {
    const user                                          = useSelector(getAuthUser);
    const checkbox                                      = useRef<HTMLInputElement | null>(null)
    
    const [search, setSearch]                           = useState<string>('')
    const [quizzes, setQuizzes]                         = useState<any[]>([])
    const [isDelete, setDelete]                         = useState<boolean>(false)
    const [loading, setLoading]                         = useState(false)
    const [checked, setChecked]                         = useState<boolean>(false)
    const [selected, setSelected]                       = useState<number | undefined>(undefined)
    const [selectedQuiz, setSelectedQuiz]               = useState<any[]>([])
    const [indeterminate, setIndeterminate]             = useState<boolean>(false)

    const handleClear = () => {
        setSearch('');
    }

    const fetchData = async () => {
        setLoading(true);
        quizRequest.getAllByCreatorID({id: user.id})
        .then(response => {
            setQuizzes(response.data)
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    const handleDelete = () => {
        console.log('delete')
    }

    const handleDeleteModal = () => {
        setDelete(true)
    }

    const toggleAll = () => {
        setSelectedQuiz(checked || indeterminate ? [] : quizzes)
        setChecked(!checked && !indeterminate)
        setIndeterminate(false)
    }

    useEffectOnce(() => {
        fetchData()
    })

    useIsomorphicLayoutEffect(() => {
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

                <div className='ml-auto space-x-3'>
                    <Link to="/faculty/quiz/create" className='button-primary'>
                        <PlusCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true"/>
                        Create
                    </Link>
                </div>
            </div>
        {/* 
            <CardContainer margin='mt-7'>
                <div className='flex space-x-3'>
                    <SelectInputText state={search} setState={setSearch} className='max-w-sm'/>
                    <div className='self-center'>
                        <button className='ml-3 text-blue-900 text-opacity-50' onClick={handleClear}>
                            Clear
                        </button>
                    </div>

                </div>
            </CardContainer> 
        */}

             {/* TABLE */}
             {
                !quizzes.length &&
                <div className="w-full mt-7">
                    <div className='flex justify-center align-middle'>
                        <span> No quizzes found</span>
                    </div>
                </div>

                
            }
            {
                quizzes.length !== 0 &&
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
            }
            
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