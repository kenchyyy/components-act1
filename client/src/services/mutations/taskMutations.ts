import type { Task } from "../../types/Task"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addTask, updateTask, deleteTask } from "../api/taskAPI"

export const useAddTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (task: Task) => addTask(task),
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] })

      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"])

      if (previousTasks) {
        queryClient.setQueryData<Task[]>(["tasks"], [...previousTasks, newTask])
      }

      return { previousTasks }
    },
    onError: (err, newTask, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousTasks) {
        queryClient.setQueryData<Task[]>(["tasks"], context.previousTasks)
      }
    },
    onSettled: () => {
      // Always refetch after error or success to ensure data is in sync
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
  })
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (task: Task) => {
      if (task.id === undefined) {
        throw new Error("Task ID is undefined")
      }
      const taskId = typeof task.id === "string" ? Number.parseInt(task.id, 10) : task.id
      return updateTask(taskId, task)
    },
    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] })
      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"])

      if (previousTasks) {
        const updatedTasks = previousTasks.map((task) =>
          task.id === updatedTask.id ? { ...task, ...updatedTask } : task,
        )
        queryClient.setQueryData<Task[]>(["tasks"], updatedTasks)
      }

      return { previousTasks }
    },
    onError: (err, updatedTask, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData<Task[]>(["tasks"], context.previousTasks)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
  })
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onMutate: async (deletedTaskId) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] })

      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"])

      if (previousTasks) {
        const filteredTasks = previousTasks.filter((task) => {
          const taskId = typeof task.id === "string" ? Number.parseInt(task.id, 10) : task.id
          return taskId !== deletedTaskId
        })
        queryClient.setQueryData<Task[]>(["tasks"], filteredTasks)
      }

      return { previousTasks }
    },
    onError: (err, deletedTaskId, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData<Task[]>(["tasks"], context.previousTasks)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
  })
}
