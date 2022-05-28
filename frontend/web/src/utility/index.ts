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