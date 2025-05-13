import axios from "axios"

const URL = "http://localhost:3009/tasks"
const taskAPI = axios.create({baseURL: URL})

export const getTasks = async () => {
    return (await taskAPI.get('/')).data
}

export const addTask = async (task: any) => {
    return (await taskAPI.post('/', task)).data
}

export const deleteTask = async (id: number) => {
    return (await taskAPI.delete(`/${id}`)).data
}

export const updateTask = async (id: number, task: any) => {
    return (await taskAPI.put(`/${id}`, task)).data
}