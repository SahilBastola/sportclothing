import axios from 'axios'

const baseURL = "http://localhost:4000/auth"

const login = (credentials) =>{
    return axios.post(`${baseURL}/loginuser`,credentials)
}

const register = (userDetails) =>{
    return axios.post(`${baseURL}/registeruser`,userDetails)
}


export default {login,register}