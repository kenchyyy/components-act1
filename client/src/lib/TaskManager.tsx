"use client";

import type { Task } from "../types/Task";
import {
  useAddTask,
  useUpdateTask,
  useDeleteTask,
} from "../services/mutations/taskMutations";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

// Singleton Pattern
class TaskManagerClass {
  private static instance: TaskManagerClass;

  private constructor() {
    // Private constructor to prevent instantiation
  }

  public static getInstance(): TaskManagerClass {
    if (!TaskManagerClass.instance) {
      TaskManagerClass.instance = new TaskManagerClass();
    }
    return TaskManagerClass.instance;
  }

  // Non-hook methods that don't depend on React Query
  public sortTasksByDate(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }

  public sortTasksByName(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
  }

  public sortTasksById(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => {
      const aId = typeof a.id === "string" ? Number.parseInt(a.id, 10) : a.id;
      const bId = typeof b.id === "string" ? Number.parseInt(b.id, 10) : b.id;
      return Number(aId) - Number(bId);
    });
  }

  public hasOverdueTasks(tasks: Task[]): boolean {
    return tasks.some((task) => task.isOverdue && !task.completed);
  }

  public filterTasksByType(tasks: Task[], type: string): Task[] {
    return tasks.filter((task) => task.type === type);
  }

  public filterCompletedTasks(tasks: Task[]): Task[] {
    return tasks.filter((task) => task.completed);
  }

  public filterIncompleteTasks(tasks: Task[]): Task[] {
    return tasks.filter((task) => !task.completed);
  }

  public filterOverdueTasks(tasks: Task[]): Task[] {
    return tasks.filter((task) => task.isOverdue && !task.completed);
  }
}

export const TaskManager = TaskManagerClass.getInstance();

// Custom hook to use TaskManager with React Query
export function useTaskManager() {
  const addTaskMutation = useAddTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();
  const queryClient = useQueryClient();

  const mutations = useMemo(
    () => ({
      addTask: (task: Task, options?: any) => {
        return addTaskMutation.mutate(task, options);
      },
      updateTask: (task: Task, options?: any) => {
        return updateTaskMutation.mutate(task, options);
      },
      editTask: (task: Task, options?: any) => {
        if (task.dueDate) {
          const now = new Date();
          const dueDate = new Date(task.dueDate);
          task.isOverdue = dueDate < now;
        }
        return updateTaskMutation.mutate(task, options);
      },
      deleteTask: (taskId: string | number, options?: any) => {
        const numericId =
          typeof taskId === "string" ? Number.parseInt(taskId, 10) : taskId;
        return deleteTaskMutation.mutate(numericId, options);
      },
      toggleTaskComplete: (task: Task, options?: any) => {
        return updateTaskMutation.mutate(
          {
            ...task,
            completed: !task.completed,
          },
          options
        );
      },
      checkOverdueTasks: (tasks: Task[]): Task[] => {
        const now = new Date();

        return tasks.map((task) => {
          if (task.dueDate) {
            const dueDate = new Date(task.dueDate);
            return { ...task, isOverdue: dueDate < now };
          }
          return task;
        });
      },
      invalidateTasksCache: () => {
        return queryClient.invalidateQueries({ queryKey: ["tasks"] });
      },
    }),
    [addTaskMutation, updateTaskMutation, deleteTaskMutation, queryClient]
  );

  return {
    ...mutations,
    sortTasksByDate: TaskManager.sortTasksByDate,
    sortTasksByName: TaskManager.sortTasksByName,
    sortTasksById: TaskManager.sortTasksById,
    hasOverdueTasks: TaskManager.hasOverdueTasks,
    filterTasksByType: TaskManager.filterTasksByType,
    filterCompletedTasks: TaskManager.filterCompletedTasks,
    filterIncompleteTasks: TaskManager.filterIncompleteTasks,
    filterOverdueTasks: TaskManager.filterOverdueTasks,
  };
}
