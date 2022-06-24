
import { PaperClipIcon } from '@heroicons/react/solid'
import { yupResolver } from '@hookform/resolvers/yup'
import Modal from 'components/Modal'
import { useUpdateEffect } from 'hooks'
import React, { useState } from 'react'
import { FileIcon } from 'react-file-icon'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import RichTextEditor, { EditorValue } from 'react-rte'
import { createPostRequest } from 'redux/post/action'
import * as yup from 'yup'

interface IPost {
    setCreateModal  : React.Dispatch<React.SetStateAction<boolean>>
    createModal     : boolean
    classroomId     : number
    fetchData       : () => void
}

interface IForm {
    classroomId:    number
    title:          string
    body:           string
    file:           File | null

}

const formSchema = yup.object({
    title: yup.string().trim().required('*Title is required'),
}).required()


const PostFormModal: React.FC<IPost> = ({setCreateModal, createModal, classroomId, fetchData}) => {
    const [richText, setRichText]       = useState<EditorValue>(RichTextEditor.createEmptyValue())
    const [extension, setExtension]     = useState<string>('')
    const [attachment, setAttachment]   = useState<File>()

    const dispatch                      = useDispatch()

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<IForm>({
        mode: "onChange",
        resolver: yupResolver(formSchema)
    })

    const onPostSuccess = () => {
        fetchData()
        setCreateModal(false)
        toast.success('Successfully created post')
    }

    const onPostFailed = () => {
        toast.error('Failed to create post.')
    }

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
            classroomId: classroomId,
            formdata: fd,
            onSuccess: onPostSuccess,
            onFailed: onPostFailed
        }))

        reset()
        setAttachment(undefined)
        setRichText(RichTextEditor.createEmptyValue())
    }


    useUpdateEffect(() => {
        if(!createModal){
            setValue('title', '')
            setAttachment(undefined)
            setRichText(RichTextEditor.createEmptyValue())
        }
    }, [createModal])

    return (
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
    )
}

export default PostFormModal