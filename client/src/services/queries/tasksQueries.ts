import { getTasks } from "../api/taskAPI"
import { useQuery } from "@tanstack/react-query"
import { Task } from "../../types/Task"

export const useGetTasks = () => {
    return useQuery<Task[], Error>({
        queryKey: ["tasks"],
        queryFn: () => getTasks(),
    })
}

export const useGetTaskById = (id: string) => {
    return useQuery<Task, Error>({
        queryKey: ["tasks", id],
        queryFn: () => getTasks().then((tasks) => tasks.find((task) => task.id === id)),
        enabled: !!id,
    })
}