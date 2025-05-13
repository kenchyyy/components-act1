import type { Task, RawTask } from "../types/Task";

// Adapter Pattern
export class TaskAdapter {
  static adaptTasks(rawTasks: RawTask[]): Task[] {
    const now = new Date();

    return rawTasks.map((rawTask) => {
      // Convert raw task to our internal Task format
      const task: Task = {
        id: rawTask.id,
        title: rawTask.title,
        description: rawTask.description,
        dueDate: rawTask.dueDate,
        completed: rawTask.completed || false,
        type: (rawTask.type as "basic" | "timed" | "checklist") || "basic",
      };

      if (rawTask.items && Array.isArray(rawTask.items)) {
        task.items = rawTask.items.map((item) => ({
          text: typeof item === "string" ? item : item.text || "",
          completed: typeof item === "object" ? item.completed || false : false,
        }));
      }

      if (task.dueDate) {
        const dueDate = new Date(task.dueDate);
        task.isOverdue = dueDate < now;
      }

      return task;
    });
  }

  static prepareTaskForApi(task: Task): any {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      completed: task.completed,
      type: task.type,
      items: task.items,
    };
  }
}
