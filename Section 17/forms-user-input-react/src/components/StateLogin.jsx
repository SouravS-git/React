import {useState} from "react";
import Input from "./Input.jsx";
import {isEmail, isNotEmpty, hasMinLength} from "../util/validation.js";
import {useInput} from "../hooks/useInput.js";

export default function Login() {
  /*const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const [isBlurred, setIsBlurred] = useState({
    email: false,
    password: false,
  });

  const isEmailInvalid = isEmailBlurred && !isEmail(email) && isNotEmpty(email);
  const isPasswordInvalid = isPasswordBlurred && !hasMinLength(password, 8) && isNotEmpty(password);

  function handleInputChange(identifier, value) {
    setInput((prevInput) => {
      return {
        ...prevInput,
        [identifier]: value,
      };
    });

    setIsBlurred((prevIsBlurred) => {
      return {
        ...prevIsBlurred,
        [identifier]: false,
      };
    });
  }

  function handleInputBlur(identifier){
    setIsBlurred((prevIsBlurred) => {
      return {
        ...prevIsBlurred,
        [identifier]: true,
      };
    });
  }*/

  const {
    input: email,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: hasEmailError,
  } = useInput('', (input) => isNotEmpty(input) && isEmail(input));

  const {
    input: password,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: hasPasswordError,
  } = useInput('', (input) => isNotEmpty(input) && hasMinLength(input, 8));

  function handleFormSubmission(event) {
    event.preventDefault();

    if (hasEmailError || hasPasswordError) {
      return;
    }

    console.log(email, password);
  }

  return (
    <form onSubmit={handleFormSubmission}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={
            (event) => handleEmailChange(event)
          }
          onBlur={
            () => handleEmailBlur()
          }
          error={hasEmailError && 'Please enter a valid email address.'}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={
            (event) => handlePasswordChange(event)
          }
          onBlur={() => handlePasswordBlur()}
          error={hasPasswordError && 'Password must be at least 8 characters long.'}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
