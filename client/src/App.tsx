// import { ActionButton } from "./components/ActionButton";
// import { useGetUsers } from "./services/queries/userQueries";
import React from "react";
import { EmployeeTable } from "./components/EmployeeTable";
import { useGetEmployees } from "./services/queries/employeeQueries";

function App() {
  // const { userData } = useGetUsers();
  const { data, isSuccess } = useGetEmployees();

  const handleClick = () => {
    console.log("I have been cliqued");
  };
  // const handleClickAgain = () => {
  //   console.log("I have been cliqued again");
  // };
  return (
    <div>
      {isSuccess ? (
        <div className='flex gap-10 items-center w-screen justify-center'>
          <EmployeeTable
            employees={data.filter((employee) => employee.salary < 50000)}
            label='Entry Level'
          />
          <EmployeeTable
            employees={data.filter((employee) => employee.salary >= 50000)}
            label='Seniors'
          />
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default App;
