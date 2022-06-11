import React, { 
    Fragment, 
    useState 
} from 'react'

import RichTextEditor, {
    EditorValue
} from 'react-rte'

import { 
    DownloadIcon, 
    PaperClipIcon, 
    PencilAltIcon, 
    PlusCircleIcon, 
    PlusIcon, 
    XCircleIcon 
} from '@heroicons/react/solid'

import { 
    useEffectOnce, 
    useGetClassroom, 
    useIsomorphicLayoutEffect
} from 'hooks'

import { order } from 'utility'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getClassroom } from 'redux/classroom/action'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FileIcon } from 'react-file-icon';
import { createPostRequest } from 'redux/post/action'
import { createCommentRequest } from 'redux/comment/action'
import * as yup from 'yup'
import Card from 'components/CardContainer'
import Feeds from 'components/Feeds'
import Modal from 'components/Modal'
import parse from 'html-react-parser'
import toast from 'react-hot-toast'
import TextArea from 'components/TextArea'

interface IForm {
    classroomId:    number
    title:          string
    body:           string
    file:           File | null
}

const formSchema = yup.object({
    title: yup.string().trim().required('*Title is required'),
}).required()


const ClassroomDetails = () => {
    const params                            = useParams()
    const dispatch                          = useDispatch()
    const classData                         = useGetClassroom()

    const [attachment, setAttachment]       = useState<File>()
    const [extension, setExtension]         = useState<string>('')
    const [comment, setComment]             = useState<string>('')
    const [createModal, setCreateModal]     = useState<boolean>(false)
    const [richText, setRichText]           = useState<EditorValue>(RichTextEditor.createEmptyValue())


    const fetchData = () => {
        if(params?.id){
            dispatch(getClassroom({classroomId: params.id}))
        }
    }

    const onCommentSuccess = () => {
        fetchData()
        setComment('')
    }

    const onPostSuccess = () => {
        fetchData()
        setCreateModal(false)
        toast.success('Successfully created post')
    }

    const onPostFailed = () => {
        toast.error('Failed to create post.')
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

    const { register, handleSubmit, formState: { errors } } = useForm<IForm>({
        mode: "onChange",
        resolver: yupResolver(formSchema)
    })

    const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.length){
            console.log(e.target.files[0])
            setAttachment(e.target.files[0])
            setExtension(e.target.files[0].name.split(".").pop()!)
        }
        // console.log(e)
        // setExtension(e?.name.split(".").pop()!)
    }

    const onSubmit: SubmitHandler<IForm> = (data) => {
        const fd = new FormData()

        fd.append('title', data.title)
        fd.append('body', richText.toString('html'))
        if(attachment){
            fd.append('file', attachment)
        }
        
        dispatch(createPostRequest({
            classroomId: Number(params!.id),
            formdata: fd,
            onSuccess: onPostSuccess,
            onFailed: onPostFailed

        }))
    }


    useEffectOnce(() => {
        fetchData()
    })

    useIsomorphicLayoutEffect(() => {
        console.log(classData)
    }, [classData])

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
                            Archive
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
                                                    <div className='flex flex-col'>
                                                        <span className='leading-6 text-xl mr-auto'> 
                                                            {post.title}
                                                        </span>
                                                        <span className='text-gray-500 text-sm'>
                                                            {post.author.full_name}
                                                        </span>
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
                        <Card className='min-h-min h-52'>
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
                                            <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
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
            <Modal setOpen={setCreateModal} open={createModal}>
                <div className='leading-6 text-lg pb-2 mb-2 border-b-2 border-gray-200'>
                        Create Post
                </div>
                <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <div className="mt-1">
                            <input
                            type="text"
                            id="title"
                            className="input-text"
                            placeholder="Ex. Computer Science 1"
                            {...register('title')}
                            />
                        </div>
                        {errors.title && <p className='text-sm text-red-400'> {errors.title.message} </p>}
                    </div>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            Content
                        </label>
                        <RichTextEditor 
                            value={richText} 
                            onChange={setRichText} 
                            className='h-full'
                        />
                    </div>
                    <div className='flex justify-between'>
                        <div className='overflow-hidden relative'>
                            {
                                !attachment &&
                                <label htmlFor='attachment' className='cursor-pointer'>
                                    <input type='file' id='attachment' onChange={(e) => handleAttachment(e)} hidden />
                                    <PaperClipIcon className='h-5 w-5'/>
                                </label>
                            }

                            {
                                attachment &&
                                <div className="flex space-x-2 justify-center items-center">
                                    <div className='h-6 w-6'>
                                        <FileIcon extension={extension} />
                                    </div>
                                    <span className='text-sm truncate'>
                                        { attachment.name }
                                    </span>
                                </div>
                            }
                            
                        </div>

                        <button className='button-primary'>Post</button>
                    </div>
                    
                </form>
            </Modal>
        </>
    )
}

export default ClassroomDetails