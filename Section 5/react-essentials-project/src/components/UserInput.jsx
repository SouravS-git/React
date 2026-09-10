export default function UserInput({ userInput, onInputChange }) {
  return (
    <>
    <section id="user-input">
      <div className="input-group">
        <p>
          <label>Initial Investment</label>
          <input
            id="initialInvestment"
            type="number"
            value={userInput.initialInvestment}
            onChange={(event) => onInputChange(event.target.id, event.target.value)}
            required
          />
        </p>
        <p>
          <label>Annual Investment</label>
          <input
            id="annualInvestment"
            type="number"
            value={userInput.annualInvestment}
            onChange={(event) => onInputChange(event.target.id, event.target.value)}
            required
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label>Expected Return</label>
          <input
            id="expectedReturn"
            type="number"
            value={userInput.expectedReturn}
            onChange={(event) => onInputChange(event.target.id, event.target.value)}
            required
          />
        </p>
        <p>
          <label>Duration</label>
          <input
            id="duration"
            type="number"
            value={userInput.duration}
            onChange={(event) => onInputChange(event.target.id, event.target.value)}
            required
          />
        </p>
      </div>
    </section>
  </>
  );
}