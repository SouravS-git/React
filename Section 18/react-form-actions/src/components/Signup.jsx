import { useActionState } from 'react';
import { isEmail, isNotEmpty, hasMinLength, isEqualToOtherValue } from '../util/validation.js';

function signupAction(prevFormState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirm-password');
  const firstName = formData.get('first-name');
  const lastName = formData.get('last-name');
  const role = formData.get('role');
  const acquisition = formData.getAll('acquisition');
  const terms = formData.get('terms');

  let errors = [];

  if (!isEmail(email)) {
    errors.push('Please enter a valid email address.');
  }

  if (!isNotEmpty(password)) {
    errors.push('Please enter a password.');
  }

  if (!hasMinLength(password, 8)) {
    errors.push('Password must be at least 8 characters long.');
  }

  if (!isEqualToOtherValue(password, confirmPassword)) {
    errors.push('Passwords do not match.');
  }

  if (!isNotEmpty(firstName)) {
    errors.push('Please enter your first name.');
  }

  if (!isNotEmpty(lastName)) {
    errors.push('Please enter your last name.');
  }

  if (!isNotEmpty(role)) {
    errors.push('Please select your role.');
  }

  if (acquisition.length === 0) {
    errors.push('Please select at least one acquisition channel.');
  }

  if (!terms) {
    errors.push('Please agree to the terms and conditions.');
  }

  if (errors.length > 0) {
    return {
      errors,
      oldValues: {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        role,
        acquisition,
        terms
      }
    };
  }

  return {
    errors: null
  }
}

export default function Signup() {
  const [formState, formAction] = useActionState(signupAction, {errors: null});

  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" defaultValue={formState.oldValues?.email} />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" defaultValue={formState.oldValues?.password} />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            defaultValue={formState.oldValues?.confirmPassword}
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" defaultValue={formState.oldValues?.firstName} />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" defaultValue={formState.oldValues?.lastName} />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" key={Math.random()} name="role" defaultValue={formState.oldValues?.role}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            defaultChecked={formState.oldValues?.acquisition.includes('google')}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            defaultChecked={formState.oldValues?.acquisition.includes('friend')}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" defaultChecked={formState.oldValues?.acquisition.includes('other')} />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" defaultChecked={formState.oldValues?.terms} />I
          agree to the terms and conditions
        </label>
      </div>

      {formState.errors && (
        <ul className="error">
          {formState.errors.map((error, index) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}
