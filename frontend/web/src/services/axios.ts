import axios from 'axios';
import { BASE_URL } from './api'

type Headers = {
  'Authorization'?                : string,
  'Content-Type'                  : string,
  'Access-Control-Allow-Origin'   : string,
  'Access-Control-Allow-Headers'  : string

}

export const HEADERS : Headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': 'http://localhost:8000',
    'Access-Control-Allow-Headers': 'access-control-allow-origin, access-control-allow-headers'
}

// AXIOS INSTANCE BELOW
export const apiInstance = axios.create({
    baseURL: BASE_URL,
})