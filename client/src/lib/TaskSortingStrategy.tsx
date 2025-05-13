import type { Task } from "../types/Task";

// Strategy Pattern
export class TaskSortingStrategy {
  static sortByDate(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => {
      // Tasks without due dates go to the end
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;

      // Sort by due date (ascending)
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }

  static sortByName(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
  }

  static sortById(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => String(a.id).localeCompare(String(b.id)));
  }

  static sortByCompletion(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => {
      // Incomplete tasks first
      if (a.completed && !b.completed) return 1;
      if (!a.completed && b.completed) return -1;
      return 0;
    });
  }

  static sortByPriority(tasks: Task[], priorityKey: string): Task[] {
    return [...tasks].sort((a, b) => {
      const aPriority = a[priorityKey as keyof Task];
      const bPriority = b[priorityKey as keyof Task];

      if (typeof aPriority === "number" && typeof bPriority === "number") {
        return bPriority - aPriority; // Higher priority first
      }

      return 0;
    });
  }
}
