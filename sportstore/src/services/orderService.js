import axios from 'axios'

const baseURL = "http://localhost:4000/auth"

const login = (credentials) =>{
      
    const config = {
        headers:
        {
            Authorization:
                `bearer ${window.localStorage.getItem('token')}`
        }
    }
    return axios.post(`${baseURL}/createOrder`,credentials,config)
}

const register = (userDetails) =>{
    return axios.post(`${baseURL}/registeruser`,userDetails)
}


export default {login,register}