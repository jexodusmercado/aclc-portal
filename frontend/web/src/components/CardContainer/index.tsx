import React from 'react'
import { classNames } from 'utility'

type Size = 'xs' | 'sm' | 'md' | 'lg' |'xl'
interface Props {
    margin?: string
    padding?: string
    border?: boolean
    borderColor?: string
    rounded?: boolean,
    roundedSize?: Size,
    shadow?: boolean
    shadowSize?: Size
    footer?: boolean
    submitText?: string
    cancelText?: string
    loading?: boolean
    submitOnclick?: () => void
    cancelOnclick?: () => void
}

/**
 * @param padding optional - string
 * @param margin optional - string
 * @param border defaults true - boolean
 * @param borderColor defaults to gray-100 - tailwind color
 * @param rounded defaults true - boolean
 * @param roundedSize ["xs", "sm", "md", "lg", "xl"] - Size
 * @param shadow defaults true - boolean
 * 
 */
const Card: React.FC<Props> = ({children, padding, margin, border=true, borderColor, rounded=true, roundedSize, shadow=true, shadowSize, footer, loading, submitText="Submit", submitOnclick, cancelText="Cancel", cancelOnclick}) => {

    return(
        <div
        className={
            classNames(
                shadow ? (shadowSize ? `shadow-${shadowSize}` : "shadow") : "",
                rounded ? (roundedSize ? `rounded-${roundedSize}` : "rounded") : "",
                border ? "border" : "",
                borderColor ? `border-${borderColor}` : "border-gray-100",
                "bg-white"
            )
        }>

            <div className={
                classNames(
                    padding ? padding : "px-3 py-3 sm:px-6",
                    margin ? margin : "",
                )
            }>
                {children}

            </div>

            {
                footer &&
                <div className='flex px-5 py-3 border-t border-opacity-50 border-gray-200 bg-gray-100 items-center justify-end space-x-3'>

                    <button 
                        onClick={cancelOnclick}
                        disabled={loading}
                        className="text-sm text-blue-700 text-opacity-50"
                    >
                        {cancelText}
                    </button>

                    <button 
                        onClick={submitOnclick}
                        className="button-primary"
                        disabled={loading}
                    >
                        {
                            loading &&
                                <div className="w-3 h-3 border-t-transparent border border-white border-solid rounded-full animate-spin mr-1"/>
                        }
                        {submitText}
                    </button>
                    
                </div>
            }
            

        </div>

    )
}

export default Card