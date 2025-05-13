// // import { ActionButton } from "./components/ActionButton";
// // import { useGetUsers } from "./services/queries/userQueries";
// import React from "react";
// import { Applicant } from "./types/Applicant";
// import { EmployeeTable } from "./components/EmployeeTable";
// import { useGetEmployees } from "./services/queries/employeeQueries";
// import { ApplicantForm } from "./components/ApplicantForm";
// import {
//   useCreateApplicant,
//   useUpdateApplicant,
//   useDeleteApplicant,
// } from "./services/mutations/applicantmutations";
// import { useGetApplicants } from "./services/queries/applicantQueries";

// function App() {
//   // const { userData } = useGetUsers();
//   // const { data, isSuccess } = useGetEmployees();
//   const createApplicant = useCreateApplicant();
//   const updateApplicant = useUpdateApplicant();
//   const deleteApplicant = useDeleteApplicant();
//   const [formData, setFormData] = React.useState<Applicant>({
//     firstName: "",
//     lastName: "",
//     groupName: "",
//     role: "",
//     expectedSalary: 0,
//     expectedDateOfDefense: "",
//   });
//   const [editingApplicant, setEditingApplicant] =
//     React.useState<Applicant | null>(null);

//   const handleClick = () => {
//     console.log("I have been cliqued");
//   };
//   const handleSubmit = (applicant) => {
//     console.log("Submitting applicant", applicant);
//     if (editingApplicant) {
//       updateApplicant.mutate({ ...applicant, id: editingApplicant.id });
//       setEditingApplicant(null);
//     } else {
//       const { id, ...newApplicant } = applicant;
//       createApplicant.mutate(applicant);
//     }
//     setFormData({
//       firstName: "",
//       lastName: "",
//       groupName: "",
//       role: "",
//       expectedSalary: 0,
//       expectedDateOfDefense: "",
//     });
//   };

//   const handleEdit = (applicant) => {
//     setEditingApplicant(applicant);
//   };

//   const { data: applicants, isSuccess } = useGetApplicants();
//   // const handleClickAgain = () => {
//   //   console.log("I have been cliqued again");
//   // };
//   return (
//     // <div>
//     //   {isSuccess ? (
//     //     <div className='flex gap-10 items-center w-screen justify-center'>
//     //       <EmployeeTable
//     //         employees={data.filter((employee) => employee.salary < 50000)}
//     //         label='Entry Level'
//     //       />
//     //       <EmployeeTable
//     //         employees={data.filter((employee) => employee.salary >= 50000)}
//     //         label='Seniors'
//     //       />
//     //     </div>
//     //   ) : (
//     //     <h1>Loading...</h1>
//     //   )}
//     // </div>
//     // <div className='flex gap-10 items-center w-screen justify-center'>
//     //   <ApplicantForm
//     //     onSubmit={handleSubmit}
//     //     label={editingApplicant ? "Edit Applicant" : "Submit"}
//     //     initialData={editingApplicant}
//     //   />
//     //   <div className='mt-8'>
//     //     <h2 className='text-xl font-bold text-center mb-4'>
//     //       Submitted Applicants
//     //     </h2>
//     //     <table className='min-w-full bg border border-gray-300'>
//     //       <thead>
//     //         <tr>
//     //           <th className='py-2 px-4 border-b'>Name</th>
//     //           <th className='py-2 px-4 border-b'>Group</th>
//     //           <th className='py-2 px-4 border-b'>Role</th>
//     //           <th className='py-2 px-4 border-b'>Expected Salary</th>
//     //           <th className='py-2 px-4 border-b'>Defense Date</th>
//     //           <th className='py-2 px-4 border-b'>Actions</th>
//     //         </tr>
//     //       </thead>
//     //       <tbody>
//     //         {applicants?.map((applicant) => (
//     //           <tr
//     //             key={applicant.id}
//     //             className='hover:bg-amber-900-50 bg-transparent'
//     //           >
//     //             <td className='py-2 px-4 border-b'>
//     //               {applicant.firstName} {applicant.lastName}
//     //             </td>
//     //             <td className='py-2 px-4 border-b'>{applicant.groupName}</td>
//     //             <td className='py-2 px-4 border-b'>{applicant.role}</td>
//     //             <td className='py-2 px-4 border-b'>
//     //               ${applicant.expectedSalary}
//     //             </td>
//     //             <td className='py-2 px-4 border-b'>
//     //               {applicant.expectedDateOfDefense}
//     //             </td>
//     //             <td className='py-2 px-4 border-b'>
//     //               <button
//     //                 className='bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2'
//     //                 onClick={() => handleEdit(applicant)}
//     //               >
//     //                 Edit
//     //               </button>
//     //               <button
//     //                 className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'
//     //                 onClick={() => applicant.id !== undefined && deleteApplicant.mutate(applicant.id)}
//     //               >
//     //                 Delete
//     //               </button>
//     //             </td>
//     //           </tr>
//     //         ))}
//     //       </tbody>
//     //     </table>
//     //   </div>
//     // </div>
//     <div></div>
//   );
// }

