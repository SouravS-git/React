import { useState } from "react";
import Header from "./components/Header.jsx";
import UserInput from "./components/UserInput.jsx"
import Results from "./components/Results.jsx";

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 0,
    annualInvestment: 0,
    expectedReturn: 0,
    duration: 0,
  });

  const isInputValid = userInput.duration > 0;

  function handleInputChange(inputIdentifier, inputValue) {
    setUserInput((prevUserInput) => {
      return {...prevUserInput, [inputIdentifier]: +inputValue};
    })
  }

  return (
    <>
      <Header />
      <UserInput userInput={userInput} onInputChange={handleInputChange} />
      {isInputValid ?
        <Results userInput={userInput} /> :
        <p className="center">Please enter a duration greater than zero.</p>
      }
    </>
  );
}

export default App
