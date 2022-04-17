import axios from 'axios';
import { BASE_URL } from './api'

type Headers = {
  'Authorization'?                : string,
  'Content-Type'                  : string,

}

export const HEADERS : Headers = {
    'Content-Type': 'application/json;charset=utf-8',
}

// AXIOS INSTANCE BELOW
export const apiInstance = axios.create({
    baseURL: BASE_URL,
})

//BEFORE SUBMITTING REQUEST
apiInstance.interceptors.request.use(
  (config) => {
      const token = localStorage.getItem("tk");
      if (token) {
          config.headers = {
          "Authorization": "Bearer " + token
          } 
      }

      return config;
  },
  error => {
      return Promise.reject(error);
  }
)