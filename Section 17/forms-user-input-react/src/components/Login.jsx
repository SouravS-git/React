import {useRef, useState} from "react";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);

  function handleFormSubmission(event) {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const isEmailValid = email && email.includes('@');

    if (!isEmailValid) {
      setIsEmailInvalid(true);
      return;
    }

    setIsEmailInvalid(false);

    console.log("Sending HTTP request...");
  }

  return (
    <form onSubmit={handleFormSubmission}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            ref={emailRef}
            id="email"
            type="email"
            name="email"
          />
          <div className="control-error">
            {isEmailInvalid && <p>Please enter a valid email address.</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            id="password"
            type="password"
            name="password"
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
