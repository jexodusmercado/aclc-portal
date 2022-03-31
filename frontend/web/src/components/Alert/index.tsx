import React from "react"
import { classNames } from 'utility'

interface Props {
    backgroundColor?: string
    iconColor?: string
    titleTextColor?: string
    descriptionColor?: string
    title: string
    description: string
    Icon?: (props: React.ComponentProps<'svg'>) => JSX.Element
}

const Alert : React.FC<Props> = ({backgroundColor, iconColor, titleTextColor, descriptionColor, title, description, Icon}) => {
    return (
    <div 
        className={
            classNames(
                backgroundColor ? backgroundColor : "bg-yellow-50",
                "rounded-md  p-4"
            )
        }
    >
        <div className="flex">
            <div className="flex-shrink-0">
                {
                    Icon && 
                    <Icon className={classNames(iconColor ? iconColor : "text-yellow-400" ,"h-5 w-5")} aria-hidden="true" />
                }
            </div>
            <div className="ml-3">
                <h3 className={classNames( titleTextColor ? titleTextColor : "text-yellow-800", "text-sm font-medium text-yellow-800")}>{title}</h3>
                
                <div className={classNames( descriptionColor ? descriptionColor : "text-yellow-700", "mt-2 text-sm")}>
                    <p>
                        {description}
                    </p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Alert;