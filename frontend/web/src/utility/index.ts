import { AxiosError } from "axios";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
interface ErrorPayload {
    status: number
    message: string
}

export const classNames = (...classes : string[]) => {
    return classes.filter(Boolean).join(' ')
}

export const handleAxiosError = (error: AxiosError): ErrorPayload | undefined => {

    if (!error.response) {
      console.log("No response error");
      console.log(error);
      return undefined
    }


    let payload: ErrorPayload = {
        status: error.response.status,
        message: error.response.data.error
    };
  
    return payload;
    
}

export const order = (a: any, b: any) => {
    return a < b ? ( a > b ? 1 : 0) : -1
}

export const timeConvertFromNow = (time: string) => {
    dayjs.extend(relativeTime)

    return dayjs(time).fromNow()
}

export const greetingTime = () => {
    const today = new Date()
    const curHr = today.getHours()

    if( curHr < 12) {
        return 'Good morning'
    } else if (curHr < 18) {
        return 'Good afternoon'
    } else {
        return 'Good evening'
    }
}

export const timeConvertFormat = (time: string) => {
    return dayjs(time).format('MMMM D, YYYY')
}