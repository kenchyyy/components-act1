import React, { useState, useEffect } from "react";
import { Applicant } from "../types/Applicant";

interface ApplicantFormProps {
  onSubmit: (applicant) => void;
  label: string;
  initialData?: Applicant | null;
}

export const ApplicantForm: React.FC<ApplicantFormProps> = ({
  onSubmit,
  label,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    groupName: "",
    role: "",
    expectedSalary: 0,
    expectedDateOfDefense: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({
        firstName: "",
        lastName: "",
        groupName: "",
        role: "",
        expectedSalary: 0,
        expectedDateOfDefense: "",
      });
    }
  };;
  return (
    <div className='w-full max-w-sm justify-self-center'>
      <form className='max-w-sm mx-auto' onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label
            htmlFor='firstName'
            className='block mb-2 text-sm font-normal text-amber-200 dark:text-white'
          >
            First Name
          </label>
          <input
            type='text'
            id='firstName'
            value={formData.firstName}
            onChange={handleChange}
            className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:placeholder-gray-400'
            placeholder='John'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='lastName'
            className='block mb-2 text-sm font-normal text-amber-200 dark:text-white'
          >
            Last Name
          </label>
          <input
            type='text'
            id='lastName'
            value={formData.lastName}
            onChange={handleChange}
            className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:placeholder-gray-400'
            placeholder='Doe'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='groupName'
            className='block mb-2 text-sm font-normal text-amber-200 dark:text-white'
          >
            Group Name
          </label>
          <input
            type='text'
            id='groupName'
            value={formData.groupName}
            onChange={handleChange}
            className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:placeholder-gray-400'
            placeholder='Gaang'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='role'
            className='block mb-2 text-sm font-normal text-amber-200 dark:text-white'
          >
            Role
          </label>
          <input
            type='text'
            id='role'
            value={formData.role}
            onChange={handleChange}
            className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:placeholder-gray-400'
            placeholder='Junior Developer'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='expectedSalary'
            className='block mb-2 text-sm font-normal text-amber-200 dark:text-white'
          >
            Expected Salary
          </label>
          <input
            type='number'
            id='expectedSalary'
            value={formData.expectedSalary}
            onChange={handleChange}
            className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:placeholder-gray-400'
            placeholder='20000'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='expectedDateOfDefense'
            className='block mb-2 text-sm font-normal text-amber-200 dark:text-white'
          >
            Expected Defense Date
          </label>
          <input
            type='text'
            id='expectedDateOfDefense'
            value={formData.expectedDateOfDefense}
            onChange={handleChange}
            className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:placeholder-gray-400'
            placeholder='03/20/2025'
            required
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
