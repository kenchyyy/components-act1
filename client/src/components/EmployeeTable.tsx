import React from "react";
import { Employee } from "../types/Employee";

interface EmployeeTableProps {
  employees: Employee[];
  label: string;
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  label,
}) => {
  return (
    <div>
      <h1 className='bg-gray-500 rounded-t-xl p-5 text-xs text-center font-serif'>
        {label}
      </h1>
      <table className='w-full flex flex-col'>
        <thead>
          <tr className='bg-gray-400 flex flex-row gap-9 p-2 justify-around font-mono text-2xl'>
            <th>Name</th>
            <th>Role</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody className='bg-gray-300 rounded-b-xl p-3 text-amber-950'>
          {employees?.map((employee) => {
            return (
              <tr
                key={employee.id}
                className='flex flex-row gap-20 align-text-bottom p-4'
              >
                <td className='w-full font-semibold'>{employee.name}</td>
                <td className='w-full font-semibold'>{employee.role}</td>
                <td className='w-full font-semibold'>{employee.salary}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
