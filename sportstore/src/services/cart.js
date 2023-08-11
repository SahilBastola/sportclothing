import axios from "axios";
const baseUrl = "http://localhost:4000/cart"

function getAll() {
    
    const config = {
        headers:
        {
            Authorization:
                `bearer ${window.localStorage.getItem('token')}`
        }
    }
    return axios.get(`${baseUrl}/mycart`, config)
}

function create(newBook) {
    const config = {
        headers:
        {
            Authorization:
                `bearer ${window.localStorage.getItem('token')}`
        }
    }
    return axios.post(baseUrl, newBook, config)
}

export default { getAll, create }