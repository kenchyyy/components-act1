import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { ActionButton } from "./components/ActionButton";

function App() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    console.log("I have been cliqued");
  };
  const handleClickAgain = () => {
    console.log("I have been cliqued again");
  };
  return (
    <div className='flex gap-10 items-center w-screen justify-center'>
      <ActionButton onClick={handleClick} label='Likey' size='small' />
      <ActionButton onClick={handleClickAgain} label='ILY' size='large' />
    </div>
  );
}

export default App;
