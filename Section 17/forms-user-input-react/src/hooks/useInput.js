import {useState} from "react";

export function useInput(defaultValue, validationFunctions) {
  const [input, setInput] = useState(defaultValue);
  const [isBlurred, setIsBlurred] = useState(false);

  const isInputValid = validationFunctions(input);

  function handleInputChange(event) {
    setInput(event.target.value);
    setIsBlurred(false);
  }

  function handleInputBlur(){
    setIsBlurred(true);
  }

  return {
    input,
    handleInputChange,
    handleInputBlur,
    hasError: !isInputValid && isBlurred,
  }
}