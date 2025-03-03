import { ActionButton } from "./components/ActionButton";
import { useGetUsers } from "./services/queries/userQueries";
import React from "react";

function App() {
  const { data } = useGetUsers();
  const handleClick = () => {
    console.log("I have been cliqued");
  };
  // const handleClickAgain = () => {
  //   console.log("I have been cliqued again");
  // };
  return (
    <div className='flex gap-10 items-center w-screen justify-center'>
      {data?.map((user) => {
        return (
          <ActionButton
            key={user.id}
            onClick={handleClick}
            label={user.name ?? "ILY"}
            size='small'
          />
        );
      })}
    </div>
  );
}

export default App;
