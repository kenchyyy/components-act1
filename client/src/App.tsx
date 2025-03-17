// import { ActionButton } from "./components/ActionButton";
// import { useGetUsers } from "./services/queries/userQueries";
import React from "react";
import { Applicant } from "./types/Applicant";
import { EmployeeTable } from "./components/EmployeeTable";
import { useGetEmployees } from "./services/queries/employeeQueries";
import { ApplicantForm } from "./components/ApplicantForm";
import {
  useCreateApplicant,
  useUpdateApplicant,
  useDeleteApplicant,
} from "./services/mutations/applicantmutations";
import { useGetApplicants } from "./services/queries/applicantQueries";


function App() {
  // const { userData } = useGetUsers();
  // const { data, isSuccess } = useGetEmployees();
  const createApplicant = useCreateApplicant();
  const updateApplicant = useUpdateApplicant();
  const deleteApplicant = useDeleteApplicant();
  const [editingApplicant, setEditingApplicant] =
    React.useState<Applicant | null>(null);

  const handleClick = () => {
    console.log("I have been cliqued");
  };
  const handleSubmit = (applicant) => {
    console.log("Submitting applicant", applicant);
    if (editingApplicant) {
      updateApplicant.mutate({ ...applicant, id: editingApplicant.id });
      setEditingApplicant(null);
    } else {
      const { id, ...newApplicant } = applicant;
      createApplicant.mutate(applicant);
    }
    setFormData({
      firstName: "",
      lastName: "",
      groupName: "",
      role: "",
      expectedSalary: 0,
      expectedDateOfDefense: "",
    });
  };
  };

  const handleEdit = (applicant) => {
    setEditingApplicant(applicant);
  };

  const { data: applicants, isSuccess } = useGetApplicants();
  // const handleClickAgain = () => {
  //   console.log("I have been cliqued again");
  // };
  return (
    // <div>
    //   {isSuccess ? (
    //     <div className='flex gap-10 items-center w-screen justify-center'>
    //       <EmployeeTable
    //         employees={data.filter((employee) => employee.salary < 50000)}
    //         label='Entry Level'
    //       />
    //       <EmployeeTable
    //         employees={data.filter((employee) => employee.salary >= 50000)}
    //         label='Seniors'
    //       />
    //     </div>
    //   ) : (
    //     <h1>Loading...</h1>
    //   )}
    // </div>
    <div className='flex gap-10 items-center w-screen justify-center'>
      <ApplicantForm
        onSubmit={handleSubmit}
        label={editingApplicant ? "Edit Applicant" : "Submit"}
        initialData={editingApplicant}
      />
      <div className='mt-8'>
        <h2 className='text-xl font-bold text-center mb-4'>
          Submitted Applicants
        </h2>
        <table className='min-w-full bg border border-gray-300'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b'>Name</th>
              <th className='py-2 px-4 border-b'>Group</th>
              <th className='py-2 px-4 border-b'>Role</th>
              <th className='py-2 px-4 border-b'>Expected Salary</th>
              <th className='py-2 px-4 border-b'>Defense Date</th>
              <th className='py-2 px-4 border-b'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicants?.map((applicant) => (
              <tr
                key={applicant.id}
                className='hover:bg-amber-900-50 bg-transparent'
              >
                <td className='py-2 px-4 border-b'>
                  {applicant.firstName} {applicant.lastName}
                </td>
                <td className='py-2 px-4 border-b'>{applicant.groupName}</td>
                <td className='py-2 px-4 border-b'>{applicant.role}</td>
                <td className='py-2 px-4 border-b'>
                  ${applicant.expectedSalary}
                </td>
                <td className='py-2 px-4 border-b'>
                  {applicant.expectedDateOfDefense}
                </td>
                <td className='py-2 px-4 border-b'>
                  <button
                    className='bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2'
                    onClick={() => handleEdit(applicant)}
                  >
                    Edit
                  </button>
                  <button
                    className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'
                    onClick={() => applicant.id !== undefined && deleteApplicant.mutate(applicant.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
