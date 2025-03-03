import axios from "axios"

const URL = "http://localhost:3009/users"
const userAPI = axios.create({baseURL: URL})

export const getUsers = async () => {
    return (await userAPI.get('/')).data
}