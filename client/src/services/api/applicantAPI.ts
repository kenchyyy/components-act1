import axios from "axios"

const URL = "http://localhost:3009/applicant"
const userAPI = axios.create({baseURL: URL})

export const getApplicants = async () => {
    return (await userAPI.get('/')).data
}

export const createApplicant = async (applicant: any) => {
    return (await userAPI.post('/', applicant)).data
}

export const deleteApplicant = async (id: number) => {
    return (await userAPI.delete(`/${id}`)).data
}

export const updateApplicant = async (id: number, applicant: any) => {
    return (await userAPI.put(`/${id}`, applicant)).data
}