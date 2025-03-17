import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query"
import { Applicant } from "../../types/Applicant";
import { createApplicant, updateApplicant, deleteApplicant } from "../api/applicantAPI";

export const useCreateApplicant = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (applicant: Applicant) => createApplicant(applicant),
        onMutate: () => {
            console.log("Mutated")
        },
        onSuccess: () => {
            console.log("Success")
    },
        onError: () => {
            console.log("Error")
        },
        onSettled: () => {
            queryClient.invalidateQueries()
        },
    })
}

export const useUpdateApplicant = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (applicant: Applicant) => updateApplicant(applicant.id, applicant),
        onMutate: () => {
            console.log("Mutated")
        },
        onSuccess: () => {
            console.log("Success")
    },
        onError: () => {
            console.log("Error")
        },
        onSettled: () => {
            queryClient.invalidateQueries()
        },
    })
}

export const useDeleteApplicant = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => deleteApplicant(id),
        onMutate: () => {
            console.log("Mutated")
        },
        onSuccess: () => {
            console.log("Success")
    },
        onError: () => {
            console.log("Error")
        },
        onSettled: (_, error) => {
            error ? console.log("Error") :
            queryClient.invalidateQueries()
        },
    })
}