// export default App;

"use client";

import { useState } from "react";
import { TaskFactory } from "./components/TaskFactory";
import { TaskAdapter } from "./lib/TaskAdapter";
import type { Task } from "./types/Task";
import { Notification } from "./components/Notification";
import { Button } from "./components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { PlusCircle, Clock, AlertCircle, Edit, Loader2 } from "lucide-react";
import { useGetTasks } from "./services/queries/tasksQueries";
import { Skeleton } from "./components/ui/taskskeleton";
import { useTaskManager } from "./lib/TaskManager";
import { EditTaskModal } from "./components/EditTaskModal";
import {
  useAddTask,
  useUpdateTask,
  useDeleteTask,
} from "./services/mutations/taskMutations";

export default function TodoApp() {
  const [sortStrategy, setSortStrategy] = useState<"date" | "name" | "id">(
    "date"
  );
  const [newTaskType, setNewTaskType] = useState<
    "basic" | "timed" | "checklist"
  >("basic");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [loadingTaskIds, setLoadingTaskIds] = useState<Set<string | number>>(
    new Set()
  );

  // React Query hooks
  const { data: rawTasks, isLoading, isError, error } = useGetTasks();

  const addTaskMutation = useAddTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  // Use the TaskManager singleton
  const taskManager = useTaskManager();

  // Adapt tasks from API format
  const tasks = rawTasks ? TaskAdapter.adaptTasks(rawTasks) : [];

  const getSortedTasks = () => {
    switch (sortStrategy) {
      case "date":
        return taskManager.sortTasksByDate(tasks);
      case "name":
        return taskManager.sortTasksByName(tasks);
      case "id":
        return taskManager.sortTasksById(tasks);
      default:
        return tasks;
    }
  };

  const handleAddTask = (newTask: Task) => {
    addTaskMutation.mutate(newTask);
    setShowAddForm(false);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleSaveEditedTask = (updatedTask: Task) => {
    setLoadingTaskIds((prev) => new Set(prev).add(updatedTask.id));
    updateTaskMutation.mutate(updatedTask, {
      onSettled: () => {
        setLoadingTaskIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(updatedTask.id);
          return newSet;
        });
        setEditingTask(null);
      },
    });
  };

  const handleRemoveTask = (taskId: string | number) => {
    setLoadingTaskIds((prev) => new Set(prev).add(taskId));
    const numericId =
      typeof taskId === "string" ? Number.parseInt(taskId, 10) : taskId;
    deleteTaskMutation.mutate(numericId, {
      onSettled: () => {
        setLoadingTaskIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(taskId);
          return newSet;
        });
      },
    });
  };

  const handleToggleComplete = (task: Task) => {
    setLoadingTaskIds((prev) => new Set(prev).add(task.id));
    const updatedTask = {
      ...task,
      completed: !task.completed,
    };
    updateTaskMutation.mutate(updatedTask, {
      onSettled: () => {
        setLoadingTaskIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(task.id);
          return newSet;
        });
      },
    });
  };

  const sortedTasks = getSortedTasks();
  const hasOverdueTasks = taskManager.hasOverdueTasks(sortedTasks);

  if (isLoading) {
    return (
      <div className='container mx-auto p-4 max-w-4xl'>
        <h1 className='text-3xl font-bold mb-6'>To-Do List Application</h1>
        <div className='space-y-4'>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className='border rounded-lg p-4'>
              <Skeleton className='h-6 w-3/4 mb-2' />
              <Skeleton className='h-4 w-1/2 mb-4' />
              <div className='flex justify-end gap-2'>
                <Skeleton className='h-8 w-24' />
                <Skeleton className='h-8 w-16' />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='container mx-auto p-4 max-w-4xl'>
        <h1 className='text-3xl font-bold mb-6'>To-Do List Application</h1>
        <div className='p-4 border border-destructive rounded-lg bg-destructive/10 text-destructive'>
          <h2 className='text-lg font-medium mb-2'>Error loading tasks</h2>
          <p>{error?.message || "An unknown error occurred"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4 max-w-4xl'>
      <h1 className='text-3xl font-bold mb-6'>To-Do List Application</h1>

      {hasOverdueTasks && (
        <Notification
          message='You have overdue tasks that need attention!'
          type='warning'
        />
      )}

      <div className='flex justify-between items-center mb-6'>
        <div className='flex items-center gap-2'>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className='flex items-center gap-2'
          >
            <PlusCircle className='h-4 w-4' />
            Add Task
          </Button>

          <div className='ml-4'>
            <Select
              value={newTaskType}
              onValueChange={(value) =>
                setNewTaskType(value as "basic" | "timed" | "checklist")
              }
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Task Type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='basic'>Basic Task</SelectItem>
                <SelectItem value='timed'>Timed Task</SelectItem>
                <SelectItem value='checklist'>Checklist Task</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Select
            value={sortStrategy}
            onValueChange={(value) =>
              setSortStrategy(value as "date" | "name" | "id")
            }
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='date'>Sort by Date</SelectItem>
              <SelectItem value='name'>Sort by Name</SelectItem>
              <SelectItem value='id'>Sort by ID</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {showAddForm && (
        <div className='mb-6 p-4 border rounded-lg bg-muted/50'>
          <h2 className='text-lg font-medium mb-4'>
            Add New {newTaskType.charAt(0).toUpperCase() + newTaskType.slice(1)}{" "}
            Task
          </h2>
          <TaskFactory
            type={newTaskType}
            onAddTask={handleAddTask}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      <div className='space-y-4'>
        {sortedTasks.map((task) => {
          const isLoading = loadingTaskIds.has(task.id);

          return (
            <div
              key={task.id}
              className='relative border rounded-lg p-4 hover:shadow-md transition-shadow'
            >
              <div className='flex justify-between items-start'>
                <div className='flex-1'>
                  <div className='flex items-center gap-2'>
                    <h3
                      className={`text-xl font-medium ${
                        task.completed
                          ? "line-through text-muted-foreground"
                          : ""
                      }`}
                    >
                      {task.title}
                    </h3>

                    {task.isOverdue && !task.completed && (
                      <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive'>
                        <AlertCircle className='h-3 w-3 mr-1' />
                        Overdue
                      </span>
                    )}
                  </div>

                  {task.description && (
                    <p className='text-muted-foreground mt-1'>
                      {task.description}
                    </p>
                  )}

                  {task.type === "checklist" && task.items && (
                    <ul className='mt-2 space-y-1'>
                      {task.items.map((item, index) => (
                        <li key={index} className='flex items-center gap-2'>
                          <input
                            type='checkbox'
                            checked={item.completed}
                            readOnly
                            className='h-4 w-4'
                          />
                          <span
                            className={
                              item.completed
                                ? "line-through text-muted-foreground"
                                : ""
                            }
                          >
                            {item.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {task.dueDate && (
                    <p
                      className={`text-sm mt-2 flex items-center gap-1 ${
                        task.isOverdue && !task.completed
                          ? "text-destructive"
                          : ""
                      }`}
                    >
                      <Clock className='h-3 w-3' />
                      Due: {new Date(task.dueDate).toLocaleString()}
                    </p>
                  )}
                </div>

                <div className='flex gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handleEditTask(task)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className='h-4 w-4 animate-spin' />
                    ) : (
                      <Edit className='h-4 w-4 mr-1' />
                    )}
                    Edit
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handleToggleComplete(task)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className='h-4 w-4 animate-spin mr-1' />
                    ) : null}
                    {task.completed ? "Mark Incomplete" : "Complete"}
                  </Button>
                  <Button
                    variant='destructive'
                    size='sm'
                    onClick={() => handleRemoveTask(task.id)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className='h-4 w-4 animate-spin' />
                    ) : null}
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          );
        })}

        {sortedTasks.length === 0 && (
          <div className='text-center p-8 border rounded-lg bg-muted/50'>
            <p className='text-muted-foreground'>
              No tasks found. Add some tasks to get started!
            </p>
          </div>
        )}
      </div>

      <EditTaskModal
        task={editingTask}
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        onSave={handleSaveEditedTask}
      />
    </div>
  );
}
