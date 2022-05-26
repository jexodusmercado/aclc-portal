import { AxiosError } from "axios";

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

export const debounce = (func: (...args: any[]) => any, timeout: number = 300) => {
    let timer: NodeJS.Timeout | undefined;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}