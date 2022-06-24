import React, { 
    Fragment, 
    useState 
} from 'react'

import { 
    DownloadIcon, 
    PencilAltIcon, 
    PlusCircleIcon, 
    PlusIcon, 
    XCircleIcon 
} from '@heroicons/react/solid'

import { 
    useEffectOnce, 
    useGetClassroom,
    useUserData
} from 'hooks'

import { order } from 'utility'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getClassroom } from 'redux/classroom/action'
import { FileIcon } from 'react-file-icon';
import { createCommentRequest } from 'redux/comment/action'
import Card from 'components/CardContainer'
import Feeds from 'components/Feeds'
import parse from 'html-react-parser'
import TextArea from 'components/TextArea'
import DotsVerticalDropdown from 'components/DotsVerticalDropdown'
import { PostDataState } from 'redux/post/types'
import PostFormModal from '../Modals/PostFormModal'
import ConfirmModal from 'components/Modals/ConfirmModal'
import { deletePostRequest } from 'redux/post/action'
import toast from 'react-hot-toast'
import { BASE_URL } from 'services/api'
import Avatar from 'components/Avatar'



const FacultyClassroomDetails = () => {
    const [comment, setComment]             = useState<string>('')
    const [createModal, setCreateModal]     = useState<boolean>(false)
    const [deleteModal, setDeleteModal]     = useState<boolean>(false)
    const [deleteID, setDeleteID]           = useState<string>('')
    
    const params                            = useParams()
    const dispatch                          = useDispatch()
    const classData                         = useGetClassroom()
    const navigate                          = useNavigate()
    const user                              = useUserData()

    const fetchData = () => {
        if(params?.id){
            dispatch(getClassroom({classroomId: params.id}))
        } else {
            navigate('/dashboard/classroom')
        }
    }

    const onCommentSuccess = () => {
        fetchData()
        setComment('')
    }

    const onPostDeleteSuccess = () => {
        fetchData()
        setDeleteModal(false)
        toast.success('Post deleted!')
    }

    const onPostDeleteFailed = () => {
        toast.success('Post deleted!')
    }

    const onPostSubmit = (id: number) => {
        dispatch(
            createCommentRequest({
                postId: id, 
                message:comment,
                onSuccess: onCommentSuccess,
            })
        )
    }

    const onDeletePost = () => {
        dispatch(
            deletePostRequest({
                classroomId: params.id!.toString(),
                postId: deleteID,
                onSuccess: onPostDeleteSuccess,
                onFailed: onPostDeleteFailed
            })
        )
    }

    const openDeleteModal = (post: PostDataState) => {
        setDeleteModal(true)
        setDeleteID(post.id.toString())
    }

    const menus = (post: PostDataState) => ([
        // {
        //     name: 'Update',
        //     onClick: () => console.log('update')
        // },
        {
            name: 'Delete',
            onClick: () => openDeleteModal(post)
        },
    ])

    useEffectOnce(() => {
        fetchData()
    })


    return(
        <>
            <div className='containerized space-y-4'>
                <div className='flex align-middle'>
                    <span className='space-y-1'>
                        <h3 className='leading-6 text-2xl mr-auto'>
                            { classData.data?.title }
                        </h3>
                        <h3 className='text-gray-400 text-base mr-auto'>
                            { classData.data?.subject?.name } - { classData.data?.subject?.code }
                        </h3>
                    </span>

                    <div className='ml-auto space-x-3'>
                        <button className='button-primary' onClick={() => setCreateModal(true)}>
                            <PlusIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true'/>
                            Create Post
                        </button>
                        <Link to={`/dashboard/classroom/update/${params.id}`} className='button-primary'>
                            <PencilAltIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true'/>
                            Update
                        </Link>
                        <Link to='/dashboard/classroom/' className='button-primary'>
                            <XCircleIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true'/>
                            View Quiz
                        </Link>
                    </div>
                </div>
                
                <div className='grid grid-cols-3 gap-4 pt-4 '>
                    <div className='col-span-2'>
                        {/* border */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="px-3 bg-gray-50 text-lg font-medium text-gray-900">Posts</span>
                            </div>
                        </div>

                        {
                            !classData.data?.posts &&
                            <div className='relative mt-8 border-2 rounded-lg border-gray-300 border-dashed p-10 hover:border-gray-400 cursor-pointer' onClick={() => setCreateModal(true)}>
                                <div className='relative flex justify-center'>
                                    <div className='basis-1/4 flex flex-col items-center space-y-2'>
                                        <PlusCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                        <span className='text-gray-400 font-bold text-sm'>CREATE NEW POST</span>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            classData.data?.posts &&
                            <div className='mt-5 space-y-10'>
                                {
                                    classData.data?.posts.map((post, index) => 
                                        <Fragment key={index}>
                                            <Card className='space-y-3'>
                                                {/* texts */}
                                                <div className='space-y-4'>
                                                    <div className='flex justify-between'>
                                                        <div className='flex flex-col'>
                                                            <span className='leading-6 text-xl mr-auto'> 
                                                                {post.title}
                                                            </span>
                                                            <span className='text-gray-500 text-sm'>
                                                                {post.author.full_name}
                                                            </span>
                                                        </div>

                                                        <div>
                                                        <div className="flex top">
                                                            <DotsVerticalDropdown menus={menus(post)} />
                                                        </div>
                                                        </div>
                                                    </div>
                                                    
                                                    
                                                    <div className='p-4 border-2 border-dashed bg-gray-50 text-sm h-auto'>
                                                        {parse(post.body)}
                                                    </div>
                                                </div>

                                                {/* attachments */}
                                                {
                                                    post.filename &&
                                                    <a 
                                                        href={`http://localhost:8000/download/${post.filename}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 space-x-2 cursor-pointer' 
                                                        // onClick={() =>onDownload(post.filename)}
                                                    >
                                                        <div className='h-4 w-4'>
                                                            <FileIcon extension={post.extension} />
                                                        </div>
                                                        <span className='text-sm truncate'>
                                                            {post.filename}
                                                        </span>
                                                        <div className='h-4 w-4'>
                                                            <DownloadIcon />
                                                        </div>
                                                    </a>
                                                }
                                                
                                                {/* comment area */}
                                                <div className='pt-5 space-y-3'>
                                                    {
                                                        post.comments && 
                                                        <Feeds lists={post.comments.map(comment => {
                                                            return {
                                                                id: comment.id,
                                                                message: comment.message,
                                                                full_name: comment.user.full_name,
                                                                image: comment.user.email,
                                                                createdAt: comment.created_at
                                                            }
                                                        })} />
                                                    }
                                                    <TextArea setState={setComment} onSubmit={() => onPostSubmit(post.id)} />
                                                </div>
                                            </Card>
                                        </Fragment>
                                    ).sort(order)
                                }
                            </div>
                        }
                        
                    </div>
                    <div>
                        <Card className='min-h-min'>
                            <div>
                                <h3 className='text-lg leading-6'>
                                    Students
                                </h3>
                            </div>
                            <div className='w-full'>
                                <ul className="divide-y divide-gray-200">
                                    {
                                        !classData.data?.student && <div> no students</div> 
                                    }

                                    {classData.data?.student && classData.data?.student.map((student) => (
                                        <li key={student.id} className="py-4 flex items-center">
                                            <Avatar
                                                rounded
                                                height={8}
                                                width={8}
                                                avatar={BASE_URL + student.image}
                                                name={student.first_name + " " + student.last_name}
                                            />
                                            {/* <img className="h-10 w-10 rounded-full" src={FILE_PATH + student.image} alt="" /> */}
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-900">{student.first_name} {student.last_name}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
            <PostFormModal 
                setCreateModal={setCreateModal} 
                createModal={createModal} 
                classroomId={Number(params.id)} 
                fetchData={fetchData} 
            />
            <ConfirmModal
                setOpen={setDeleteModal}
                open={deleteModal}
                title={'DELETE POST'}
                phrase={'Are you sure to delete this post? This action is irreversible.'}
                confirmButtonName={'Delete'}
                handleOnClick={onDeletePost}
            />
        </>
    )
}

export default FacultyClassroomDetails