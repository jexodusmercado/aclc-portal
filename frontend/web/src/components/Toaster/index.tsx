import React from 'react'
import toast, { ToastBar, Toaster, ToastPosition, DefaultToastOptions, Toast } from "react-hot-toast"
import { XIcon } from '@heroicons/react/solid';

export interface ToasterProps {
    position?: ToastPosition
    toastOptions?: DefaultToastOptions
    reverseOrder?: boolean
    gutter?: number
    containerStyle?: React.CSSProperties
    containerClassName?: string
    children?: (toast: Toast) => JSX.Element
}

const ToasterNotification = (Props: ToasterProps) => {
    return (
        <>
            <Toaster
             { ...Props}
            >
                {(t) => (
                    <ToastBar toast={t}  position={Props.position} >
                    {({ icon, message }) => (
                        <>
                            {icon}
                            {message}
                            {t.type !== 'loading' && (
                                <button onClick={() => toast.dismiss(t.id)}> 
                                    <XIcon className="h-5 w-5 text-gray-500" />
                                </button>
                            )}
                        </>
                    )}
                    </ToastBar>
                )}
            </Toaster>
        </>
    )
}

export default ToasterNotification;