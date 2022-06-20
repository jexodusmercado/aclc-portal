import { useIsomorphicLayoutEffect } from "hooks";
import { useState } from "react";
import { classNames } from "utility";

interface IProps {
    name: string;
    avatar?: string;
    width?: number;
    height?: number;
    rounded?: boolean,
    fontColor?: string,
    fontSize?: string,
    color?: string,
  }

const Avatar: React.FC<IProps> = ({name, avatar, width, height, rounded, fontColor, fontSize, color}) => {
    const [isError, setIsError] = useState<boolean>(false);
    const [initials, setInitials] = useState<string>('')

    const extractNameInitials = (name: string) => {
        let initials = "";
        const names = name.split(' ');
        initials = names[0].substring(0, 1).toUpperCase();
        
        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials
    }

    useIsomorphicLayoutEffect(() => {
        if(name || name.length) {
            const extracted = extractNameInitials(name)
            setInitials(extracted)
        }
    }, [name])

    useIsomorphicLayoutEffect(() => {
        if(avatar){
            setIsError(false)
        }
    }, [avatar])

    return isError
        ? 
        <span className={classNames(
            height ? `h-${height}` : "h-10",
            width ? `w-${width}` : "w-10",
            rounded ? "rounded-full" : "",
            "inline-flex items-center justify-center bg-blue-700 border border-white"
        )}>
            <span className={classNames(
                fontSize ? `text-${fontSize}` : "text-base",
                fontColor ? `text-${fontColor}` : "text-white",
                `font-medium leading-none`
            )}>{initials}</span>
        </span>
        : 
        <img
            className={classNames(
                height ? `h-${height}` : "h-full",
                width ? `w-${width}` : "w-full",
                rounded ? "rounded-full" : ""
            )}
            src={avatar ?? ''}
            alt={name}
            onError={() => setIsError(true)}
        />
}

export default Avatar;

