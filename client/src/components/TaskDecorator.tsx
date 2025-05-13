import type React from "react";
import type { Task } from "../types/Task";
import { Clock, AlertCircle, CheckSquare } from "lucide-react";

// Decorator Pattern
interface TaskDecoratorProps {
  task: Task;
}

export function TaskDecorator({ task }: TaskDecoratorProps) {
  const BaseTask = () => (
    <div className='p-4 border rounded-lg'>
      <h3 className='font-medium'>{task.title}</h3>
      {task.description && (
        <p className='text-muted-foreground'>{task.description}</p>
      )}
    </div>
  );

  // Decorator for tasks with due dates
  const withDueDate = (WrappedComponent: React.FC) => {
    return () => (
      <div className='relative'>
        <WrappedComponent />
        {task.dueDate && (
          <div className='absolute top-2 right-2'>
            <Clock className='h-4 w-4 text-primary' />
          </div>
        )}
      </div>
    );
  };

  // Decorator for overdue tasks
  const withOverdueWarning = (WrappedComponent: React.FC) => {
    return () => (
      <div className='relative'>
        <WrappedComponent />
        {task.isOverdue && (
          <div className='absolute top-2 right-2'>
            <AlertCircle className='h-4 w-4 text-destructive' />
          </div>
        )}
      </div>
    );
  };

  // Decorator for checklist tasks
  const withChecklistItems = (WrappedComponent: React.FC) => {
    return () => (
      <div>
        <WrappedComponent />
        {task.type === "checklist" && task.items && task.items.length > 0 && (
          <div className='mt-2'>
            <CheckSquare className='h-4 w-4 inline mr-2' />
            <span className='text-sm'>{task.items.length} items</span>
          </div>
        )}
      </div>
    );
  };

  let DecoratedTask = BaseTask;

  if (task.dueDate) {
    DecoratedTask = withDueDate(DecoratedTask);
  }

  if (task.isOverdue) {
    DecoratedTask = withOverdueWarning(DecoratedTask);
  }

  if (task.type === "checklist") {
    DecoratedTask = withChecklistItems(DecoratedTask);
  }

  return <DecoratedTask />;
}
