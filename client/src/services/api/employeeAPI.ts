import axios from "axios"

const URL = "http://localhost:3009/employees"
const userAPI = axios.create({baseURL: URL})

export const getEmployees = async () => {
    return (await userAPI.get('/')).data
}