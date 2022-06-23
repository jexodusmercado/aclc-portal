import React from 'react'

interface IProp {
    picture:        File | undefined
    setPicture:     React.Dispatch<React.SetStateAction<File | undefined>>
    fileOnChange:   React.ChangeEventHandler<HTMLInputElement> | undefined
}

const ImageUploader: React.FC<IProp> = ({picture, setPicture, fileOnChange}) => {
    return (
        <div className="mt-1 flex items-center">
            {
                picture &&
                <>
                    <img
                        className="inline-block h-14 w-14 rounded-full"
                        src={URL.createObjectURL(picture)}
                        alt=""
                    />
                    <button
                        className='ml-5 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        onClick={() => setPicture(undefined)}
                    >
                        Cancel
                    </button>
                </>
            }

            {
                !picture &&
                <>
                <span className="inline-block bg-gray-100 rounded-full overflow-hidden h-12 w-12">
                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </span>
                <label
                    htmlFor='attachment'
                    className="ml-5 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Upload
                </label>
                <input type='file' id='attachment' name='attachement' onChange={fileOnChange} hidden />
            </>
            }
        </div>
    )
}

export default ImageUploader